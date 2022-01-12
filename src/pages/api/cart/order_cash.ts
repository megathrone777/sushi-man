import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";
import { format, endOfDay } from "date-fns";

import client from "~/apollo-client";
import { TAdditional } from "~/store";
import { telegramSendMessage } from "./telegramSendMessage";

const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    additionals,
    address,
    cutleryAmount,
    deliveryPrice,
    note,
    orderPrice,
    email,
    name,
    phone,
    products,
    promoCodeSuccess,
    promoCodeDiscount,
  } = request.body;
  const {
    data: { orders },
  } = await client.query({
    query: gql`
      query OrdersQuery($ordersWhere: JSON) {
        orders(where: $ordersWhere) {
          id
        }
      }
    `,
    variables: {
      ordersWhere: {
        dayCreated: format(endOfDay(new Date()), "yyyy-MM-dd"),
        comgatePaymentStatus: "PAID",
      },
    },
  });

  const message: string[] = [];

  if (orders) {
    message.push(`Заказ №${orders.length}`);
  }

  if (products && !!products.length) {
    const productsList = products.map(
      ({
        product_modifiers,
        product_submodifiers,
        title,
        quantity,
      }): string => {
        const modifiers: string[] = [];

        if (product_modifiers && !!product_modifiers.length) {
          const modifiersList = product_modifiers.map(
            ({ name: modifier_name }, index: number): string => {
              const modifier =
                modifier_name && modifier_name.length > 0
                  ? `\n<b>-${modifier_name}</b>`
                  : "";
              const modifier_submodifiers = product_submodifiers.filter(
                ({ modifierIndex }) => modifierIndex === index
              );
              const submodifiers = modifier_submodifiers.map(
                ({ name: submodifier_name }): string => {
                  return submodifier_name && submodifier_name.length > 0
                    ? `\n--<b>${submodifier_name}</b>`
                    : "";
                }
              );

              return modifier + submodifiers;
            }
          );

          modifiers.push(modifiersList);
        }

        return `\n<b>${title} ${
          quantity !== 1 ? `x${quantity}` : ""
        }</b>${modifiers}`;
      }
    );

    message.push(`\n ${productsList}`);
  }

  if (additionals && !!additionals.length) {
    const additionalsList = additionals.map(
      ({
        title: additional_title,
        quantity: additional_quantity,
      }: TAdditional): string => {
        return additional_title && additional_title.length > 0
          ? `\n--<b>${additional_title} x${additional_quantity}</b>`
          : "";
      }
    );

    message.push(`\n ${additionalsList} \n`);
  }

  if (note && note.length > 0) {
    message.push(`\n${note}`);
    message.push(`\n`);
  }

  if (cutleryAmount) {
    message.push(`\n<b>Приборы:</b> ${cutleryAmount}`);
    message.push(`
    \n<b>Доставка:</b> ${
      deliveryPrice >= 50 && deliveryPrice < 100
        ? "Обычная"
        : deliveryPrice >= 100
        ? "Повышенная"
        : deliveryPrice === 0
        ? "Бесплатная"
        : "Самовывоз"
    }`);
    message.push(`\n`);
  }

  if (email) {
    message.push(`\n <b>Email:</b> ${email}`);
    message.push(`\n`);
    message.push(`\n <b>Тип оплаты:</b> Наличными`);
    message.push(`\n`);
  }

  if (promoCodeSuccess) {
    message.push(`\n Помокод: ${promoCodeDiscount}%`);
    message.push("");
  }

  if (orderPrice) {
    message.push(`\n <b>Цена:</b> ${orderPrice}Kč`);
    message.push(`\n`);
  }

  if (phone) {
    message.push(
      `\n <a href="tel:${phone.replace(/ /g, "")}">${phone.replace(
        / /g,
        ""
      )} ${name}</a>`
    );
  }

  const result = message.join(" ");

  telegramSendMessage(result, () => {
    if (address) {
      telegramSendMessage(`${address}`, () => {
        response.send({ redirect: "/orderConfirmed" });
      });
    } else {
      response.send({ redirect: "/orderConfirmed" });
    }
  });
};

export { config };
export default handler;
