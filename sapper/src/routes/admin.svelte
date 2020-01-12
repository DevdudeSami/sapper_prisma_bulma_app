<script context="module">
	import { checkPermission } from '../utils.js'

	export async function preload(page, session) {
		const permission = await checkPermission()

		if (permission != "Admin") {
			return this.redirect(302, '/login')
		}

		return { }
	}
</script>

<script>

</script>

<div class="container">
	<h1 class="title is-size-2">Admin Page</h1>
	
	<p class="content">
		This page is only accessible by an admin.
	</p>

</div>