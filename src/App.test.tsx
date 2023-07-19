import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  test('My app works as I expected', async () => {
    const user = userEvent.setup()
    const app = render(<App />)

    const textAreaFrom = app.getByPlaceholderText('Enter text to translate')

    await user.type(textAreaFrom, 'Hola mundo')
    const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 })

    expect(result).toBeTruthy()
  })
})
