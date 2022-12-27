import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { withSessionRoute } from 'utils/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method, '/api/account/verify', req.session)

  if (req.method === 'POST') {
    try {
      const { message, signature } = req.body
      const siweMessage = new SiweMessage(message)
      const fields = await siweMessage.validate(signature)

      if (fields.nonce !== req.session.nonce) return res.status(422).json({ message: 'Invalid nonce.' })

      req.session.siwe = fields
      await req.session.save()
      return res.json({ ok: true })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
