import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";

const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { promoCode } = request.body;

  const {
    data: { promos },
  } = await client.query({
    query: gql`
      query PromoCodesQuery($where: JSON) {
        promos(where: $where) {
          Code
          Percent
        }
      }
    `,
    variables: {
      where: {
        Code: promoCode,
      },
    },
  });

  response.send({
    statusCode: promos && !!promos.length ? 200 : 403,
    discount: promos[0]?.Percent,
  });
};

export { config };
export default handler;
