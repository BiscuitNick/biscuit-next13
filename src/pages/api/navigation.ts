// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // const { method, url, query } = req; //cookies, body, 
    // // console.log(Object.keys(req));
    // console.log(Object.keys(res));

    // console.log(method, url);


  
  res.status(200).json({ name: 'John Doe' })
}
