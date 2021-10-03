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
  setShopSettings,
  setTotalRollsDiscount,
} from "./actions";
export { useStore, AppContext } from "./context";
export { reducer } from "./reducer";
export type {
  TCartProduct,
  TAdditional,
  TSchedule,
  TShopSettings,
} from "./initialState";
