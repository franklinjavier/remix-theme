import { useFetchers, useRouteLoaderData } from '@remix-run/react'

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export type ThemeProps = keyof typeof Theme

export function useTheme() {
  const currentTheme = useRouteLoaderData('root') as { theme: ThemeProps }
  const fetchers = useFetchers()
  const themeFetcher = fetchers.find(
    (fetcher) => fetcher.formData?.get('intent') === 'theme',
  )
  const theme = themeFetcher?.formData?.get('theme') ?? currentTheme.theme
  return { theme, isDark: theme !== Theme.light }
}
