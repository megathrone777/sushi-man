import { TProduct } from "~/components";

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
  cutleryPrice: number;
  cart: {
    cutleryAmount: number;
    cutleryTotalPrice: number;
    isPickupChecked: boolean;
    products: TCartProduct[];
    additionals: TAdditional[];
    totalPersons: number;
  };
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
}

const initialState: TState = {
  cutleryPrice: 0,
  cart: {
    cutleryAmount: 1,
    cutleryTotalPrice: 0,
    isPickupChecked: false,
    products: [],
    additionals: [],
    totalPersons: 0,
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
