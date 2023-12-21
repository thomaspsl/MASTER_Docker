<script setup>
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import queryManagerInstance from "../graphql/queryManagerInstance";

async function onDeletePost() {
  await queryManagerInstance.deletePost(props.post?.id);
  props?.onPostDeleted?.apply();
}

const props = defineProps({
  post: Object,
  onPostDeleted: Function,
});

const timeAgo = computed(() => {
  var seconds = Math.floor(
    (new Date() - new Date(props.post?.createdAt)) / 1000
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " années";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " mois";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " jours";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " heures";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " secondes";
});
</script>

<template>
  <div class="post">
    <a class="post-link" :href="post?.link"></a>
    <div class="col">
      <span class="post-header">
        <h1 class="post-title">{{ post?.title }}</h1>
        <div class="post-domain">({{ post?.link }})</div>
      </span>
      <div class="post-infos">
        <div class="post-user">Par {{ post?.author }}</div>
        <div class="post-time">Il y a {{ timeAgo }}</div>
        <RouterLink :to="`/posts/${post?.id}/comments`" class="post-comments-count">
          Voir les commentaires
        </RouterLink>
      </div>
    </div>
    <div class="post-actions">
      <button @click="onDeletePost" class="button button-red">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
.post {
  background: #fff;
  width: 100%;
  padding: 35px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0;
}

.post .post-link {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.post-actions {
  margin-left: auto;
  z-index: 1;
}

.col {
  display: flex;
  flex-direction: column;
}

.post-header {
  display: flex;
  align-items: center;
}

.post-domain {
  color: rgba(0, 0, 0, 0.6);
  margin-left: 10px;
}

.post-infos {
  display: flex;
  font-size: 14px;
}
.post-title {
  font-size: 16px;
}
.post-user {
  margin-right: 10px;
}
.post-time {
  margin-right: 10px;
}
.post-comments-count {
  z-index: 1;
  text-decoration: underline;
}
</style>
