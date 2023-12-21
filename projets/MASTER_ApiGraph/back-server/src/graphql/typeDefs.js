const gql = require("graphql-tag");

const typeDefs = gql`
  scalar Date

  type Post {
    id: ID!
    author: String!
    title: String!
    link: String!
    createdAt: Date!
  }
  type Comment {
    id: ID!
    author: String!
    content: String!
    postId: ID!
    createdAt: Date!
  }

  type Query {
    getPosts(order: String): [Post]!
    getPost(id: ID!): Post!
    getPostComments(postId: ID!): [Comment]!
  }
  type Mutation {
    createPost(author: String!, title: String!, link: String!): Post!
    deletePost(postId: ID!): ID!
    createComment(author: String!, content: String!, postId: ID!): Comment!
  }
`;

module.exports = { typeDefs };
