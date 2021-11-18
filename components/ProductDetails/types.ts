export interface TProductSubmodifier {
  id: string;
  name: string;
}

export interface TProductModifier {
  id: string;
  name: string;
  price: string;
  submodifiers: TProductSubmodifier[];
}

export interface TProduct {
  allergeny: string;
  ingredients: string;
  isRoll: boolean | null;
  isSalat: boolean | null;
  isDrink: boolean | null;
  id: string;
  image: {
    url: string;
  };
  price: string;
  product_modifiers: TProductModifier[];
  slug: string;
  title: string;
  weight: string;
}

export interface TProps extends TProduct {}
