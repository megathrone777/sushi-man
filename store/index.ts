export { AppProvider } from "./context";
export {
  addAdditional,
  addToCart,
  changeAdditionalQuantity,
  changeQuantity,
  clearCart,
  removeFromCart,
  setAdditionals,
  setCustomerAddress,
  setCustomerName,
  setCustomerNote,
  setCustomerPhone,
  setCutleryAmount,
  setCutleryPrice,
  setCutleryTotalPrice,
  setDeliveryPrice,
  setLengthInKm,
  setPickup,
  setProductModifiers,
  setSchedule,
  setTotalRollsDiscount,
} from "./actions";
export type { TCartProduct, TAdditional, TSchedule } from "./initialState";
