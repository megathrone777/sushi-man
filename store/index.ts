export { AppProvider } from "./context";
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
  setTotalRollsDiscount,
  setLengthInKm,
  setDeliveryPrice,
} from "./actions";
export type {
  TCartProduct,
  TAdditional,
  TSchedule,
  TState,
} from "./initialState";
