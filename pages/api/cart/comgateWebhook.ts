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
              id
              address
              phone
              email
              price
              comgatePaymentStatus
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
        `Заказ №${updateOrder["order"]["id"]}
        \n <b>Phone:</b> ${updateOrder["order"]["phone"]} 
        \n <b>Email:</b> ${updateOrder["order"]["email"]} 
        \n <b>Price:</b> ${updateOrder["order"]["price"]}Kč 
        \n <b>Payment status:</b> ${updateOrder["order"]["comgatePaymentStatus"]}`
      );
      telegramSendMessage(`Address: ${updateOrder["order"]["address"]}`);
    }

    return;
  }

  response.send({ statusCode: 404 });
};

export default handler;
