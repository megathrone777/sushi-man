import React, { useContext, useState } from "react";
import { useNotifications } from "reapop";

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

interface TProductSubmodifier {
  id: number;
  name: string;
}

export interface TProductModifier {
  id: number;
  name: string;
  price: string;
  submodifiers: TProductSubmodifier[];
}

export interface TProduct {
  id: number;
  image: {
    url: string;
  };
  allergeny: string;
  ingredients: string;
  price: string;
  product_modifiers: TProductModifier[];
  slug: string;
  title: string;
  weight: string;
}

interface TProps extends TProduct {}

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
  const [submodifiersIds, setSubmodifiersIds] = useState<number[]>([]);

  const handleAddToCart = (product: TCartProduct): void => {
    dispatch(addToCart(product));
    notify({
      dismissAfter: 3000,
      dismissible: true,
      position: "bottom-center",
      showDismissButton: true,
      status: "success",
      title: `${product.title} добавлен в корзину`,
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

  const handleSubModifierChange = (id: number): void => {
    if (submodifiersIds.includes(id)) {
      const newSubModifierIds = submodifiersIds.filter(
        (subModifierId: number) => subModifierId !== id
      );

      setSubmodifiersIds(newSubModifierIds);
    } else {
      const newSubModifierIds = [...submodifiersIds];

      newSubModifierIds.push(id);
      setSubmodifiersIds(newSubModifierIds);
    }
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
                            id={modifierId}
                            onChange={() =>
                              handleModifierChange(modifierId, price)
                            }
                            checked={
                              modifierIds.includes(modifierId) ? true : false
                            }
                            type="checkbox"
                          />
                          <StyledModifierLabel htmlFor={modifierId}>
                            {name} - {price}
                          </StyledModifierLabel>

                          {modifierIds.includes(modifierId) &&
                            submodifiers &&
                            !!submodifiers.length && (
                              <StyledSubmodifiersList>
                                {submodifiers.map(
                                  (
                                    {
                                      id: subModifierId,
                                      name,
                                    }: TProductSubmodifier,
                                    index: number
                                  ): React.ReactElement => (
                                    <li key={`${index}-${subModifierId}`}>
                                      <StyledMofifiersCheckbox
                                        id={`subModifier-${subModifierId}-${modifierId}`}
                                        checked={
                                          submodifiersIds.includes(
                                            subModifierId
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={() =>
                                          handleSubModifierChange(subModifierId)
                                        }
                                        type="checkbox"
                                      />
                                      <StyledModifierLabel
                                        htmlFor={`subModifier-${subModifierId}-${modifierId}`}
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
