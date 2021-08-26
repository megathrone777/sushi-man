export { AppContext, AppProvider } from "./context";
export {
  addToCart,
  clearCart,
  changeQuantity,
  addAdditional,
  setAdditionals,
  setSchedule,
} from "./actions";
export type {
  TCartProduct,
  TProduct,
  TAdditional,
  TSchedule,
} from "./initialState";
