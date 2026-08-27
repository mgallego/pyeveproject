import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import EveTitle from './EveTitle'

describe('EveTitle', () => {
  it('renders the text "PyEveProject"', () => {
    render(<EveTitle />)
    expect(
      screen.getByRole('heading', { name: /PyEveProject/i }),
    ).toBeInTheDocument()
  })

  it('uses a single top-level h1 heading', () => {
    render(<EveTitle />)
    const heading = screen.getByRole(
      'heading',
      { level: 1, name: /PyEveProject/i },
    )
    expect(heading).toBeInTheDocument()
  })
})
