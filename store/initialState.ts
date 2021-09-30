import { TProduct, TProductModifier } from "~/components";

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

export interface TCartProduct extends TProduct {
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
    lengthInKm: string;
    modifiers: TProductModifier[];
    products: TCartProduct[];
    totalPersons: number;
    totalRollsDiscount: number;
  };
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
}

const initialState: TState = {
  cart: {
    additionals: [],
    customerAddress: "",
    customerNote: "",
    cutleryAmount: 1,
    cutleryPrice: 0,
    cutleryTotalPrice: 0,
    deliveryPrice: 0,
    isPickupChecked: false,
    lengthInKm: null,
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
};

export { initialState };
