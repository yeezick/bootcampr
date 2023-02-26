import { rest } from 'msw'

export const calendarHandlers = [
  rest.get('/calendar/:example', (req, res, ctx) => {
    const { example } = req.params
    if (example === 'success') {
      return res(ctx.json({ greeting: 'hello there' }))
    } else {
      return res(ctx.status(400))
    }
  }),
]
