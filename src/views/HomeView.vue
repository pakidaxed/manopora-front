<script setup>
import MainHeader from "../components/header/MainHeader.vue";
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

</style>
