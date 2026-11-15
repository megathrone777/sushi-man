import { about } from "./about";
import { additionalInfo } from "./additionalInfo";
import { additionals } from "./additionals";
import { cart } from "./cart";
import { cartLayout } from "./cartLayout";
import { categories } from "./categories";
import { clients } from "./clients";
import { deliveryConditions } from "./deliveryConditions";
import { hero } from "./hero";
import { modifiers } from "./modifiers";
import { orders } from "./orders";
import { products } from "./products";
import { promocodes } from "./promocodes";
import { promotion } from "./promotion";
import { redis } from "./redis";
import { reviews } from "./reviews";
import { rules } from "./rules";
import { sessions } from "./sessions";
import { shop } from "./shop";
import { smsTemplates } from "./smsTemplates";
import { submodifiers } from "./submodifiers";
import { terms } from "./terms";
import { users } from "./users";

const store = {
  about,
  additionalInfo,
  additionals,
  cart,
  cartLayout,
  categories,
  clients,
  deliveryConditions,
  hero,
  modifiers,
  orders,
  products,
  promocodes,
  promotion,
  redis,
  reviews,
  rules,
  sessions,
  shop,
  smsTemplates,
  submodifiers,
  terms,
  users,
};

export { realtime, type RealtimeEvents } from "./realtime";
export { store };
