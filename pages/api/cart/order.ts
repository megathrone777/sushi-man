import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { gql } from "@apollo/client";

import { TAdditional, TPayment } from "~/store";
import client from "~/apollo-client";
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
    orderId,
    orderPrice,
    email,
    name,
    phone,
    products,
    paymentType,
  } = request.body;

  if (paymentType === TPayment.CASH) {
    telegramSendMessage(
      `Заказ №${orderId}
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
      ${additionals.map(({ title, quantity }: TAdditional): string => {
        return `\n--<b>${title} x${quantity}</b>`;
      })}
    `
        : ""
    }
    ${note && note.length > 0 ? `\n${note}` : ""}
    \n <b>Приборы:</b> ${cutleryAmount}
    \n <b>Доставка:</b> ${
      deliveryPrice >= 50 && deliveryPrice < 100
        ? "Обычная"
        : deliveryPrice >= 100
        ? "Повышенная"
        : "Бесплатная"
    }
    \n <b>Email:</b> ${email}
    \n <b>Тип оплаты:</b> Наличными
    \n <b>Цена:</b> ${orderPrice}Kč
    \n <a href="tel:${phone.replaceAll(" ", "")}">${phone.replaceAll(
        " ",
        ""
      )} ${name}</a>
    \n ${address !== null && address.length > 0 ? "" : "Самовывоз"}
    `,
      () => {
        if (address) {
          telegramSendMessage(`${address}`);
        }
      }
    );

    response.send({ redirect: "/orderConfirmed", statusCode: 0 });
  } else if (paymentType === TPayment.CARDPICKUP) {
    telegramSendMessage(
      `Заказ №${orderId}
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
    \n <b>Доставка:</b> ${
      deliveryPrice >= 50 && deliveryPrice < 100
        ? "Обычная"
        : deliveryPrice >= 100
        ? "Повышенная"
        : "Бесплатная"
    }
    \n <b>Email:</b> ${email}
    \n <b>Тип оплаты:</b> Картой на месте
    \n <b>Цена:</b> ${orderPrice}Kč
    \n <a href="tel:${phone.replace(" ", "")}">${phone.replace(
        " ",
        ""
      )} ${name}</a>
    \n ${address !== null && address.length > 0 ? "" : "Самовывоз"}
    `,
      () => {
        if (address) {
          telegramSendMessage(`${address}`);
        }
      }
    );

    response.send({ redirect: "/orderConfirmed", statusCode: 0 });
  } else {
    const comgateResponse = await fetch(
      "https://payments.comgate.cz/v1.0/create",
      {
        body: `merchant=457844&price=${orderPrice * 100}
          &country=ALL
          &curr=CZK
          &label=sushiManOrder
          &refId=${orderId}
          &email=${email}
          &lang=cs
          &method=ALL
          &phone=${phone}
          &payerName=${name}
          &prepareOnly=true
          &secret=44j6AON7H3NQuXClU62bfNIeniPbhOk3
          &test=true`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      }
    )
      .then((response) => response.text())
      .catch((error) => error.text());

    const params = new URLSearchParams(comgateResponse);
    const comgateData = Object.fromEntries(params);
    const { code, message, redirect, transId } = comgateData;

    if (!code) {
      client.mutate({
        mutation: gql`
          mutation UpdateOrderMutation($input: updateOrderInput) {
            updateOrder(input: $input) {
              order {
                comgatePaymentStatus
              }
            }
          }
        `,
        variables: {
          input: {
            data: {
              comgatePaymentStatus: "CANCELLED",
            },
            where: {
              id: orderId,
            },
          },
        },
      });

      response.send({ statusCode: 500, message });
    } else {
      client.mutate({
        mutation: gql`
          mutation UpdateOrderMutation($input: updateOrderInput) {
            updateOrder(input: $input) {
              order {
                comgateTransId
                comgatePaymentStatus
              }
            }
          }
        `,
        variables: {
          input: {
            data: {
              comgateTransId: transId,
            },
            where: {
              id: orderId,
            },
          },
        },
      });

      response.send({ redirect, message, statusCode: 0 });
    }
  }
};

export { config };
export default handler;
