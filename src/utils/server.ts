import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'
import { SiweMessage } from 'siwe'
import { SERVER_SESSION_SETTINGS } from './config'

declare module 'iron-session' {
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, SERVER_SESSION_SETTINGS)
}
