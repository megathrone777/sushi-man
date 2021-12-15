import React, { useEffect, useRef } from "react";
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
  Value as PhoneNumberValue,
} from "react-phone-number-input/input";

import useTranslation from "~/intl/useTranslation";
import {
  TCartProduct,
  TAdditional,
  setPickup,
  setDeliveryPrice,
  setCustomerAddress,
  setCustomerName,
  setCustomerPhone,
  setCustomerEmailError,
  setDeliveryDistance,
  setDeliveryError,
  useStore,
  setCustomerEmail,
  setCustomerPhoneError,
  setCustomerNameError,
  setCustomerAddressError,
  setPaymentType,
  TPayment,
} from "~/store";
import { SvgExclamationIcon } from "~/icons";
import {
  StyledWrapper,
  StyledForm,
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
  StyledPhoneInput,
  StyledEmailInput,
  StyledNameInput,
  StyledDeliveryInput,
  StyledLink,
  StyledMap,
  StyledLengthInKm,
  StyledDeliveryPrice,
  StyledDeliveryError,
  StyledErrorIcon,
  StyledDeliveryPriceResult,
  StyledTerms,
  StyledText,
  StyledTextPrice,
} from "./styled";

const Delivery: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, store } = useStore();
  const { cart } = store;
  const addressInputElement = useRef(null);
  const mapElement = useRef(null);

  const {
    additionals,
    customerAddress,
    customerAddressError,
    customerEmail,
    customerEmailError,
    customerName,
    customerNameError,
    customerPhone,
    customerPhoneError,
    isPickupChecked,
    totalRollsDiscount,
    deliveryPrice,
    products,
    deliveryDistance,
  } = cart;

  const addedProductsPrice: number[] = products.map(
    ({ totalPrice }: TCartProduct): number => totalPrice
  );

  const addedAdditionalsPrice: number[] = additionals.map(
    ({ price, quantity = 0 }: TAdditional) => price * quantity
  );

  const totalProductsPrice = addedProductsPrice.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    0
  );

  const totalAdditionalsPrice = addedAdditionalsPrice.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    0
  );

  const totalPrice =
    totalProductsPrice +
    totalAdditionalsPrice +
    deliveryPrice -
    totalRollsDiscount;

  const handleDeliveryChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    dispatch(setPickup(name === "pickup"));
  };

  const handlePhoneChange = (value: PhoneNumberValue): void => {
    const formattedValue = formatPhoneNumberIntl(value);

    if (
      !isValidPhoneNumber(formattedValue, {
        defaultCountry: "CZ",
      })
    ) {
      dispatch(setCustomerPhoneError(true));
    } else {
      dispatch(setCustomerPhoneError(false));
    }

    if (formattedValue.length === 0) {
      dispatch(setCustomerPhoneError(false));
    }

    dispatch(setCustomerPhone(formattedValue));
  };

  const handleEmailChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (currentTarget.value.length > 0) {
      dispatch(setCustomerEmailError(false));
    }

    dispatch(setCustomerEmail(currentTarget.value));
  };

  const handleNameChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (currentTarget.value.length > 0) {
      dispatch(setCustomerNameError(false));
    }

    dispatch(setCustomerName(currentTarget.value));
  };

  const handleAddressChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (currentTarget.value.length > 0) {
      dispatch(setCustomerAddressError(false));
    }

    dispatch(setCustomerAddress(currentTarget.value));
  };

  useEffect((): void => {
    dispatch(setDeliveryError(false));

    if (deliveryDistance <= 3) {
      dispatch(setDeliveryPrice(0));
    } else if (deliveryDistance > 3 && deliveryDistance <= 6) {
      dispatch(setDeliveryPrice(50));
    } else if (deliveryDistance > 3 && deliveryDistance <= 8) {
      dispatch(setDeliveryPrice(100));
    } else {
      dispatch(setDeliveryPrice(null));
      dispatch(setDeliveryError(true));
    }
  }, [dispatch, deliveryDistance]);

  useEffect((): void => {
    if (isPickupChecked) {
      return;
    } else {
      dispatch(setPaymentType(TPayment.CARD));
    }

    const map = new google.maps.Map(mapElement.current, {
      center: { lat: 50.08661, lng: 14.448785 },
      zoom: 13,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    });
    const input = addressInputElement.current;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "cz" },
    });
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
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      dispatch(setDeliveryDistance(data.lengthInKm));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      dispatch(setCustomerAddress(place.name));
    });
  }, [isPickupChecked]);

  return (
    <StyledWrapper>
      <StyledTitle>{t("delivery")}</StyledTitle>
      <StyledHeader>
        <StyledRadioWrapper>
          <StyledRadio
            checked={!isPickupChecked}
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
            checked={isPickupChecked}
            id="input-pickup"
            name="delivery-pickup"
            onChange={handleDeliveryChange}
            type="radio"
            value="pickup"
          />
          <StyledRadioLabel htmlFor="input-pickup">
            {t("pickupLabel")}{" "}
            {totalPrice > 500 && (
              <StyledRadioLabelInfo>-50Kč</StyledRadioLabelInfo>
            )}
          </StyledRadioLabel>
        </StyledRadioWrapper>
      </StyledHeader>

      <StyledLayout>
        {isPickupChecked ? (
          <StyledForm action="#">
            <StyledInputWrapper>
              <StyledNameInput
                hasError={customerNameError}
                onChange={handleNameChange}
                placeholder={customerNameError ? "Vyplňte jméno" : t("name")}
                type="text"
                value={customerName}
              />
              {customerNameError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledEmailInput
                hasError={customerEmailError}
                onChange={handleEmailChange}
                placeholder={customerEmailError ? "Vyplňte e-mail" : t("email")}
                type="email"
                value={customerEmail}
              />
              {customerEmailError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}
            </StyledInputWrapper>

            <StyledInputWrapper>
              <PhoneInput
                inputComponent={StyledPhoneInput}
                onChange={handlePhoneChange}
                placeholder={
                  customerPhoneError ? "Vyplňte telefon" : t("phone")
                }
                value={customerPhone}
              />
              {customerPhoneError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}
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
          </StyledForm>
        ) : (
          <StyledForm autoComplete="on" action="#">
            <StyledInputWrapper>
              <StyledNameInput
                hasError={customerNameError}
                onChange={handleNameChange}
                placeholder={customerNameError ? "Vyplňte jméno" : t("name")}
                type="text"
                value={customerName}
              />
              {customerNameError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledEmailInput
                hasError={customerEmailError}
                onChange={handleEmailChange}
                placeholder={customerEmailError ? "Vyplňte e-mail" : t("email")}
                type="email"
                value={customerEmail}
              />
              {customerEmailError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}
            </StyledInputWrapper>

            <StyledInputWrapper>
              <PhoneInput
                hasError={customerPhoneError}
                inputComponent={StyledPhoneInput}
                onChange={handlePhoneChange}
                placeholder={
                  customerPhoneError ? "Vyplňte telefon" : t("phone")
                }
                value={customerPhone}
              />
              {customerPhoneError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledDeliveryInput
                hasError={customerAddressError}
                onChange={handleAddressChange}
                ref={addressInputElement}
                placeholder={
                  customerAddressError ? "Vyplňte adresu" : t("fillAddress")
                }
                type="search"
                value={customerAddress}
              />
              {deliveryDistance !== null &&
                deliveryDistance > 0 &&
                !customerAddressError && (
                  <StyledLengthInKm>{deliveryDistance} km</StyledLengthInKm>
                )}
              {customerAddressError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}
            </StyledInputWrapper>

            {deliveryPrice === null ? (
              <StyledDeliveryError>
                Adresa mimo rozsah rozvozu
              </StyledDeliveryError>
            ) : (
              <StyledDeliveryPrice>
                Cena dopravy: {deliveryPrice}{" "}
                <StyledDeliveryPriceResult>Kč</StyledDeliveryPriceResult>
              </StyledDeliveryPrice>
            )}

            <StyledMap ref={mapElement} />
          </StyledForm>
        )}
      </StyledLayout>

      <StyledTerms>
        <StyledTitle>Podmínky</StyledTitle>
        <StyledText>
          Min. cena objednávky do 3km. -{" "}
          <StyledTextPrice>250 Kč</StyledTextPrice>
        </StyledText>
        <StyledText>
          Min. cena objednávky od 3km. -{" "}
          <StyledTextPrice>300 Kč</StyledTextPrice>
        </StyledText>
        <StyledText>
          Min. cena objednávky při vyzvednutí -{" "}
          <StyledTextPrice>600 Kč</StyledTextPrice>
        </StyledText>
      </StyledTerms>
    </StyledWrapper>
  );
};

export { Delivery };
