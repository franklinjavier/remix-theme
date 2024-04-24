import { type MetaFunction } from '@remix-run/node'
import { ThemeToggle } from '~/components/theme-toggle'
import { Title } from '~/components/title'

const title = 'Remix Theme'

export const meta: MetaFunction = () => {
  return [{ title }, { name: 'description', content: title }]
}

export default function Index() {
  return (
    <main className="mx-auto py-32 text-center sm:py-48">
      <Title>{title}</Title>
      <p className="mb-8">Example of theme mode feature in Remix</p>
      <ThemeToggle />
    </main>
  )
}
