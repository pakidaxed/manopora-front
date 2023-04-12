<script setup>
import {useUserStore} from "../stores/auth/user";

const userStore = useUserStore()
</script>
<template>
  <header>
      HEADER
  </header>
    <main class="grow d-flex justify-center pa5">
      MAIN
        <RouterLink to="/login">LOGIN</RouterLink>
  </main>
  <footer>
      manopora.lt
  </footer>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
