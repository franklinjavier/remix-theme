import { useFetchers, useRouteLoaderData } from '@remix-run/react'
import { renderHook } from '@testing-library/react'
import { Theme, useTheme } from '~/hooks/useTheme'

vi.mock('@remix-run/react', () => ({
  useRouteLoaderData: vi.fn(),
  useFetchers: vi.fn(),
}))

describe('useTheme', () => {
  it('returns the current theme based on the loader data', () => {
    vi.mocked(useRouteLoaderData).mockReturnValue({ theme: Theme.dark })
    vi.mocked(useFetchers).mockReturnValue([])

    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe(Theme.dark)
    expect(result.current.isDark).toBe(true)
  })

  it('returns light theme as default if no theme is set', () => {
    vi.mocked(useRouteLoaderData).mockReturnValue({})
    vi.mocked(useFetchers).mockReturnValue([])

    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe(Theme.light)
    expect(result.current.isDark).toBe(false)
  })

  it('updates theme based on fetcher formData', () => {
    const fetchers = [
      {
        formData: new FormData(),
      },
    ]
    fetchers[0].formData.append('intent', 'theme')
    fetchers[0].formData.append('theme', Theme.dark)

    vi.mocked(useRouteLoaderData).mockReturnValue({})
    vi.mocked(useFetchers).mockReturnValue(fetchers as any)

    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe(Theme.dark)
    expect(result.current.isDark).toBe(true)
  })
})
