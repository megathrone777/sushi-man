import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { orderId, orderPrice } = request.body;

  /// merchant=457844&price=1000&curr=CZK&label=sushiManOrder&refId=1&method=ALL&prepareOnly=true&secret=44j6AON7H3NQuXClU62bfNIeniPbhOk3

  const comgateResponse = await fetch(
    "http://payments.comgate.cz/v1.0/create",
    {
      body: `merchant=457844&price=${
        orderPrice * 100
      }
        &curr=CZK
        &label=sushiManOrder
        &refId=${orderId}
        &email=megathrone3333@gmail.com
        &method=ALL
        &prepareOnly=true
        &secret=44j6AON7H3NQuXClU62bfNIeniPbhOk3
        &test=true`,
        
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "ALL",
    }
  );

  console.log(comgateResponse);

  // if (!comgateResponse.status !== 200) {
  //   return response.send('INTERNAL ERROR') // 500
  // }

  // code=0&message=OK&transId=AB12-EF34-IJ56&redirect=https%3A%2F%2Fpayments.comgate.cz%2Fclient%2Finstructions%2F%3Fid%3DABCDEFGHIJ
  // if (res.body.code !== 0) {
  // post request to Strapi - update order: status = CANCELED
  //   throw new Error(res.body.message);
  // }

  // const transId = res.body.transId;
  // post request to Strapi - update order: comgateTransId = transId
  //

  // const redirect = `https%3A%2F%2Fpayments.comgate.cz%2Fclient%2Finstructions%2F%3Fid%3DABCDEFGHIJ`;
  // response redirect (status = 302, url = redirect)
};

export default handler;
