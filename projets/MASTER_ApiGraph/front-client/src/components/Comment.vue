<script setup>
import { computed } from "vue";

const props = defineProps({
  comment: Object,
});

const timeAgo = computed(() => {
  var seconds = Math.floor(
    (new Date() - new Date(props?.comment?.createdAt)) / 1000
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
  <div class="comment">
    <div class="comment-header">
      <div class="comment-title">
        <div class="comment-author">{{ comment?.author }}</div>
        <div class="comment-time">{{ timeAgo }}</div>
      </div>
      <p class="comment-content">{{ comment?.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.comment {
  margin: 10px 0;
}

.comment-author {
  color: rgba(0, 0, 0, 0.81);

  font-size: 16px;
  font-weight: 700;
}

.comment-title {
  display: flex;
  align-items: center;
}

.comment-time {
  color: rgba(0, 0, 0, 0.54);

  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
}

.comment-content {
  margin-top: 5px;
}
</style>
