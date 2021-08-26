export interface TProduct {
  id: number;
  image: {
    url: string;
  };
  allergeny: string;
  ingredients: string;
  price: string;
  title: string;
  weight: string;
}

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
  schedule: TSchedule[];
}

const initialState: TState = {
  cart: {
    products: [],
    additionals: [],
  },
  schedule: [],
};

export { initialState };
