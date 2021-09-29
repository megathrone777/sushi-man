import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { usePersistedContext } from "react-persist-context";

import useTranslation from "~/intl/useTranslation";
import { setPickup, setDeliveryPrice, TState } from "~/store";
// import { SvgTargetIcon } from "~/icons";
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
  // StyledCurrentLocationButton,
} from "./styled";

const Delivery: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { dispatch, state } = usePersistedContext();
  const { cart } = state;
  const addressInputElement = useRef(null);
  const mapElement = useRef(null);

  const handleDeliveryChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    dispatch(setPickup(name === "pickup"));
  };

  useEffect((): void => {
    const currentLengthInKm = parseInt(cart.lengthInKm);

    if (currentLengthInKm < 3) {
      dispatch(setDeliveryPrice(0));
    } else if (currentLengthInKm > 3 && currentLengthInKm < 7) {
      dispatch(setDeliveryPrice(50));
    } else if (currentLengthInKm > 3 && currentLengthInKm < 9) {
      dispatch(setDeliveryPrice(100));
    } else {
      dispatch(setDeliveryPrice(-1));
    }
  }, [dispatch, cart.lengthInKm]);

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

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

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

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      router.push(
        {
          pathname: location.pathname,
          query: {
            destinations: `${place.geometry.location.lat()},${place.geometry.location.lng()}`,
          },
        },
        undefined,
        { scroll: false }
      );
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
              <StyledNameInput placeholder={t("name")} type="text" />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledPhoneInput placeholder={t("phone")} type="tel" />
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
              <StyledNameInput placeholder={t("name")} type="text" />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledPhoneInput placeholder={t("phone")} type="tel" />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledDeliveryInput
                ref={addressInputElement}
                placeholder={t("fillAddress")}
                type="text"
              />
              {/* <StyledCurrentLocationButton
                onClick={handleCurrentLocationClick}
                type="button"
              >
                <SvgTargetIcon />
              </StyledCurrentLocationButton> */}
              {cart.lengthInKm !== null && parseInt(cart.lengthInKm) > 0 && (
                <StyledLengthInKm>{cart.lengthInKm}</StyledLengthInKm>
              )}
            </StyledInputWrapper>

            {cart.deliveryPrice === -1 ? (
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
