export {
  addToCart,
  changeAdditionalQuantity,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setAdditionals,
  setCustomerAddress,
  setCustomerAddressError,
  setCustomerEmail,
  setCustomerEmailError,
  setCustomerName,
  setCustomerNameError,
  setCustomerNote,
  setCustomerPhone,
  setCustomerPhoneError,
  setCutleryAmount,
  setCutleryAmountError,
  setDeliveryPrice,
  setDeliveryDistance,
  setDeliveryError,
  setPickup,
  setAgree,
  setAgreeError,
  setSchedule,
  setShopSettings,
  setTotalRollsDiscount,
  setPaymentType,
} from "./actions";
export { useStore, AppContext } from "./context";
export { reducer } from "./reducer";
export type {
  TCartProduct,
  TAdditional,
  TSchedule,
  TShopSettings,
} from "./globalStore";
export { TPayment } from "./globalStore";
