<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import queryManagerInstance from "../graphql/queryManagerInstance";

const router = useRouter();

const post = ref({
  author: "",
  title: "",
  link: "",
});

async function createPost() {
  await queryManagerInstance.createPost(
    post.value.title,
    post.value.author,
    post.value.link
  );
  post.value.author = "";
  post.value.title = "";
  post.value.link = "";

  router.push("/");
}
</script>

<template>
  <div class="create-post">
    <input
      v-model="post.author"
      class="input"
      type="text"
      placeholder="Auteur"
    />
    <input v-model="post.title" class="input" type="text" placeholder="Titre" />
    <input v-model="post.link" class="input" type="text" placeholder="Lien" />
    <button @click="createPost" class="button button-primary">Poster</button>
  </div>
</template>

<style scoped>
.create-post {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100% - 58px);
}

.input {
  margin: 5px 0;
}

.button {
  margin-top: 10px;
}
</style>
