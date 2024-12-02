import type { RestFetcher } from '#src/rest.js'

export const createTransfer = (request: RestFetcher) => {
  /**
   * @see https://docs.lnmarkets.com/api/operations/usertransfer
   */
  return async (body: { amount: number; toUsername: string }) =>
    request({
      body,
      method: 'POST',
      path: '/user/transfer',
      requireAuth: true,
    }) as Promise<{
      amount: number
      to: string
    }>
}
