import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

import { get } from 'svelte/store'
import { session } from './stores'

export function client() {
  const user = get(session).user
  
  return new ApolloClient({
    uri: 'http://localhost:4000',
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
