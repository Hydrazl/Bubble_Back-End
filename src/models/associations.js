import sequelize from "../config/database.js";
import User from './userModel.js'
import Post from './postModel.js'
import Like from './likeModel.js'
import Follow from "./followModel.js";
import Bubble from "./BubbleModel.js";
import BubbleMember from "./BubbleMemberModel.js";
import bubbleAside from './bubbleAsideModel.js';
import Category from "./categoryModel.js";
import Notification from "./notificationModel.js";
// import Comment from "./commentModel.js";

// Relacionamento Usuário
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
User.belongsToMany(Post, { through: Like, foreignKey: "userId", otherKey: 'postId', as: 'likers' });
User.belongsToMany(User, { through: Follow, foreignKey: 'followerId', otherKey: 'followingId', as: 'following' });
User.belongsToMany(User, { through: Follow, foreignKey: 'followingId', otherKey: 'followerId', as: 'followers' });
User.belongsToMany(Bubble, { through: BubbleMember, as: 'bubbles', foreignKey: 'userId' })

// Relacionamento Post - CORRIJA ESTA LINHA
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' }); // REMOVA o "through: User"
Post.belongsToMany(User, { through: Like, foreignKey: "postId", otherKey: 'userId', as: 'likers' });
Post.belongsTo(Category, { foreignKey: "categoryId" });
// Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Category.hasMany(Post, { foreignKey: "categoryId" });

// Relacionamento Like
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

// Relacionamento Comment
// Comment.belongsTo(User, { foreignKey: 'userId' });
// Comment.belongsTo(Post, { foreignKey: 'postId' });

// Realacionamento Bubble
Bubble.belongsToMany(User, { through: BubbleMember, as: 'members', foreignKey: 'bubbleId' })

// Relacionamento das bolhas com os posts
Bubble.hasMany(Post, { foreignKey: "bubbleId", as: "posts" });
Post.belongsTo(bubbleAside, { foreignKey: "bubbleId", as: "bubble" });

// Relacionamento Notification
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Notification.belongsTo(User, { foreignKey: 'actorId', as: 'actor' });
Notification.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
User.hasMany(Notification, { foreignKey: 'actorId', as: 'actionsNotifications' });

import Comment from '../models/commentModel.js';

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });
Comment.belongsTo(Post, { foreignKey: 'postId' });


// Hooks
Like.afterCreate(async (like) => {
    try {
        const post = await Post.findByPk(like.postId);
        if (post) {
            await post.increment('likesCount');
        }
    } catch (error) {
        console.error('Erro ao incrementar likesCount:', error);
    }
});

Like.afterDestroy(async (like) => {
    try {
        const post = await Post.findByPk(like.postId);
        if (post) {
            await post.decrement('likesCount');
        }
    } catch (error) {
        console.error('Erro ao decrementar likesCount:', error);
    }
});

Post.afterCreate(async (post, options) => {
    try {
        await post.increment('postCount');
    } catch (error) {
        console.error('Erro ao incrementar postCount:', error);
    }
});

Post.afterDestroy(async (post, options) => {
    try {
        await post.decrement('postCount');
    } catch (error) {
        console.error('Erro ao decrementar postCount:', error);
    }
});

Follow.afterCreate(async (follow, options) => {
    try {
        const user = await User.findByPk(follow.followingId);
        if (user) {
            await user.increment('followersCount');
        }
    } catch (error) {
        console.error('Erro ao incrementar followersCount:', error);
    }

    try {
        const user = await User.findByPk(follow.followerId);
        if (user) {
            await user.increment('followingCount');
        }
    } catch (error) {
        console.error('Erro ao incrementar followingCount:', error);
    }
});

Follow.afterDestroy(async (follow, options) => {
    try {
        const user = await User.findByPk(follow.followingId);
        if (user) {
            await user.decrement('followersCount');
        }
    } catch (error) {
        console.error('Erro ao decrementar followersCount:', error);
    }

    try {
        const user = await User.findByPk(follow.followerId);
        if (user) {
            await user.decrement('followingCount');
        }
    } catch (error) {
        console.error('Erro ao decrementar followingCount:', error);
    }
});

Comment.afterCreate(async (comment) => {
    try {
        const post = await Post.findByPk(comment.postId);
        if(post) await post.increment('commentsCount');
    } catch (error) {
        console.error('Erro ao incrementar commentsCount:', error);
    }
});


Comment.afterDestroy(async (comment) => {
    try {
        const post = await Post.findByPk(comment.postId);
        if(post) await post.decrement('commentsCount');
    } catch (error) {
        console.error('Erro ao decrementar commentsCount:', error);
    }
});


export { sequelize, User, Post, Like, Bubble, bubbleAside, Follow, BubbleMember, Category, Notification }