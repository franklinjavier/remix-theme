import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { setTheme } from '~/lib/cookies.server'

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const theme = formData.theme

  const headers = new Headers()
  headers.append(
    'Set-Cookie',
    await setTheme.serialize({
      theme,
    }),
  )

  return new Response(null, { headers })
}

export function loader() {
  return redirect('/', 404)
}
