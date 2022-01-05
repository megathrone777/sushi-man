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
  inner?: boolean;
  title: string;
}