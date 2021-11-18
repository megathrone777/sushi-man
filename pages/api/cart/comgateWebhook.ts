import { NextApiRequest } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";

const handler = async (request: NextApiRequest) => {
  const { refId, status } = request.body;

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
          comgatePaymentStatus: status,
        },
        where: {
          id: refId,
        },
      },
    },
  });
};

export default handler;
