
const { Comment } = require("../../models/Comment.js");

const resolvers = {
    Mutation: {
        createComment: async (parent, args) => {
            try {
                if (!args.author || !args.content || !args.postId) throw new Error('Some fields are required');

                const comment = new Comment({ author: args.author, content: args.content, postId: args.postId });
                await comment.save();
                return comment;
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        },
    },
};

module.exports = resolvers;
