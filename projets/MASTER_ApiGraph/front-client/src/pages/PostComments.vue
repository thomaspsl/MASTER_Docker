z<script setup>
import { computed, onMounted, onUpdated, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Post from "../components/Post.vue";
import { RouterLink } from "vue-router";
import queryManagerInstance from "../graphql/queryManagerInstance";
import Comment from "../components/Comment.vue";

let post = ref({
  createdAt: null,
});
let comments = ref({});
let commentAuthor = ref("");
let commentContent = ref("");
const route = useRoute();

async function loadPost() {
  post.value = await queryManagerInstance.getPost(route.params.post_id);
}
async function loadComments() {
  comments.value = await queryManagerInstance.getPostComments(
    route.params.post_id
  );
}

async function addComment() {
  await queryManagerInstance.createComment(
    commentContent.value,
    commentAuthor.value,
    route.params.post_id
  );

  loadComments();

  commentContent.value = "";
  commentAuthor.value = "";
}

onMounted(() => {
  loadPost();
  loadComments();
});

onUpdated(() => {});

const timeAgo = computed(() => {
  var seconds = Math.floor(
    (new Date() - new Date(post.value?.createdAt)) / 1000
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
  <div class="post-wrapper">
    <div class="post-detail">
      <a class="post-link" :href="post?.link"></a>
      <div class="col">
        <span class="post-header">
          <h1 class="post-title">{{ post?.title }}</h1>
          <div class="post-domain">({{ post?.link }})</div>
        </span>
        <div class="post-infos">
          <div class="post-user">Par {{ post?.author }}</div>
          <div class="post-time">Il y a {{ timeAgo }}</div>
        </div>
        <input
          v-model="commentAuthor"
          class="author-input"
          type="text"
          placeholder="Auteur"
        />
        <textarea
          v-model="commentContent"
          class="comment-input"
          placeholder="Commentaire"
        ></textarea>
        <button
          @click="addComment"
          class="button button-primary add-comment-button"
        >
          Poster un commentaire
        </button>
        <div class="comments">
          <Comment
            :comment="comment"
            v-for="comment in comments"
            :key="comment.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-wrapper {
  padding: 20px;
}
.post-detail {
  background: #fff;
  width: 100%;
  padding: 35px;
  display: flex;
  align-items: center;
  position: relative;
}

.post-link {
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

.add-comment-button {
  margin-top: 10px;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
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

input,
textarea {
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.06);
}

.author-input {
  margin-bottom: 20px;
  margin-top: 20px;
}

.comment-input {
  height: 123px;
  width: 346px;
  padding: 20px;
  border: transparent;
}
.comments {
  margin-top: 10px;
}
</style>
