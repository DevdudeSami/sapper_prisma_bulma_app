<script>
	import { query, mutate } from 'svelte-apollo'
	import { gql } from 'apollo-boost'
	import { client } from '../gqlClient'
	import { goto } from '@sapper/app'

	let name = ""
	let email = ""
	let password = ""
	let confirmPassword = ""

	let loading = false

	async function register() {
		loading = true

		try {
			const signupMutation = await mutate(client(), { mutation: gql`
				mutation {
					signup(
						name: "${name}"
						email:"${email}"
						password: "${password}"
					) {
						token
					}
				}
			`})

			goto('/login')
		} catch(e) {
			console.error(e)
		} finally {
			loading = false
		}

	}

</script>

<div class="container">
	<h1 class="title is-1">Register</h1>


	<div class="field is-horizontal">
		<div class="field-label is-normal">
			<label class="label">Name</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control has-icons-left has-icons-right">
					<input bind:value={name} class="input is-primary is-expanded" type="text" placeholder="">
					<span class="icon is-small is-left">
						<i class="fas fa-user"></i>
					</span>
				</div>
			</div>
		</div>
	</div>

	<div class="field is-horizontal">
		<div class="field-label is-normal">
			<label class="label">Email</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control has-icons-left has-icons-right">
					<input bind:value={email} class="input is-primary is-expanded" type="email" placeholder="">
					<span class="icon is-small is-left">
						<i class="fas fa-envelope"></i>
					</span>
				</div>
			</div>
		</div>
	</div>

	<div class="field is-horizontal">
		<div class="field-label is-normal">
			<label class="label">Password</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control has-icons-left has-icons-right">
					<input bind:value={password} class="input is-primary is-expanded" type="password" placeholder="">
					<span class="icon is-small is-left">
						<i class="fas fa-lock"></i>
					</span>
				</div>
			</div>
		</div>
	</div>

	<div class="field is-horizontal">
		<div class="field-label is-normal">
			<label class="label">Confirm Password</label>
		</div>
		<div class="field-body">
			<div class="field">
				<div class="control has-icons-left has-icons-right">
					<input bind:value={confirmPassword} class="input is-primary is-expanded" type="password" placeholder="">
					<span class="icon is-small is-left">
						<i class="fas fa-lock"></i>
					</span>
				</div>
			</div>
		</div>
	</div>

	<button class="button is-primary" on:click={register}>Register</button>

	{#if loading} 
		<div class="section"><progress class="progress is-small is-info" max="100"></progress></div>
	{/if}
</div>