<script>
	export let segment;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">

	<div class="navbar-brand">
    <p class="navbar-item">Bulma navbar</p>

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
          <button class="button is-link">Navbar Button</button>
        </div>
      </div>
    </div>
  </div>
</nav>
