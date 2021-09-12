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
  cutleryAmount: number;
  quantity: number;
  totalPrice: number;
}

export interface TState {
  cart: {
    products: TCartProduct[];
    additionals: TAdditional[];
  };
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
}

const initialState: TState = {
  cart: {
    products: [],
    additionals: [],
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
