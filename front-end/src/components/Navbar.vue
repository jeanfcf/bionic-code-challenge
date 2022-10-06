<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        ><img
          class="navbar-logo mx-5"
          src="../assets/logo.png"
          alt="Logo"
          width="50"
          height="50"
      /></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text>Interview Code Challenge</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>