import React, { useContext, useState } from "react";
import { useNotifications } from "reapop";

import { TProps, TProductModifier, TProductSubmodifier } from "./types";
import useTranslation from "~/intl/useTranslation";
import { AppContext, addToCart, TCartProduct } from "~/store";
import {
  StyledWrapper,
  StyledLayout,
  StyledContentLeft,
  StyledContentRight,
  StyledTitle,
  StyledContent,
  StyledButton,
  StyledItem,
  StyledItemTitle,
  StyledItemSecondary,
  StyledItemPrice,
  StyledModifiers,
  StyledMofifiersCheckbox,
  StyledModifierLabel,
  StyledModifiersList,
  StyledModifiersItem,
  StyledSubmodifiersList,
} from "./styled";

const ProductDetails: React.FC<TProps> = ({
  allergeny,
  id,
  image,
  ingredients,
  price,
  product_modifiers,
  slug,
  title,
  weight,
}) => {
  const { dispatch } = useContext(AppContext);
  const { notify } = useNotifications();
  const { t } = useTranslation();
  const [totalPrice, setTotalPrice] = useState<number>(parseInt(price));
  const [modifierIds, setModifierIds] = useState<number[]>([]);
  const [submodifiersIds, setSubmodifiersIds] = useState<string[]>([]);

  const handleAddToCart = (product: TCartProduct): void => {
    dispatch(addToCart(product));
    notify({
      dismissAfter: 3000,
      dismissible: true,
      position: "bottom-center",
      showDismissButton: true,
      status: "success",
      title: `${product.title} přidáno do košíku`,
    });
  };

  const handleModifierChange = (id: number, price: string): void => {
    if (modifierIds.includes(id)) {
      const newModifierIds = modifierIds.filter(
        (modifierId: number) => modifierId !== id
      );

      setModifierIds(newModifierIds);
      setTotalPrice((prevTotalPrice: number): number => {
        return prevTotalPrice - parseInt(price);
      });
    } else {
      const newModifierIds = [...modifierIds];

      newModifierIds.push(id);
      setModifierIds(newModifierIds);
      setTotalPrice((prevTotalPrice: number): number => {
        return prevTotalPrice + parseInt(price);
      });
    }
  };

  const handleSubModifierChange = (id: string): void => {
    if (submodifiersIds.includes(id)) {
      const newSubModifierIds = submodifiersIds.filter(
        (subModifierId: string) => subModifierId !== id
      );

      setSubmodifiersIds(newSubModifierIds);
      return;
    }

    const newSubModifierIds = [...submodifiersIds];

    newSubModifierIds.push(id);
    setSubmodifiersIds(newSubModifierIds);
  };

  return (
    <StyledWrapper>
      <StyledLayout>
        <StyledContentLeft>
          <img alt={title} src={image.url} />
        </StyledContentLeft>

        <StyledContentRight>
          <StyledTitle>{title}</StyledTitle>

          <StyledContent>
            <StyledItem>
              <StyledItemTitle>{t("ingredients")}: </StyledItemTitle>
              {ingredients}
            </StyledItem>
            <StyledItemSecondary>{allergeny}</StyledItemSecondary>
            <StyledItem>
              <StyledItemTitle>{t("quantity")}: </StyledItemTitle>
              {weight}
            </StyledItem>
            <StyledItemPrice>
              <StyledItemTitle>{t("price")}: </StyledItemTitle>
              {price} Kč
            </StyledItemPrice>

            {product_modifiers && !!product_modifiers.length && (
              <>
                <StyledItem>
                  <StyledItemTitle>{t("modifiers")}:</StyledItemTitle>
                </StyledItem>

                <StyledModifiers>
                  <StyledModifiersList>
                    {product_modifiers.map(
                      (
                        {
                          id: modifierId,
                          name,
                          price,
                          submodifiers,
                        }: TProductModifier,
                        index: number
                      ): React.ReactElement => (
                        <StyledModifiersItem key={`${index}-${name}`}>
                          <StyledMofifiersCheckbox
                            id={modifierId.toString()}
                            onChange={() =>
                              handleModifierChange(modifierId, price)
                            }
                            checked={modifierIds.includes(modifierId)}
                            type="checkbox"
                          />
                          <StyledModifierLabel htmlFor={modifierId.toString()}>
                            {name} - {price}
                          </StyledModifierLabel>

                          {modifierIds.includes(modifierId) &&
                            submodifiers &&
                            !!submodifiers.length && (
                              <StyledSubmodifiersList>
                                {submodifiers.map(
                                  ({
                                    id: subModifierId,
                                    name,
                                  }: TProductSubmodifier): React.ReactElement => (
                                    <li key={`${index}-${subModifierId}`}>
                                      <StyledMofifiersCheckbox
                                        checked={submodifiersIds.includes(
                                          `${index}-${subModifierId}`
                                        )}
                                        id={`${index}-${subModifierId}`}
                                        isSecondary
                                        onChange={() =>
                                          handleSubModifierChange(
                                            `${index}-${subModifierId}`
                                          )
                                        }
                                        type="checkbox"
                                      />
                                      <StyledModifierLabel
                                        htmlFor={`${index}-${subModifierId}`}
                                      >
                                        {name}
                                      </StyledModifierLabel>
                                    </li>
                                  )
                                )}
                              </StyledSubmodifiersList>
                            )}
                        </StyledModifiersItem>
                      )
                    )}
                  </StyledModifiersList>
                </StyledModifiers>
              </>
            )}
            <StyledItemPrice>
              <StyledItemTitle>{t("priceTotal")}:</StyledItemTitle>
              {totalPrice} Kč
            </StyledItemPrice>
          </StyledContent>

          <StyledButton
            onClick={() =>
              handleAddToCart({
                allergeny,
                cutleryAmount: 1,
                image: {
                  url: image.url,
                },
                id,
                ingredients,
                price,
                product_modifiers,
                quantity: 1,
                slug,
                title,
                weight,
                totalPrice,
              })
            }
            type="button"
          >
            {t("addToCart")}
          </StyledButton>
        </StyledContentRight>
      </StyledLayout>
    </StyledWrapper>
  );
};

export { ProductDetails };
