import { TProduct } from "~/components";

export interface TProps extends TProduct {
  triggerModal: (modalIsOpened: boolean) => void;
}
