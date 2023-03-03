import type { NextApiRequest, NextApiResponse } from 'next'
import { GetCertifications } from 'utils/certifications'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const items = GetCertifications()
  const item = items.find((i) => i.id === id)

  if (!item) {
    return res.status(404).json({
      status: 404,
      message: 'Not found',
    })
  }

  res.status(200).json({
    status: 200,
    message: '',
    data: item,
  })
}
