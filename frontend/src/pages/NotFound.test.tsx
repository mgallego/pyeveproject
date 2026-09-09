import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NotFound from './NotFound'

describe('NotFound', () => {
  it('renders the "Page Not Found" heading', () => {
    render(<NotFound />)
    expect(
      screen.getByRole('heading', { level: 1, name: /Page Not Found/i }),
    ).toBeInTheDocument()
  })

  it('renders a single h1 heading', () => {
    render(<NotFound />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Page Not Found')
  })

  it('renders a message explaining the page does not exist', () => {
    render(<NotFound />)
    expect(screen.getByText(/does not exist/i)).toBeInTheDocument()
  })
})