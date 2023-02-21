// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const fetcher = (path:any) => fetch(path).then((res) => res.json());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const CMS_API = process.env.CMS_API+'/api/biscuits/1';
  try {
    const biscuits = await fetcher(`${CMS_API}`);
    // res.status(200).json({ biscuits })
    console.log(biscuits)
  }
  catch (error) {
    console.log(22)
  }

  res.status(200).json({ name: CMS_API })
}
