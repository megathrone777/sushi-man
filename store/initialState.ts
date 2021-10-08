import { get as getFromLocalStorage } from "local-storage";

import { TProduct, TProductModifier } from "~/components";
import { TProductSubmodifier } from "~/components/ProductDetails/types";

export interface TAdditional {
  id: number;
  price: number;
  quantity: number;
  title: string;
}

export interface TSchedule {
  locale: string;
  schedule: string;
  text: string;
  title: string;
}

export interface TShopSettings {
  shopIsClosed: boolean;
}

export interface TCartProduct extends TProduct {
  product_modifiers: TProductModifier[];
  product_submodifiers: TProductSubmodifier[];
  quantity: number;
  totalPrice: number;
}

export interface TState {
  cart: {
    additionals: TAdditional[];
    customerAddress: string;
    customerName: string;
    customerNote: string;
    customerPhone: string;
    cutleryAmount: number;
    cutleryPrice: number;
    cutleryTotalPrice: number;
    deliveryPrice: number;
    isPickupChecked: boolean;
    modifiers: TProductModifier[];
    products: TCartProduct[];
    totalPersons: number;
    totalRollsDiscount: number;
  };
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
  shopSettings: TShopSettings;
}

const initialState: TState = getFromLocalStorage("state")
  ? getFromLocalStorage<TState>("state")
  : {
      cart: {
        additionals: [],
        customerAddress: "",
        customerNote: "",
        cutleryAmount: 1,
        cutleryPrice: 0,
        cutleryTotalPrice: 0,
        deliveryPrice: 0,
        isPickupChecked: false,
        customerName: "",
        customerPhone: "",
        modifiers: [],
        products: [],
        totalPersons: 0,
        totalRollsDiscount: 0,
      },
      schedule: {
        schedule_cs: {
          locale: "",
          schedule: "",
          title: "",
          text: "",
        },
        schedule_ru: {
          locale: "",
          schedule: "",
          title: "",
          text: "",
        },
      },
      shopSettings: {
        shopIsClosed: false,
      },
    };

export { initialState };
