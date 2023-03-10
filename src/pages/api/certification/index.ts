import type { NextApiRequest, NextApiResponse } from 'next'
import { GetCertifications } from 'utils/certifications'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const items = GetCertifications()

  res.status(200).json(items)
}
