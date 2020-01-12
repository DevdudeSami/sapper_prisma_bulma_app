import { query, mutate } from 'svelte-apollo'
import { gql } from 'apollo-boost'
import { client } from './gqlClient'

export async function checkPermission() {
	const permission = await query(client(), { query: gql`
		query {
			checkPermission
		}
	` }).result()

	return permission.data.checkPermission
}