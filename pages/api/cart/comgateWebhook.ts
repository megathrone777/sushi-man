import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import { telegramSendMessage } from "./telegramSendMessage";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { refId, status } = request.body;
  const {
    data: { order },
  } = await client.query({
    query: gql`
      query OrderQuery($orderId: ID!) {
        order(id: $orderId) {
          id
        }
      }
    `,
    variables: {
      orderId: refId,
    },
  });

  if (order && Object.keys(order).length) {
    const {
      data: { updateOrder },
    } = await client.mutate({
      mutation: gql`
        mutation UpdateOrderMutation($input: updateOrderInput) {
          updateOrder(input: $input) {
            order {
              additionals
              id
              address
              phone
              email
              name
              price
              comgatePaymentStatus
              products
            }
          }
        }
      `,

      variables: {
        input: {
          data: {
            comgatePaymentStatus: status,
          },
          where: {
            id: refId,
          },
        },
      },
    });

    if (updateOrder["order"] && Object.keys(updateOrder["order"]).length) {
      telegramSendMessage(
        `Заказ №${updateOrder["order"].id}
      ${updateOrder.products.map(
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
        updateOrder["order"].additionals && !!updateOrder["order"].additionals.length
          ? `
        ${updateOrder["order"].additionals.map(({ title, quantity }): string => {
          return `\n--<b>${title} x${quantity}</b>`;
        })}
      `
          : ""
      }
      ${updateOrder["order"].note && updateOrder["order"].note.length > 0 ? `\n${updateOrder["order"].note}` : ""}
      \n <b>Приборы:</b> ${updateOrder["order"].cutleryAmount}
      \n <b>Email:</b> ${updateOrder["order"].email}
      \n <b>Тип оплаты:</b> Картой
      \n <b>Цена:</b> ${updateOrder["order"].price}Kč ${
        updateOrder["order"].deliveryPrice >= 50 && updateOrder["order"].deliveryPrice < 100
            ? "Д"
            : updateOrder["order"].deliveryPrice >= 100
            ? "ДП"
            : ""
        }
      \n <b>Статус оплаты:</b> ${updateOrder["order"].comgatePaymentStatus}
      \n <a href="tel:${updateOrder["order"].phone}">${updateOrder["order"].phone} ${updateOrder["order"].name}</a>
      \n ${updateOrder["order"].address !== null && updateOrder["order"].address.length > 0 ? "" : "Самовывоз"}
      `,
        () => {
          if (updateOrder["order"].address) {
            telegramSendMessage(`${updateOrder["order"].address}`);
          }
        }
      );
    }

    return;
  }

  response.send({ statusCode: 404 });
};

export default handler;
