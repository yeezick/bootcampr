import { server } from './server'
import { rest } from 'msw'

export const failEndpoint = (path: string, httpMethod: string): void => {
  server.use(
    rest[httpMethod]('/api' + path, (req, res, ctx) => {
      return res.once(ctx.status(400))
    })
  )
}

export const oneTimeApiResponse = (
  path: string,
  httpMethod: string,
  statusCode: number,
  jsonResponse: object
): void => {
  server.use(
    rest[httpMethod]('/api' + path, (req, res, ctx) => {
      return res.once(
        statusCode && ctx.status(statusCode),
        jsonResponse && ctx.json(jsonResponse)
      )
    })
  )
}
