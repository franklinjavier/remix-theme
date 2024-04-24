import { createCookie } from '@remix-run/node'

export const ONE_YEAR = 365 * 24 * 60 * 60

export const setTheme = createCookie('theme', {
  maxAge: ONE_YEAR,
})

export async function getTheme(request: Request) {
  const cookie = (await setTheme.parse(request.headers.get('Cookie'))) || {}
  return cookie.theme
}
