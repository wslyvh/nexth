import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'
import { SiweMessage } from 'siwe'
import { SITE_NAME } from './site'

declare module 'iron-session' {
  interface IronSessionData {
    nonce: string
    siwe: SiweMessage
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, SERVER_SESSION_SETTINGS)
}

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
