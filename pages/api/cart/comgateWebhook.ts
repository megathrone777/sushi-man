import { NextApiRequest } from "next";

const handler = async (request: NextApiRequest) => {
  console.log(request);
};

export default handler;
