import { useFetchers, useRouteLoaderData } from '@remix-run/react'

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export type ThemeProps = keyof typeof Theme

export function useTheme() {
  const currentTheme = useRouteLoaderData('root') as { theme: ThemeProps }
  const fetchers = useFetchers()
  const optimisticTheme = fetchers
    .find((fetcher) => fetcher.formData?.get('intent') === 'theme')
    ?.formData?.get('theme') as string
  const theme = optimisticTheme ?? currentTheme.theme ?? Theme.light
  return { theme, isDark: theme !== Theme.light }
}
