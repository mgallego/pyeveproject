import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import NotFound from './pages/NotFound'
import { AppRoutes } from './App'

describe('App', () => {
  it('renders the landing page at the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { level: 1, name: /PyEveProject/i }),
    ).toBeInTheDocument()
  })

  it('renders the not-found page for unknown paths', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent-page']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { level: 1, name: /Page Not Found/i }),
    ).toBeInTheDocument()
  })

  it('allows adding new routes without breaking root or catch-all', () => {
    const testRoutes = (
      <Routes>
        <Route path="/" element={<div>landing</div>} />
        <Route path="/about" element={<div>about</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )

    const root = render(<MemoryRouter initialEntries={['/']}>{testRoutes}</MemoryRouter>)
    expect(root.getByText('landing')).toBeInTheDocument()
    root.unmount()

    const about = render(<MemoryRouter initialEntries={['/about']}>{testRoutes}</MemoryRouter>)
    expect(about.getByText('about')).toBeInTheDocument()
    about.unmount()

    const missing = render(
      <MemoryRouter initialEntries={['/missing']}>{testRoutes}</MemoryRouter>,
    )
    expect(
      missing.getByRole('heading', { level: 1, name: /Page Not Found/i }),
    ).toBeInTheDocument()
  })
})