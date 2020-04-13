import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

import { get } from 'svelte/store'
import { session } from './stores'

export function client() {
  const user = get(session).user
  
  return new ApolloClient({
    uri: process.env.GQL_API_SERVER,
    fetch,
    request: operation => {
      operation.setContext({
        headers: {
          authorization: user ? `Bearer ${user.token}` : ''
        }
      })
    }
  })
}
