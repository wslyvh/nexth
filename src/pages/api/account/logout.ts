import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'utils/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method, '/api/account/logout')

  if (req.method === 'GET') {
    req.session.destroy()
    return res.send({ ok: true })
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
