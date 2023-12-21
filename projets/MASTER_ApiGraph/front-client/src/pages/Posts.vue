<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Post from "../components/Post.vue";
import { RouterLink } from "vue-router";
import queryManagerInstance from "../graphql/queryManagerInstance";

const posts = ref([]);
const route = useRoute();

async function loadPosts() {
  const order = route.path.includes("old") ? "asc" : "desc";
  posts.value = await queryManagerInstance.getPosts(order);
}

async function onPostDeleted() {
  loadPosts();
}

onMounted(() => {
  loadPosts();
});
</script>

<template>
  <div class="home">
    <RouterLink class="button button-primary add-post" to="/posts/create"
      >Ajouter un post</RouterLink
    >
    <div class="posts">
      <Post
        :onPostDeleted="onPostDeleted"
        :post="post"
        v-for="post in posts"
        :key="post.key"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.posts {
  margin-top: 20px;
}

.add-post {
  margin-left: auto;
}
</style>
