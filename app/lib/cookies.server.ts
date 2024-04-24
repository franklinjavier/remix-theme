import { createCookie } from '@remix-run/node'
import type { ThemeProps } from '~/hooks/useTheme'
import { Theme } from '~/hooks/useTheme'

export const ONE_YEAR = 365 * 24 * 60 * 60

export const setTheme = createCookie('theme', {
  maxAge: ONE_YEAR,
})

export async function getTheme(request: Request): Promise<ThemeProps> {
  const cookie = (await setTheme.parse(request.headers.get('Cookie'))) || {}
  return cookie.theme ?? Theme.light
}
