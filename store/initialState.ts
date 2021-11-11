import { get as getFromLocalStorage } from "local-storage";

import { TProduct, TProductModifier } from "~/components";
import { TProductSubmodifier } from "~/components/ProductDetails/types";

export interface TAdditional {
  id: string;
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
  ordersStop: boolean;
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
    customerAddressError: boolean;
    customerName: string;
    customerNameError: boolean;
    customerNote: string;
    customerPhone: string;
    customerPhoneError: boolean;
    cutleryAmount: number;
    cutleryPrice: number;
    cutleryTotalPrice: number;
    deliveryPrice: number;
    isPickupChecked: boolean;
    modifiers: TProductModifier[];
    products: TCartProduct[];
    totalPersons: number;
    totalPersonsError: boolean;
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
        customerAddressError: false,
        customerNote: "",
        cutleryAmount: 0,
        cutleryPrice: 0,
        cutleryTotalPrice: 0,
        deliveryPrice: 0,
        isPickupChecked: false,
        customerName: "",
        customerNameError: false,
        customerPhone: "",
        customerPhoneError: false,
        modifiers: [],
        products: [],
        totalPersons: 0,
        totalPersonsError: false,
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
        ordersStop: false,
        shopIsClosed: false,
      },
    };

export { initialState };
