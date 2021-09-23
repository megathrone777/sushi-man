import React, { useContext, useEffect, useRef, useState } from "react";
// import { Map } from "react-mapycz";

import useTranslation from "~/intl/useTranslation";
import { AppContext, setPickup } from "~/store";
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
} from "./styled";

interface TSuggestData {
  phrase: string;
  data: {
    latitude: number;
    longitude: number;
  };
}

type TDelivery = "delivery" | "pickup";

const Delivery: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch } = useContext(AppContext);
  const [delivery, setDelivery] = useState<TDelivery>("delivery");
  const [suggestCoords, setSuggestCoords] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 50.08502707893264, lng: 14.132315462014551 });
  const textInput = useRef(null);
  const mapNode = useRef(null);

  const handleDeliveryChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    setDelivery(name as TDelivery);
  };

  useEffect((): void => {
    dispatch(setPickup(delivery === "pickup"));
  }, [delivery, dispatch]);

  useEffect(() => {
    let suggest = new window.SMap.Suggest(textInput.current);

    suggest.urlParams({
      bounds: "48.5370786,12.0921668|51.0746358,18.8927040",
    });

    suggest.addListener("suggest", (suggestData: TSuggestData) => {
      setSuggestCoords({
        lat: suggestData.data.latitude,
        lng: suggestData.data.longitude,
      });
    });

    return () => {
      suggest.removeListener("suggest");
    };
  }, []);

  return (
    <StyledWrapper>
      <StyledTitle>{t("delivery")}</StyledTitle>
      <StyledHeader>
        <StyledRadioWrapper>
          <StyledRadio
            checked={delivery === "delivery"}
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
        {delivery === "delivery" && (
          <StyledContent>
            <StyledInputWrapper>
              <StyledNameInput placeholder={t("name")} type="text" />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledPhoneInput placeholder={t("phone")} type="tel" />
            </StyledInputWrapper>

            <StyledInputWrapper data-info="Cena dopravy: 500Kč">
              <StyledDeliveryInput
                ref={textInput}
                placeholder={t("fillAddress")}
                type="text"
              />
            </StyledInputWrapper>

            {/* <Map center={suggestCoords} zoom={1} /> */}
          </StyledContent>
        )}

        {delivery === "pickup" && (
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
        )}
      </StyledLayout>
    </StyledWrapper>
  );
};

export { Delivery };
