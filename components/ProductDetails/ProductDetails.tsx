import React, { useEffect, useState } from "react";
import { useNotifications } from "reapop";
import Image from "next/image";

import { TProps, TProductModifier, TProductSubmodifier } from "./types";
import useTranslation from "~/intl/useTranslation";
import { ShopModal } from "~/components";
import { addToCart, TCartProduct, useStore } from "~/store";
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
  isRoll,
  persons,
  price,
  product_modifiers,
  slug,
  title,
  weight,
}) => {
  const { dispatch, state } = useStore();
  const { notify } = useNotifications();
  const { t } = useTranslation();
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(parseInt(price));
  const [selectedModifiers, setSelectedModifiers] = useState<
    TProductModifier[]
  >([]);
  const [selectedSubModifiers, setSelectedSubmodifiers] = useState<
    TProductSubmodifier[]
  >([]);
  const { shopSettings } = state;

  const handleAddToCart = (product: TCartProduct): void => {
    if (shopSettings.shopIsClosed) {
      toggleModalOpened(true);
      return;
    }

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

  const handleModifierChange = (modifier: TProductModifier): void => {
    if (
      selectedModifiers.some(
        (selectedModifier: TProductModifier): boolean =>
          selectedModifier.id === modifier.id
      )
    ) {
      const newModifiers = selectedModifiers.filter(
        (selectedModifier: TProductModifier): boolean =>
          selectedModifier.id !== modifier.id
      );

      setSelectedModifiers(newModifiers);
      setTotalPrice(
        (prevTotalPrice: number): number =>
          prevTotalPrice - parseInt(modifier.price)
      );
    } else {
      const newModifiers = [...selectedModifiers];

      newModifiers.push(modifier);
      setSelectedModifiers(newModifiers);
      setTotalPrice((prevTotalPrice: number): number => {
        return prevTotalPrice + parseInt(modifier.price);
      });
    }
  };

  const handleSubModifierChange = (subModifier: TProductSubmodifier): void => {
    if (
      selectedSubModifiers.some(
        (selectedSubmodifier: TProductSubmodifier): boolean =>
          selectedSubmodifier.id === subModifier.id
      )
    ) {
      const newSubModifiers = selectedSubModifiers.filter(
        (selectedSubModifier: TProductSubmodifier) =>
          selectedSubModifier.id !== subModifier.id
      );

      setSelectedSubmodifiers(newSubModifiers);
      return;
    }

    const newSubModifiers = [...selectedSubModifiers];

    newSubModifiers.push(subModifier);
    setSelectedSubmodifiers(newSubModifiers);
  };

  const handleModalClose = (): void => {
    toggleModalOpened(false);
  };

  useEffect((): void => {
    console.log(selectedModifiers);

    console.log(selectedSubModifiers);
  }, [selectedModifiers, selectedSubModifiers]);

  return (
    <StyledWrapper>
      <StyledLayout>
        <StyledContentLeft>
          <Image
            alt={title}
            height={540}
            layout="responsive"
            objectFit="cover"
            src={image.url}
            width={400}
          />
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
                        modifier: TProductModifier,
                        index: number
                      ): React.ReactElement => (
                        <StyledModifiersItem key={`${index}-${modifier.name}`}>
                          <StyledMofifiersCheckbox
                            id={modifier.id.toString()}
                            onChange={() => handleModifierChange(modifier)}
                            checked={selectedModifiers.some(
                              (selectedModifier: TProductModifier) =>
                                selectedModifier.id === modifier.id
                            )}
                            type="checkbox"
                          />
                          <StyledModifierLabel htmlFor={modifier.id.toString()}>
                            {modifier.name} - {modifier.price}
                          </StyledModifierLabel>

                          {/* {selectedModifiers.some(
                            (selectedModifier: TProductModifier): boolean =>
                              selectedModifier.id === modifier.id
                          ) &&
                            modifier.submodifiers &&
                            !!modifier.submodifiers.length && (
                              <StyledSubmodifiersList>
                                {modifier.submodifiers.map(
                                  (
                                    subModifier: TProductSubmodifier,
                                    subMofifierIndex: number
                                  ): React.ReactElement => (
                                    <li key={`${index}-${subModifier.id}`}>
                                      <StyledMofifiersCheckbox
                                        checked={selectedSubModifiers.some(
                                          (
                                            selectedSubmodifier: TProductSubmodifier
                                          ): boolean =>
                                            selectedSubModifiers.some(
                                              (
                                                subModifier: TProductSubmodifier
                                              ): boolean =>
                                                selectedSubmodifier.id === subModifier.id && 
                                            )
                                        )}
                                        id={`${index}-${subModifier.id}`}
                                        isSecondary
                                        onChange={() =>
                                          handleSubModifierChange(subModifier)
                                        }
                                        type="checkbox"
                                      />
                                      <StyledModifierLabel
                                        htmlFor={`${index}-${subModifier.id}`}
                                      >
                                        {subModifier.name}
                                      </StyledModifierLabel>
                                    </li>
                                  )
                                )}
                              </StyledSubmodifiersList>
                            )} */}
                        </StyledModifiersItem>
                      )
                    )}
                  </StyledModifiersList>
                </StyledModifiers>
              </>
            )}
            {product_modifiers.length > 0 && (
              <StyledItemPrice>
                <StyledItemTitle>{t("priceTotal")}:</StyledItemTitle>
                {totalPrice} Kč
              </StyledItemPrice>
            )}
          </StyledContent>

          <StyledButton
            onClick={() =>
              handleAddToCart({
                allergeny,
                id,
                image: {
                  url: image.url,
                },
                ingredients,
                isRoll,
                persons,
                price: price + [selectedModifiers].length * 20,
                product_modifiers: selectedModifiers,
                product_submodifiers: selectedSubModifiers,
                quantity: 1,
                slug,
                title,
                totalPrice,
                weight,
              })
            }
            type="button"
          >
            {t("addToCart")}
          </StyledButton>
        </StyledContentRight>
      </StyledLayout>

      <ShopModal isOpened={modalIsOpened} close={handleModalClose} />
    </StyledWrapper>
  );
};

export { ProductDetails };
