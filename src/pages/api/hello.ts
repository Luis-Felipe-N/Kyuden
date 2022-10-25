// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  html: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const body = req.body

    console.log("Porra do link", body.data.linkEmbed)

    const { data } = await axios.get(body.data.linkEmbed)
    // if ( typeof linkEmbed == "string" ) {
    // }
    res.status(200).json({ html: data })
  } else {
    // Handle any other HTTP method
  }

  res.status(200).json({ html: '' })

}
