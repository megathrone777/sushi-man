export {
  addAdditional,
  addToCart,
  changeAdditionalQuantity,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setAdditionals,
  setCustomerAddress,
  setCustomerAddressError,
  setCustomerName,
  setCustomerNameError,
  setCustomerNote,
  setCustomerPhone,
  setCustomerPhoneError,
  setCutleryAmount,
  setCutleryPrice,
  setCutleryTotalPrice,
  setDeliveryPrice,
  setPickup,
  setSchedule,
  setShopSettings,
  setTotalPersonsError,
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
