import { setupServer } from 'msw/node'
import { handlers } from './handlerIndex'

export const server = setupServer(...handlers)
