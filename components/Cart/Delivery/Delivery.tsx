import React, { useEffect, useRef, useState } from "react";

import useTranslation from "~/intl/useTranslation";
import {
  setPickup,
  setDeliveryPrice,
  setCustomerAddress,
  setCustomerName,
  setCustomerPhone,
  useStore,
} from "~/store";
import {
  StyledWrapper,
  StyledContent,
  StyledHeader,
  StyledInfo,
  StyledInfoLabel,
  StyledInputWrapper,
  StyledLayout,
  StyledTitle,
  StyledRadioWrapper,
  StyledRadioLabel,
  StyledRadioLabelInfo,
  StyledRadio,
  StyledNameInput,
  StyledDeliveryInput,
  StyledPhoneInput,
  StyledLink,
  StyledMap,
  StyledLengthInKm,
  StyledDeliveryPrice,
} from "./styled";

const Delivery: React.FC = () => {
  const { t } = useTranslation();
  const [lengthInKm, setLengthInKm] = useState<string>("0");
  const { dispatch, state } = useStore();
  const { cart } = state;
  const addressInputElement = useRef(null);
  const mapElement = useRef(null);

  const handleDeliveryChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    dispatch(setPickup(name === "pickup"));
  };

  const handlePhoneChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    dispatch(setCustomerPhone(currentTarget.value.replace(/\D/, "")));
  };

  const handleNameChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    dispatch(setCustomerName(currentTarget.value));
  };

  useEffect((): void => {
    const currentLengthInKm = parseInt(lengthInKm);

    if (currentLengthInKm < 3) {
      dispatch(setDeliveryPrice(0));
    } else if (currentLengthInKm > 3 && currentLengthInKm < 7) {
      dispatch(setDeliveryPrice(50));
    } else if (currentLengthInKm > 3 && currentLengthInKm < 9) {
      dispatch(setDeliveryPrice(100));
    } else {
      dispatch(setDeliveryPrice(null));
    }
  }, [dispatch, lengthInKm]);

  useEffect((): void => {
    if (cart.isPickupChecked) return;

    const map = new google.maps.Map(mapElement.current, {
      center: { lat: 50.08661, lng: 14.448785 },
      zoom: 13,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    });
    const input = addressInputElement.current;
    const autocomplete = new google.maps.places.Autocomplete(input, {});
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", async () => {
      const place = autocomplete.getPlace();
      const response = await fetch("/api/cart/googlemaps", {
        method: "POST",
        body: JSON.stringify({
          destinations: `${place.geometry.location.lat()},${place.geometry.location.lng()}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!place.geometry || !place.geometry.location) {
        console.warn("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      setLengthInKm(data.lengthInKm);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      dispatch(setCustomerAddress(place.formatted_address));
    });
  }, [cart.isPickupChecked]);

  return (
    <StyledWrapper>
      <StyledTitle>{t("delivery")}</StyledTitle>
      <StyledHeader>
        <StyledRadioWrapper>
          <StyledRadio
            checked={!cart.isPickupChecked}
            id="input-delivery"
            name="delivery-pickup"
            onChange={handleDeliveryChange}
            type="radio"
            value="delivery"
          />
          <StyledRadioLabel htmlFor="input-delivery">
            {t("deliveryLabel")}
          </StyledRadioLabel>
        </StyledRadioWrapper>

        <StyledRadioWrapper>
          <StyledRadio
            checked={cart.isPickupChecked}
            id="input-pickup"
            name="delivery-pickup"
            onChange={handleDeliveryChange}
            type="radio"
            value="pickup"
          />
          <StyledRadioLabel htmlFor="input-pickup">
            {t("pickupLabel")}{" "}
            <StyledRadioLabelInfo>-50Kč</StyledRadioLabelInfo>
          </StyledRadioLabel>
        </StyledRadioWrapper>
      </StyledHeader>

      <StyledLayout>
        {cart.isPickupChecked ? (
          <StyledContent>
            <StyledInputWrapper>
              <StyledNameInput
                onChange={handleNameChange}
                placeholder={t("name")}
                type="text"
                value={cart.customerName}
              />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledPhoneInput
                onChange={handlePhoneChange}
                pattern="[0-9]*"
                placeholder={t("phone")}
                type="tel"
                value={cart.customerPhone}
              />
            </StyledInputWrapper>

            <StyledInfo>
              <StyledInfoLabel>{t("pickupAddress")}:</StyledInfoLabel>
              <StyledLink
                href="https://goo.gl/maps/r6Tf6xHVnu59bD9J9"
                target="_blank"
              >
                Husitská 187/60, Praha 3
              </StyledLink>
            </StyledInfo>
          </StyledContent>
        ) : (
          <StyledContent>
            <StyledInputWrapper>
              <StyledNameInput
                onChange={handleNameChange}
                placeholder={t("name")}
                type="text"
                value={cart.customerName}
              />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledPhoneInput
                onChange={handlePhoneChange}
                pattern="[0-9]*"
                placeholder={t("phone")}
                type="tel"
                value={cart.customerPhone}
              />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledDeliveryInput
                ref={addressInputElement}
                placeholder={t("fillAddress")}
                type="search"
              />
              {lengthInKm !== null && parseInt(lengthInKm) > 0 && (
                <StyledLengthInKm>{lengthInKm}</StyledLengthInKm>
              )}
            </StyledInputWrapper>

            {cart.deliveryPrice === null ? (
              <StyledDeliveryPrice>
                Ваш адрес вне диапазона доставки
              </StyledDeliveryPrice>
            ) : (
              <StyledDeliveryPrice>
                Cena dopravy: {cart.deliveryPrice} Kč
              </StyledDeliveryPrice>
            )}

            <StyledMap ref={mapElement} />
          </StyledContent>
        )}
      </StyledLayout>
    </StyledWrapper>
  );
};

export { Delivery };
