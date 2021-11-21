import { NextApiRequest } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";

import sendTelegramNotification from './telegramNotification';

const handler = async (request: NextApiRequest) => {
  const { refId, status } = request.body;

  /*
  // find order by id = refId
  const order = await client.query({
    ...
  })

  // if order not found then return 404 status
  if (!order) {
    return NextApiResponse.sendStatus(404);
  }
  */


  await client.mutate({
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
          comgatePaymentStatus: status,
        },
        where: {
          id: refId,
        },
      },
    },
  });


  // send telegram message to the group
  sendTelegramNotification(`Заказ №${order.id} ...`);
};

export default handler;
