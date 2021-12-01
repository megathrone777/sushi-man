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
        `Заказ №${updateOrder.id}
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
        updateOrder.additionals && !!updateOrder.additionals.length
          ? `
        ${updateOrder.additionals.map(({ title, quantity }): string => {
          return `\n--<b>${title} x${quantity}</b>`;
        })}
      `
          : ""
      }
      ${updateOrder.note && updateOrder.note.length > 0 ? `\n${updateOrder.note}` : ""}
      \n <b>Приборы:</b> ${updateOrder.cutleryAmount}
      \n <b>Email:</b> ${updateOrder.email}
      \n <b>Тип оплаты:</b> Картой
      \n <b>Цена:</b> ${updateOrder.price}Kč ${
          updateOrder.deliveryPrice >= 50 && updateOrder.deliveryPrice < 100
            ? "Д"
            : updateOrder.deliveryPrice >= 100
            ? "ДП"
            : ""
        }
      \n <b>Статус оплаты:</b> ${updateOrder.comgatePaymentStatus}
      \n <a href="tel:${updateOrder.phone}">${updateOrder.phone} ${updateOrder.name}</a>
      \n ${updateOrder.address !== null && updateOrder.address.length > 0 ? "" : "Самовывоз"}
      `,
        () => {
          if (updateOrder.address) {
            telegramSendMessage(`${updateOrder.address}`);
          }
        }
      );
    }

    return;
  }

  response.send({ statusCode: 404 });
};

export default handler;
