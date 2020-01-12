import fetch from 'node-fetch'
import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'
import { mutate } from 'svelte-apollo'

async function login(email, password) {
	const client = new ApolloClient({
    uri: 'http://localhost:4000',
    fetch
  })

	try {
		const loginMutation = await mutate(client, { mutation: gql`
			mutation {
				login(email:"${email}", password: "${password}") {
					token
					user {
						id
						name
						email
						role
					}
				}
			}
		`})

		return { user: { token: loginMutation.data.login.token, ...loginMutation.data.login.user}}
	} catch(e) {
		return null
	}
}

// When POST is sent to this route
export async function post(req, res, next) {
	const user = await login(req.body.email, req.body.password)
	if (user != null) {
		req.session.user = user
		res.statusCode = 201
		res.end(JSON.stringify(user))
	} else {
		res.statusCode = 401
		res.end()
	}
}