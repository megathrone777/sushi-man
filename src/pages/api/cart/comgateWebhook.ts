import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import { telegramSendMessage } from "./telegramSendMessage";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { refId, status } = request.body;
  const {
    data: { order, orders },
  } = await client.query({
    query: gql`
      query OrderQuery($orderId: ID!) {
        order(id: $orderId) {
          id
        }

        orders {
          id
        }
      }
    `,
    variables: {
      orderId: refId,
    },
  });

  if (order && !!Object.keys(order).length && !!orders.length) {
    const {
      data: { updateOrder },
    } = await client.mutate({
      mutation: gql`
        mutation UpdateOrderMutation($input: updateOrderInput) {
          updateOrder(input: $input) {
            order {
              additionals
              address
              comgatePaymentStatus
              deliveryPrice
              cutleryAmount
              email
              id
              name
              phone
              price
              products
              paymentType
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

    if (
      updateOrder["order"] &&
      !!Object.keys(updateOrder["order"]).length &&
      updateOrder["order"].comgatePaymentStatus === "PAID"
    ) {
      telegramSendMessage(
        `Заказ №${orders.length + 1}
      ${updateOrder["order"].products.map(
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
                  const modifier = `\n<b>-${modifier_name}</b>`;
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
        updateOrder["order"].additionals &&
        !!updateOrder["order"].additionals.length
          ? `
        ${updateOrder["order"].additionals.map(
          ({ title, quantity }): string => {
            return `\n--<b>${title} x${quantity}</b>`;
          }
        )}
      `
          : ""
      }
      ${
        updateOrder["order"].note && updateOrder["order"].note.length > 0
          ? `\n${updateOrder["order"].note}`
          : ""
      }
      \n <b>Приборы:</b> ${updateOrder["order"].cutleryAmount}
      \n <b>Доставка:</b> ${
        updateOrder["order"].deliveryPrice >= 50 &&
        updateOrder["order"].deliveryPrice < 100
          ? "Обычная"
          : updateOrder["order"].deliveryPrice >= 100
          ? "Повышенная"
          : updateOrder["order"].deliveryPrice === 0
          ? "Бесплатная"
          : "Самовывоз"
      }
      \n <b>Email:</b> ${updateOrder["order"].email}
      \n <b>Тип оплаты:</b> Картой онлайн
      \n <b>Цена:</b> ${updateOrder["order"].price}Kč
      \n <a href="tel:${updateOrder["order"].phone.replace(
        / /g,
        ""
      )}">${updateOrder["order"].phone.replace(/ /g, "")} ${
          updateOrder["order"].name
        }</a>
      `,
        () => {
          if (updateOrder["order"].address) {
            telegramSendMessage(`${updateOrder["order"].address}`);
          }
        }
      );
    }
  }

  response.status(200).send({});
};

export default handler;
