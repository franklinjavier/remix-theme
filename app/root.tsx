import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import './globals.css'
import { useTheme } from './hooks/useTheme'
import { getTheme } from './lib/cookies.server'

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/logo.svg',
    type: 'image/svg',
  },
]

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = await getTheme(request)
  return { theme }
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  const { theme } = useTheme()

  return (
    <html className={theme ?? data.theme} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {/**
         * This removes anything added to html from extensions, causing hydration issue
          https://github.com/remix-run/remix/issues/4822
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.querySelectorAll("html > script").forEach((s) => s.parentNode?.removeChild(s));`,
          }}
        />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
