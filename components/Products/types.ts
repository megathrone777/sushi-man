import { TProduct } from "~/components";

export type TCategoryTypes =
  | "isPoke"
  | "isRoll"
  | "isSet"
  | "isSalat"
  | "isDrink";

export interface TCategory {
  name: string;
  type: TCategoryTypes;
}

export interface TProps {
  products: TProduct[];
}
