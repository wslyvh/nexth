import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'
import { withSessionRoute } from 'utils/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method, '/api/account/nonce', req.session)

  if (req.method) {
    req.session.nonce = generateNonce()
    await req.session.save()
    res.setHeader('Content-Type', 'text/plain')
    return res.send(req.session.nonce)
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
