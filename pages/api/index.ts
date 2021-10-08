import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'isomorphic-unfetch';

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  response.status(300);
};

export default handler;
