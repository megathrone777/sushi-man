export interface TProps extends Pick<TOrder, "deliveryCoordinates"> {
  initialStatus: TOrderStatus;
  orderId: number;
}
