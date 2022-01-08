import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";

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
      query OrdersQuery {
        orders {
          id
        }
      }
    `,
  });

  telegramSendMessage(
    `Заказ №${orders.length + 1}
    ${products.map(
      ({
        product_modifiers,
        product_submodifiers,
        title,
        quantity,
      }): string => {
        const modifiers =
          (product_modifiers &&
            !!product_modifiers.length &&
            product_modifiers.map(
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
            )) ||
          null;

        return `\n<b>${title} ${
          quantity !== 1 && `x${quantity}`
        }</b>${modifiers}`;
      }
    )}
    ${
      additionals &&
      !!additionals.length &&
      `
      ${additionals.map(({ title, quantity }: TAdditional): string => {
        return title && title.length > 0 && `\n--<b>${title} x${quantity}</b>`;
      })}
    `
    }
    ${note && note.length > 0 ? `\n${note}` : ""}
    \n <b>Приборы:</b> ${cutleryAmount}
    \n <b>Доставка:</b> ${
      deliveryPrice >= 50 && deliveryPrice < 100
        ? "Обычная"
        : deliveryPrice >= 100
        ? "Повышенная"
        : deliveryPrice === 0
        ? "Бесплатная"
        : "Самовывоз"
    }
    \n <b>Email:</b> ${email}
    \n <b>Тип оплаты:</b> Наличными
    ${promoCodeSuccess ? `\n Помокод: ${promoCodeDiscount}%` : ``}
    \n <b>Цена:</b> ${orderPrice}Kč
    \n <a href="tel:${phone.replace(/ /g, "")}">${phone.replace(
      / /g,
      ""
    )} ${name}</a>
    `,
    () => {
      if (address) {
        telegramSendMessage(`${address}`, () => {
          response.send({ redirect: "/orderConfirmed" });
        });
      } else {
        response.send({ redirect: "/orderConfirmed" });
      }
    }
  );
};

export { config };
export default handler;
