export {
  addToCart,
  changeAdditionalQuantity,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setAdditionals,
  setAgree,
  setAgreeError,
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
  setCutleryPrice,
  setDeliveryDistance,
  setDeliveryError,
  setDeliveryPrice,
  setModalDay,
  setPaymentType,
  setPickup,
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
  TModalDay,
} from "./globalStore";
export { TPayment } from "./globalStore";
