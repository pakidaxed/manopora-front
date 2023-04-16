<script setup>
import {useUserStore} from "../stores/auth/user";
import MainHeader from "../components/header/MainHeader.vue";

const userStore = useUserStore()
</script>
<template>
  <header>
      <MainHeader />
  </header>
    <main class="grow d-flex justify-center pa5 content-wrap">
        <div class="container">
            <RouterView />
        </div>

  </main>
  <footer>
      manopora.lt
  </footer>
</template>

<style scoped>
footer {
    text-align: center;
}
</style>
