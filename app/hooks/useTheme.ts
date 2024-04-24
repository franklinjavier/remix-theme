import { useFetchers, useRouteLoaderData } from '@remix-run/react'
import type { loader } from '~/root'

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export type ThemeProps = keyof typeof Theme

export function useTheme() {
  const currentTheme = useRouteLoaderData<typeof loader>('root')
  const fetchers = useFetchers()
  const themeFetcher = fetchers.find(
    (fetcher) => fetcher.formData?.get('intent') === 'theme',
  )
  const theme =
    themeFetcher?.formData?.get('theme') ?? currentTheme?.theme ?? Theme.light
  return { theme, isDark: theme !== Theme.light }
}
