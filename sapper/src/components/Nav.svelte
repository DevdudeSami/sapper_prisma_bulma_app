<script>
	import { checkPermission } from '../utils.js'
  import { stores } from '@sapper/app'
  
  const { session } = stores()

  export let segment

  let permission = checkPermission()

  function logout() {
    fetch("/logout", {
      method: 'POST'
    })
    // TODO: handle potential logout errors
    session.set({ user: null })
    permission = checkPermission()
  }
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">

	<div class="navbar-brand">
    <p class="navbar-item">Authentication example</p>

    <div role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onclick="document.querySelector('.navbar-menu').classList.toggle('is-active');">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>

	<div id="navbarBasicExample" class="navbar-menu">
    <div class:selected='{segment === undefined}' class="navbar-start">
      <a href="/" class="navbar-item">
        Home
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if $session.user != null}
          <button on:click={logout} class="button is-danger">
            Log out
          </button>
          {:else}
          <a href="/signup" class="button is-primary">
            <strong>Register</strong>
          </a>
          <a href="/login" class="button is-light">
            Log in
          </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>
