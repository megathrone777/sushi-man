import React, { useEffect, useState } from "react";

import { gql, useLazyQuery } from "@apollo/client";
import { Item } from "./Item";
import client from "~/apollo-client";
import { TProps, TCategory, TCategoryTypes } from "./types";
import { SvgLoaderIcon } from "~/icons";
import { TProduct, Modal } from "~/components";
import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledTitle,
  StyledList,
  StyledPanel,
  StyledTabsList,
  StyledTabs,
  StyledTab,
  StyledLoader,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const productsCategories: TCategory[] = [
  {
    type: "isRoll",
    name: "Rolly",
  },
  {
    name: "Poke",
    type: "isPoke",
  },
  {
    name: "Sety",
    type: "isSet",
  },
  {
    name: "Salaty",
    type: "isSalat",
  },
  {
    name: "Drinky",
    type: "isDrink",
  },
];

const Products: React.FC<TProps> = ({ title, inner }) => {
  const { t } = useTranslation();
  const [ordersStopModalIsOpened, toggleOrdersStopModalOpened] =
    useState<boolean>(false);
  const [shopModalIsOpened, toggleShopModalOpened] = useState<boolean>(false);
  const [categoryType, setCategoryType] = useState<TCategoryTypes>(null);
  const ordersStopModalTitle = t("ordersStopModalTitle");
  const ordersStopModalText = t("ordersStopModalText");
  const shopModalTitle = t("shopModalTitle");
  const shopModalText = t("modalText");
  const contactsLinks = t("contactsLinks");
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

  const handleCategoryChange = (categoryType: TCategoryTypes): void => {
    setCategoryType(categoryType);
  };

  const handleShopModalToggle = (modalIsOpened: boolean): void => {
    toggleShopModalOpened(modalIsOpened);
  };

  const handleShopModalClose = (): void => {
    toggleShopModalOpened(false);
  };

  const handleOrdersStopModalToggle = (modalIsOpened: boolean): void => {
    toggleOrdersStopModalOpened(modalIsOpened);
  };

  const handleOrdersStopModalClose = (): void => {
    toggleOrdersStopModalOpened(false);
  };

  const renderTabPanel = (): React.ReactElement => (
    <StyledPanel>
      {data?.products && !!data?.products.length && (
        <StyledList>
          {data?.products.map(
            (productsItem: TProduct, index: number): React.ReactElement => (
              <Item
                key={`${productsItem.slug}-${index}`}
                triggerOrdersStopModal={handleOrdersStopModalToggle}
                triggerShopModal={handleShopModalToggle}
                {...productsItem}
              />
            )
          )}
        </StyledList>
      )}
    </StyledPanel>
  );

  useEffect((): void => {
    if (categoryType !== null) {
      getProducts();
    }
  }, [categoryType]);

  return (
    <StyledWrapper id="products-section">
      <StyledContainer>
        <StyledTitle inner={inner}>{title}</StyledTitle>

        {productsCategories && !!productsCategories.length && (
          <StyledTabs>
            <StyledTabsList>
              {productsCategories.map(
                (
                  { name, type }: TCategory,
                  index: number
                ): React.ReactElement => (
                  <StyledTab
                    isActive={
                      (categoryType === "isRoll" && index === 0) ||
                      (categoryType === "isPoke" && index === 1) ||
                      (categoryType === "isSet" && index === 2) ||
                      (categoryType === "isSalat" && index === 3) ||
                      (categoryType === "isDrink" && index === 4)
                    }
                    isCollapsed={categoryType !== null}
                    isDrink={type === "isDrink"}
                    isPoke={type === "isPoke"}
                    isRoll={type === "isRoll"}
                    isSalat={type === "isSalat"}
                    isSet={type === "isSet"}
                    key={`${index}-${name}`}
                    onClick={() => handleCategoryChange(type)}
                  >
                    {name}
                  </StyledTab>
                )
              )}
            </StyledTabsList>

            {renderTabPanel()}
          </StyledTabs>
        )}

        {productsLoading && (
          <StyledLoader iscollapsed={categoryType !== null}>
            <SvgLoaderIcon />
          </StyledLoader>
        )}

        <Modal
          close={handleOrdersStopModalClose}
          contactsLinks={contactsLinks}
          isOpened={ordersStopModalIsOpened}
          text={ordersStopModalText}
          title={ordersStopModalTitle}
        />

        <Modal
          close={handleShopModalClose}
          contactsLinks={contactsLinks}
          isOpened={shopModalIsOpened}
          text={shopModalText}
          title={shopModalTitle}
        />
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Products };
