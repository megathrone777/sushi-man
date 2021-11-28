import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { gql } from "@apollo/client";

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

  if (paymentType === "cash") {
    telegramSendMessage(
      `Заказ №${orderId}
    ${products.map(({ product_modifiers, title, quantity }): string => {
      const modifiers =
        (product_modifiers &&
          !!product_modifiers.length &&
          product_modifiers.map(
            ({
              price,
              name: modifier_name,
              submodifiers: modifier_submodifiers,
            }): string => {
              const modifier = `\n<b>-${modifier_name} ${price}Kč</b>`;
              const submodifiers =
                modifier_submodifiers &&
                !!modifier_submodifiers.length &&
                modifier_submodifiers.map(
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
    })}
    ${note && note.length > 0 ? `\n${note}` : ""}
    \n <b>Приборы:</b> ${cutleryAmount}
    \n <b>Email:</b> ${email}
    \n <b>Тип оплаты:</b> Наличные
    \n <b>Цена:</b> ${orderPrice}Kč ${
        deliveryPrice >= 50 && deliveryPrice < 100
          ? "D"
          : deliveryPrice >= 100
          ? "DP"
          : ""
      }
    \n <a href="tel:${phone}">${phone}</a>
    \n ${address !== null && address.length > 0 ? "" : "Самовывоз"}
    `,
      () => {
        if (address) {
          telegramSendMessage(`${address}`);
        }
      }
    );

    response.send({ redirect: "/orderConfirmed", statusCode: 0 });
    return;
  }

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
    return;
  }

  client.mutate({
    mutation: gql`
      mutation UpdateOrderMutation($input: updateOrderInput) {
        updateOrder(input: $input) {
          order {
            comgateTransId
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
};

export { config };
export default handler;
