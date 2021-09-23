export { AppContext, AppProvider } from "./context";
export {
  addToCart,
  removeFromCart,
  clearCart,
  changeQuantity,
  changeAdditionalQuantity,
  addAdditional,
  setAdditionals,
  setSchedule,
  setCutleryPrice,
  setCutleryAmount,
  setCutleryTotalPrice,
  setPickup,
} from "./actions";
export type { TCartProduct, TAdditional, TSchedule } from "./initialState";
