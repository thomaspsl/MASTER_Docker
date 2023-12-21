const { Post } = require("../../models/Post.js");
const { Comment } = require("../../models/Comment.js");

const resolvers = {
    Query: {
        getPosts: async (parent, args) => {
            try {
                const order = args.order || 'asc';
                const sortOrder = order === 'desc' ? -1 : 1;
                const posts = await Post.find().sort({ createdAt: sortOrder });
                return posts;
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        },
        getPost: async (parent, args) => {
            try {
                const post = await Post.findById(args.id);
                return post;
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        },
        getPostComments: async (parent, args) => {
            try {
                const post = await Post.findById(args.postId);
                const comments = await Comment.find({ postId: post.id });
                return comments;
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        },
    },
    Mutation: {
        createPost: async (parent, args) => {
            try {
                if (!args.author || !args.title || !args.link) throw new Error('Some fields are required');
                
                const post = new Post({ author: args.author, title: args.title, link: args.link });
                await post.save();
                return post;
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        },
        deletePost: async (parent, args) => {
            try {
                const deletedPost = await Post.findByIdAndDelete(args.postId, { new : true });
                await Comment.deleteMany({ postId: args.postId });
                return deletedPost.id;
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        },
    },
};

module.exports = resolvers;
