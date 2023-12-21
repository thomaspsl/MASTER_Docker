<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <header>
    <ul>
      <li class="link"><RouterLink to="/">New </RouterLink></li>
      <li class="link"><RouterLink to="/old">Old</RouterLink></li>
    </ul>
  </header>
  <RouterView :key="route.path" />
</template>

<style scoped>
header {
  background: #ec6d19;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
}
ul {
  display: flex;
}

.buttons {
  margin-left: auto;
}

.button {
  margin: 5px;
}

.link a {
  color: rgba(255, 255, 255, 0.6);
  margin: 10px;
}

.link .router-link-active {
  color: white;
}
</style>
