export interface TProductSubmodifier {
  id: number;
  name: string;
}

export interface TProductModifier {
  id: number;
  name: string;
  price: string;
  submodifiers: TProductSubmodifier[];
}

export interface TProduct {
  id: number;
  image: {
    url: string;
  };
  allergeny: string;
  ingredients: string;
  price: string;
  product_modifiers: TProductModifier[];
  slug: string;
  title: string;
  weight: string;
}

export interface TProps extends TProduct {}
