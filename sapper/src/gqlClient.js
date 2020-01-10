import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

export function client() {
  return new ApolloClient({
    uri: 'http://localhost:4000',
    fetch
  })
}
