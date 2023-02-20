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
    // res.status(200).json({ name: biscuits })
    console.log(biscuits)
  }
  catch (error) {
    console.log(22)
  }
  // const biscuits = await fetcher(`${CMS_API}/api/biscuits`);

  // const biscuits = await fetch(`${CMS_API}/api/biscuits`, { method: 'GET' });

  // console.log(biscuits);
  // console.log(Object.keys(req));
  // const { cookies, body, query, url, statusMessage, rawHeaders} = req;
  // console.log('cookies', cookies);
  // console.log('body', body);
  // console.log('query', query);
  // console.log('url', url);
  // console.log('statusMessage', statusMessage);
  // console.log('rawHeaders', rawHeaders);


  res.status(200).json({ name: CMS_API })
}
