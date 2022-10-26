// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  html: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { linkEmbed, userAgent} = req.body.data

    const { data } = await axios.get(linkEmbed, {headers: {"User-agent": userAgent}})
    
    res.status(200).json({ html: data })
  } else {
    
  }

  res.status(200).json({ html: '' })

}
