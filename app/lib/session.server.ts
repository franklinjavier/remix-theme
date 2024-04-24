import { createCookieSessionStorage } from '@remix-run/node'

import type { Session } from '@remix-run/node'

export const ONE_YEAR = 365 * 24 * 60 * 60

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme-demo-session',
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ['s3cr3t'],
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
    maxAge: ONE_YEAR, // 1 year in seconds
  },
})

export const { commitSession, destroySession } = sessionStorage

export function getSession(request: Request): Promise<Session> {
  return sessionStorage.getSession(request.headers.get('Cookie'))
}
