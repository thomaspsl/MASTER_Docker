const postResolver = require("./resolvers/PostResolver");
const commentResolver = require("./resolvers/CommentResolver");

const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...postResolver.Mutation,
    ...commentResolver.Mutation
  },
};

module.exports = { resolvers };