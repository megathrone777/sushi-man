import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // internal order id
  request.body.id

  const res = await fetch('payments.comgate.cz/v1.0/create', {
    // add headers
    // remember: call it as application/x-www-form-urlencoded
    method: 'POST',
    body: {
      merchant: 457844,
      price: request.body.price,
      curr: 'CZK',
      label: 'sushi',
      refId: request.body.id,
      method: 'ALL',
      prepareOnly: true,
      test: true,
      secret: '44j6AON7H3NQuXClU62bfNIeniPbhOk3'
    }
  })

  if (!res.status !== 200) {
    return response.send('INTERNAL ERROR') // 500
  }

  res.body
  // code=0&message=OK&transId=AB12-EF34-IJ56&redirect=https%3A%2F%2Fpayments.comgate.cz%2Fclient%2Finstructions%2F%3Fid%3DABCDEFGHIJ 
  if (res.body.code !== 0) {
    // post request to Strapi - update order: status = CANCELED
    throw new Error(res.body.message);
  }

  const transId = res.body.transId;
    // post request to Strapi - update order: comgateTransId = transId
    // 

  const redirect = `https%3A%2F%2Fpayments.comgate.cz%2Fclient%2Finstructions%2F%3Fid%3DABCDEFGHIJ`;
  response redirect (status = 302, url = redirect)

};

export default handler;
