import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../theme-toggle'
import { Theme, useTheme } from '~/hooks/useTheme'

vi.mock('@remix-run/react', () => ({
  useFetcher: () => ({
    Form: ({ children }: { children: React.ReactNode }) => children,
  }),
}))

vi.mock('~/hooks/useTheme', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...(original as any),
    useTheme: vi.fn(),
  }
})

describe('ThemeToggle', () => {
  it('renders the toggle button correctly for light theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: Theme.light,
      isDark: false,
    })

    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveValue(Theme.dark)
  })

  it('renders the toggle button correctly for dark theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: Theme.dark,
      isDark: true,
    })

    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveValue(Theme.light)
  })

  it('submits the form with the correct theme value', async () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: Theme.dark,
      isDark: true,
    })
    render(<ThemeToggle />)
    const button = screen.getByRole('button')

    await userEvent.click(button)
    expect(button).toHaveValue('light')
    expect(button).toHaveAttribute('name', 'theme')
  })
})
