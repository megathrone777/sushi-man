import { Value as PhoneNumberValue } from "react-phone-number-input";

import {
  TPayment,
  TAdditional,
  TCartProduct,
  TSchedule,
  TShopSettings,
  TModalDay,
} from "./globalStore";

export enum TActionTypes {
  SET_SHOP_SETTINGS = "SET_SHOP_SETTINGS",
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  CLEAR_CART = "CLEAR_CART",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
  CHANGE_ADDITIONAL_QUANTITY = "CHANGE_ADDITIONAL_QUANTITY",
  SET_ADDITIONALS = "SET_ADDITIONALS",
  ADD_ADDITIONAL = "ADD_ADDITIONAL",
  SET_CUTLERY_AMOUNT = "SET_CUTLERY_AMOUNT",
  SET_CUTLERY_AMOUNT_ERROR = "SET_CUTLERY_AMOUNT_ERROR",
  SET_PICKUP = "SET_PICKUP",
  SET_SCHEDULE = "SET_SCHEDULE",
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_TOTAL_ROLLS_DISCOUNT = "SET_TOTAL_ROLLS_DISCOUNT",
  SET_DELIVERY_PRICE = "SET_DELIVERY_PRICE",
  SET_DELIVERY_DISTANCE = "SET_DELIVERY_DISTANCE",
  SET_DELIVERY_ERROR = "SET_DELIVERY_ERROR",
  SET_AGREE = "SET_AGREE",
  SET_AGREE_ERROR = "SET_AGREE_ERROR",
  SET_CUSTOMER_EMAIL = "SET_CUSTOMER_EMAIL",
  SET_CUSTOMER_EMAIL_ERROR = "SET_CUSTOMER_EMAIL_ERROR",
  SET_CUSTOMER_NAME = "SET_CUSTOMER_NAME",
  SET_CUSTOMER_NAME_ERROR = "SET_CUSTOMER_NAME_ERROR",
  SET_CUSTOMER_PHONE = "SET_CUSTOMER_PHONE",
  SET_CUSTOMER_PHONE_ERROR = "SET_CUSTOMER_PHONE_ERROR",
  SET_CUSTOMER_ADDRESS = "SET_CUSTOMER_ADDRESS",
  SET_CUSTOMER_ADDRESS_ERROR = "SET_CUSTOMER_ADDRESS_ERROR",
  SET_CUSTOMER_NOTE = "SET_CUSTOMER_NOTE",
  SET_PAYMENT_TYPE = "SET_PAYMENT_TYPE",
  SET_MODAL_DAY = "SET_MODAL_DAY",
  CLEAR_STORE = "CLEAR_STORE",
}

export interface TAction {
  // TODO: Remove any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  type: TActionTypes;
}

export const setShopSettings = (settings: TShopSettings): TAction => ({
  payload: settings,
  type: TActionTypes.SET_SHOP_SETTINGS,
});

export const addToCart = (product: TCartProduct): TAction => ({
  payload: product,
  type: TActionTypes.ADD_PRODUCT,
});

export const removeFromCart = (id: string, quantity: number): TAction => ({
  payload: {
    id,
    quantity,
  },
  type: TActionTypes.REMOVE_PRODUCT,
});

export const clearCart = (): TAction => ({
  payload: null,
  type: TActionTypes.CLEAR_CART,
});

export const decreaseQuantity = (id: string, quantity: number): TAction => ({
  payload: {
    id,
    quantity,
  },
  type: TActionTypes.DECREASE_QUANTITY,
});

export const increaseQuantity = (id: string, quantity: number): TAction => ({
  payload: {
    id,
    quantity,
  },
  type: TActionTypes.INCREASE_QUANTITY,
});

export const changeAdditionalQuantity = (
  id: string,
  quantity: number
): TAction => ({
  payload: {
    id,
    quantity,
  },
  type: TActionTypes.CHANGE_ADDITIONAL_QUANTITY,
});

export const setAdditionals = (additionals: TAdditional[]): TAction => ({
  payload: additionals,
  type: TActionTypes.SET_ADDITIONALS,
});

export const setCutleryAmount = (amount: number): TAction => ({
  payload: amount,
  type: TActionTypes.SET_CUTLERY_AMOUNT,
});

export const setCutleryAmountError = (error: boolean): TAction => ({
  payload: error,
  type: TActionTypes.SET_CUTLERY_AMOUNT_ERROR,
});

export const setPickup = (checked: boolean): TAction => ({
  payload: checked,
  type: TActionTypes.SET_PICKUP,
});

export const setDeliveryPrice = (price: number): TAction => ({
  payload: price,
  type: TActionTypes.SET_DELIVERY_PRICE,
});

export const setDeliveryDistance = (distance: number): TAction => ({
  payload: distance,
  type: TActionTypes.SET_DELIVERY_DISTANCE,
});

export const setTotalRollsDiscount = (price: number): TAction => ({
  payload: price,
  type: TActionTypes.SET_TOTAL_ROLLS_DISCOUNT,
});

export const setSchedule = ({
  schedule_cs,
  schedule_ru,
}: Record<string, TSchedule>) => ({
  payload: {
    schedule_cs,
    schedule_ru,
  },
  type: TActionTypes.SET_SCHEDULE,
});

export const setAgree = (isChecked: boolean): TAction => ({
  payload: isChecked,
  type: TActionTypes.SET_AGREE,
});

export const setAgreeError = (error: boolean): TAction => ({
  payload: error,
  type: TActionTypes.SET_AGREE_ERROR,
});

export const setCustomerEmail = (email: string): TAction => ({
  payload: email,
  type: TActionTypes.SET_CUSTOMER_EMAIL,
});

export const setCustomerEmailError = (error: boolean): TAction => ({
  payload: error,
  type: TActionTypes.SET_CUSTOMER_EMAIL_ERROR,
});

export const setCustomerName = (name: string): TAction => ({
  payload: name,
  type: TActionTypes.SET_CUSTOMER_NAME,
});

export const setCustomerAddress = (address: string): TAction => ({
  payload: address,
  type: TActionTypes.SET_CUSTOMER_ADDRESS,
});

export const setCustomerPhone = (phone: PhoneNumberValue): TAction => ({
  payload: phone,
  type: TActionTypes.SET_CUSTOMER_PHONE,
});

export const setCustomerNote = (note: string): TAction => ({
  payload: note,
  type: TActionTypes.SET_CUSTOMER_NOTE,
});

export const setDeliveryError = (error: boolean): TAction => ({
  payload: error,
  type: TActionTypes.SET_DELIVERY_ERROR,
});

export const setCustomerNameError = (error: boolean): TAction => ({
  payload: error,
  type: TActionTypes.SET_CUSTOMER_NAME_ERROR,
});

export const setCustomerAddressError = (error: boolean): TAction => ({
  payload: error,
  type: TActionTypes.SET_CUSTOMER_ADDRESS_ERROR,
});

export const setCustomerPhoneError = (error: boolean): TAction => ({
  payload: error,
  type: TActionTypes.SET_CUSTOMER_PHONE_ERROR,
});

export const setPaymentType = (paymentType: TPayment): TAction => ({
  payload: paymentType,
  type: TActionTypes.SET_PAYMENT_TYPE,
});

export const setModalDay = (modalDay: TModalDay): TAction => ({
  payload: modalDay,
  type: TActionTypes.SET_MODAL_DAY,
});
