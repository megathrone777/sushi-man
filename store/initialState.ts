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

export interface TCartProduct extends TProduct {
  quantity: number;
  totalPrice: number;
}

export interface TState {
  cart: {
    products: TCartProduct[];
    additionals: TAdditional[];
  };
}

const initialState: TState = {
  cart: {
    products: [],
    additionals: [],
  },
};

export { initialState };
