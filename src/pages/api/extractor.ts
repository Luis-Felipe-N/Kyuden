// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import Error from 'next/error';

type Data = {
  html?: string;
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('AAAAAAAAAAAAAAAAA')
  if (req.method === 'POST') {
    try {
      const { linkEmbed, userAgent} = req.body.data

      const { data } = await axios.get(linkEmbed, {headers: {"User-agent": userAgent}})
      
      return res.status(200).json({ html: data })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  return res.status(200).json({ message: 'Link embed é obrigatório' })

}
