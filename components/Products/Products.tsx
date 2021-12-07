import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useNotifications } from "reapop";
import { Tabs, TabPanel } from "react-tabs";
import { gql, useLazyQuery } from "@apollo/client";

import client from "~/apollo-client";
import { TProps, TCategory, TCategoryTypes } from "./types";
import { SvgBuyIcon, SvgLoaderIcon } from "~/icons";
import { TProduct, ShopModal } from "~/components";
import { addToCart, TCartProduct, useStore } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledTitle,
  StyledList,
  StyledItem,
  StyledItemLayout,
  StyledItemImageHolder,
  StyledItemContent,
  StyledItemFooter,
  StyledItemPrice,
  StyledItemLink,
  StyledItemTitle,
  StyledItemDesc,
  StyledItemImage,
  StyledItemText,
  StyledItemButton,
  StyledScroller,
  StyledTabsList,
  StyledTab,
  StyledLoader,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const productsCategories: TCategory[] = [
  {
    type: "isRoll",
    name: "Rolls",
  },
  {
    name: "Poke",
    type: "isPoke",
  },
  {
    name: "Sets",
    type: "isSet",
  },
  {
    name: "Salats",
    type: "isSalat",
  },
  {
    name: "Drinks",
    type: "isDrink",
  },
];

const Products: React.FC<TProps> = () => {
  const { t } = useTranslation();
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(false);
  const [categoryType, setCategoryType] = useState<TCategoryTypes>(null);
  const { notify } = useNotifications();
  const { dispatch, store } = useStore();
  const { shopSettings } = store;
  const productsTitle = t("productsTitle");
  const [getProducts, { data, loading: productsLoading }] = useLazyQuery(
    gql`
      query ProductsQuery($where: JSON) {
        products(sort: "priority", where: $where) {
          allergeny
          id
          image {
            url
          }
          ingredients
          isRoll
          isSalat
          isDrink
          isSet
          isPoke
          price
          slug
          title
          weight
        }
      }
    `,
    {
      client,
      variables: {
        where: {
          ...(categoryType === "isRoll" && { isRoll: true }),
          ...(categoryType === "isPoke" && { isPoke: true }),
          ...(categoryType === "isSalat" && { isSalat: true }),
          ...(categoryType === "isDrink" && { isDrink: true }),
          ...(categoryType === "isSet" && { isSet: true }),
        },
      },
    }
  );

  const handleScrollTo = (): void => {
    const deliverySection = document.getElementById("delivery-section");

    deliverySection &&
      deliverySection.scrollIntoView({
        behavior: "smooth",
      });
  };

  const handleCategoryChange = (categoryType: TCategoryTypes): void => {
    setCategoryType(categoryType);
  };

  const handleAddToCart = (product: TCartProduct): void => {
    if (shopSettings.shopIsClosed || shopSettings.ordersStop) {
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
      title: `${product.title} přidán do košíku`,
    });
  };

  const handleModalClose = (): void => {
    toggleModalOpened(false);
  };

  const renderTabPanel = (): React.ReactElement => (
    <TabPanel>
      {data?.products && !!data?.products.length && (
        <StyledList>
          {data?.products.map(
            (
              {
                allergeny,
                id,
                isRoll,
                isSalat,
                isDrink,
                image,
                title,
                weight,
                ingredients,
                price,
                slug,
              }: TProduct,
              index: number
            ): React.ReactElement => (
              <StyledItem key={index}>
                <StyledItemImageHolder>
                  <Link
                    as={`/product/${id}`}
                    href={`/product/[${id}]`}
                    passHref
                  >
                    <StyledItemLink>
                      <StyledItemImage alt="Product" src={image.url} />
                    </StyledItemLink>
                  </Link>
                </StyledItemImageHolder>

                <StyledItemLayout>
                  <StyledItemTitle>
                    <Link
                      as={`/product/${id}`}
                      href={`/product/[${id}]`}
                      passHref
                    >
                      <StyledItemLink>
                        <StyledItemText>{title}</StyledItemText>
                      </StyledItemLink>
                    </Link>
                  </StyledItemTitle>

                  <StyledItemContent>
                    <Link
                      as={`/product/${id}`}
                      href={`/product/[${id}]`}
                      passHref
                    >
                      <StyledItemLink>
                        <StyledItemDesc>
                          <StyledItemText>{weight}</StyledItemText>
                        </StyledItemDesc>

                        {ingredients && (
                          <StyledItemDesc>
                            <StyledItemText>{ingredients}</StyledItemText>
                          </StyledItemDesc>
                        )}

                        {allergeny && (
                          <StyledItemDesc>
                            <StyledItemText>{allergeny}</StyledItemText>
                          </StyledItemDesc>
                        )}
                      </StyledItemLink>
                    </Link>
                  </StyledItemContent>

                  <StyledItemFooter>
                    <StyledItemPrice>
                      <StyledItemText>{price} Kč</StyledItemText>
                    </StyledItemPrice>

                    <StyledItemButton
                      onClick={() =>
                        handleAddToCart({
                          allergeny,
                          image: {
                            url: image.url,
                          },
                          id,
                          isRoll,
                          isSalat,
                          isDrink,
                          ingredients,
                          price,
                          product_modifiers: [],
                          product_submodifiers: [],
                          quantity: 1,
                          slug,
                          title,
                          weight,
                          totalPrice: parseInt(price),
                        })
                      }
                    >
                      <SvgBuyIcon />
                    </StyledItemButton>
                  </StyledItemFooter>
                </StyledItemLayout>
              </StyledItem>
            )
          )}
        </StyledList>
      )}
    </TabPanel>
  );

  useEffect((): void => {
    if (categoryType !== null) {
      getProducts();
    }
  }, [categoryType]);

  return (
    <StyledWrapper id="products-section">
      <StyledContainer>
        <StyledTitle>{productsTitle}</StyledTitle>

        <Tabs>
          {productsCategories && !!productsCategories.length && (
            <StyledTabsList>
              {productsCategories.map(
                (
                  { name, type }: TCategory,
                  index: number
                ): React.ReactElement => (
                  <StyledTab
                    isCollapsed={categoryType !== null}
                    isroll={type === "isRoll" || undefined}
                    isdrink={type === "isDrink" || undefined}
                    ispoke={type === "isPoke" || undefined}
                    issalat={type === "isSalat" || undefined}
                    isset={type === "isSet" || undefined}
                    onClick={() => handleCategoryChange(type)}
                    key={`${index}-${name}`}
                  >
                    {name}
                  </StyledTab>
                )
              )}
            </StyledTabsList>
          )}

          {renderTabPanel()}
          {renderTabPanel()}
          {renderTabPanel()}
          {renderTabPanel()}
          {renderTabPanel()}
        </Tabs>

        {productsLoading && (
          <StyledLoader>
            <SvgLoaderIcon />
          </StyledLoader>
        )}

        <StyledScroller onClick={handleScrollTo} type="button" />
        <ShopModal isOpened={modalIsOpened} close={handleModalClose} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Products };
