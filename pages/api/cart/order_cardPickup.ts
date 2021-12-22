import { NextApiRequest, NextApiResponse } from "next";

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
    cutleryAmount,
    note,
    orderId,
    orderPrice,
    email,
    name,
    phone,
    products,
  } = request.body;

  const message = `Заказ №${orderId}
  ${products.map(
    ({ product_modifiers, product_submodifiers, title, quantity }): string => {
      const modifiers =
        (product_modifiers &&
          !!product_modifiers.length &&
          product_modifiers.map(
            ({ price, name: modifier_name }, index: number): string => {
              const modifier = `\n<b>-${modifier_name} ${price}Kč</b>`;
              const modifier_submodifiers = product_submodifiers.filter(
                ({ modifierIndex }) => modifierIndex === index
              );
              const submodifiers = modifier_submodifiers.map(
                ({ name: submodifier_name }): string => {
                  return `\n--<b>${submodifier_name}</b>`;
                }
              );

              return modifier + submodifiers;
            }
          )) ||
        "";

      return `\n<b>${title} ${
        quantity !== 1 ? `x${quantity}` : ""
      }</b>${modifiers}`;
    }
  )}
  ${
    additionals && !!additionals.length
      ? `
    ${additionals.map(({ title, quantity }): string => {
      return `\n--<b>${title} x${quantity}</b>`;
    })}
  `
      : ""
  }
  ${note && note.length > 0 ? `\n${note}` : ""}
  \n <b>Приборы:</b> ${cutleryAmount}
  \n <b>Доставка:</b> Самовывоз
  \n <b>Email:</b> ${email}
  \n <b>Тип оплаты:</b> Картой на месте
  \n <b>Цена:</b> ${orderPrice}Kč
  \n <a href="tel:${phone.replace(/ /g, "")}">${phone.replace(
    / /g,
    ""
  )} ${name}</a>
  `;

  telegramSendMessage(message, () => {
    response.send({ redirect: "/orderConfirmed" });
  });
};

export { config };
export default handler;
