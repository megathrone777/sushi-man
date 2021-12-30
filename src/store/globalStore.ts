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

export interface TCartProduct extends TProduct {
  product_modifiers: TProductModifier[];
  product_submodifiers: TProductSubmodifier[];
  quantity: number;
  totalPrice: number;
}

export interface TShopSettings {
  ordersStop: boolean;
  shopIsClosed: boolean;
}

export enum TPayment {
  CARD = "card",
  CARDCOURIER = "cardCourier",
  CARDPICKUP = "cardPickup",
  CASH = "cash",
}

export interface TStore {
  cart: {
    additionals: TAdditional[];
    customerAddress: string;
    customerAddressError: boolean;
    customerEmail: string;
    customerEmailError: boolean;
    customerName: string;
    customerNameError: boolean;
    customerNote: string;
    customerPhone: string;
    customerPhoneError: boolean;
    cutleryAmount: number;
    cutleryAmountError: boolean;
    cutleryPrice: number;
    deliveryDistance: number;
    deliveryError: boolean;
    deliveryPrice: number;
    isAgreeChecked: boolean;
    isAgreeCheckedError: boolean;
    isPickupChecked: boolean;
    modifiers: TProductModifier[];
    paymentType: TPayment;
    products: TCartProduct[];
    totalRollsDiscount: number;
  };
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
  shopSettings: TShopSettings;
}

const initialStore: TStore = {
  cart: {
    additionals: [],
    customerAddress: "",
    customerAddressError: false,
    customerEmail: "",
    customerEmailError: false,
    customerName: "",
    customerNameError: false,
    customerNote: "",
    customerPhone: "",
    customerPhoneError: false,
    cutleryAmount: 0,
    cutleryAmountError: false,
    cutleryPrice: 0,
    deliveryDistance: 0,
    deliveryError: false,
    deliveryPrice: null,
    isAgreeChecked: false,
    isAgreeCheckedError: false,
    isPickupChecked: false,
    modifiers: [],
    paymentType: TPayment.CARD,
    products: [],
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

const globalStore: TStore = getFromLocalStorage("store")
  ? getFromLocalStorage<TStore>("store")
  : initialStore;

export { globalStore, initialStore };
