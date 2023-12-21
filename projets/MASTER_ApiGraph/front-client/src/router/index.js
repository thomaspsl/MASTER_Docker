import { createRouter, createWebHistory } from "vue-router";
import Posts from "../pages/Posts.vue";
import PostComments from "../pages/PostComments.vue";
import CreatePost from "../pages/CreatePost.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
  { path: "/", component: Posts },
  { path: "/old", component: Posts },
  { path: "/posts/:post_id/comments", component: PostComments },
  { path: "/posts/create", component: CreatePost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
