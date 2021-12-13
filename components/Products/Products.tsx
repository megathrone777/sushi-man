import React, { useEffect, useState } from "react";

import { gql, useLazyQuery } from "@apollo/client";
import { Item } from "./Item";
import client from "~/apollo-client";
import { TProps, TCategory, TCategoryTypes } from "./types";
import { SvgLoaderIcon } from "~/icons";
import { TProduct, ShopModal } from "~/components";
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

  const handleCategoryChange = (categoryType: TCategoryTypes): void => {
    setCategoryType(categoryType);
  };

  const handleModalToggle = (modalIsOpened: boolean): void => {
    toggleModalOpened(modalIsOpened);
  };

  const handleModalClose = (): void => {
    toggleModalOpened(false);
  };

  const renderTabPanel = (): React.ReactElement => (
    <StyledPanel>
      {data?.products && !!data?.products.length && (
        <StyledList>
          {data?.products.map(
            (productsItem: TProduct, index: number): React.ReactElement => (
              <Item
                key={`${productsItem.slug}-${index}`}
                triggerModal={handleModalToggle}
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
        <StyledTitle>{productsTitle}</StyledTitle>

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
                      (categoryType === "isDrink" && index === 4) ||
                      (categoryType === "isPoke" && index === 1) ||
                      (categoryType === "isSet" && index === 2) ||
                      (categoryType === "isSalat" && index === 3) ||
                      (categoryType === "isRoll" && index === 0)
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

        <ShopModal isOpened={modalIsOpened} close={handleModalClose} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Products };
