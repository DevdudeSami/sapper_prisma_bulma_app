import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

import { get } from 'svelte/store'
import { session } from './stores'

export function client() {
  const user = get(session).user
  
  let endpoint

  if (!process.browser) {
    global.window = {}; // Temporarily define window for server-side
    endpoint = 'http://gql-api:4000'
  } else {
    endpoint = 'http://localhost:4000/'
  }

  return new ApolloClient({
    uri: endpoint,
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
