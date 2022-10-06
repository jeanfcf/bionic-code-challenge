<template>
  <div id="app">
    <navbar-home />
    <router-view />
  </div>
</template>

<script>
import NavbarHome from "./components/Navbar";

export default {
  name: "App",
  components: {
    NavbarHome,
  },
};
</script>