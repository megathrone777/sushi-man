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
    deliveryPrice: number;
    deliveryDistance: number;
    deliveryError: boolean;
    paymentType: TPayment;
    isAgreeChecked: boolean;
    isAgreeCheckedError: boolean;
    isPickupChecked: boolean;
    modifiers: TProductModifier[];
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
    customerNote: "",
    cutleryAmount: 0,
    deliveryPrice: 0,
    deliveryDistance: 0,
    deliveryError: false,
    isAgreeChecked: false,
    isAgreeCheckedError: false,
    isPickupChecked: false,
    customerEmail: "",
    customerEmailError: false,
    customerName: "",
    customerNameError: false,
    customerPhone: "",
    customerPhoneError: false,
    cutleryAmountError: false,
    paymentType: TPayment.CARD,
    modifiers: [],
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
