import gql from "graphql-tag";
import graphqlClient from ".";

class QueryManager {
  async createPost(title, author, link) {
    const { data } = await graphqlClient.mutate({
      mutation: gql`
        mutation CreatePost{
          createPost(title: "${title}", author: "${author}", link: "${link}") {
            id
            title
            author
            link
            createdAt
          }
        }
      `,
    });

    return data.createPost;
  }
  async deletePost(postId) {
    const { data } = await graphqlClient.mutate({
      mutation: gql`
        mutation DeletePost {
          deletePost(postId: "${postId}")
        }
      `,
    });

    return data.deletePost;
  }
  async createComment(content, author, postId) {
    const {data} = await graphqlClient.mutate({
      mutation: gql`
        mutation CreateComment {
          createComment(author: "${author}", content: "${content}", postId: "${postId}") {
            id
            author
            content
            postId
            createdAt
          }
        }
      `,
    });

    return data.createComment;
  }
  async getPosts(order = "asc") {
    const { data } = await graphqlClient.query({
      query: gql`
        query {
          getPosts(order: "${order}") {
            id
            title
            author
            link
            createdAt
          }
        }
      `,
    });

    return data.getPosts;
  }
  async getPost(id) {
    const { data } = await graphqlClient.query({
      query: gql`
        query GetPost {
          getPost(id: "${id}") {
            id
            author
            title
            link
            createdAt
          }
        }
      `,
    });

    return data.getPost;
  }
  async getPostComments(postId) {
    const { data } = await graphqlClient.query({
      query: gql`
        query GetPostComments {
          getPostComments(postId: "${postId}") {
            id
            author
            content
            postId
            createdAt
          }
        }
      `,
    });

    return data.getPostComments;
  }
}

export default new QueryManager();
