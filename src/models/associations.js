import sequelize from "../config/database.js";
import User from './userModel.js'
import Post from './postModel.js'
import Like from './likeModel.js'
import Follow from "./followModel.js";
import Bubble from "./BubbleModel.js";
import BubbleMember from "./BubbleMemberModel.js";

// Relacionamento Usuário
User.hasMany(Post, { foreignKey: 'userId', as:'posts' })
User.belongsToMany(Post, { through: Like, foreignKey:"userId", otherKey:'postId', as: 'likers' });
User.belongsToMany(User, { through:Follow, foreignKey: 'followerId', otherKey: 'followingId', as: 'following' }); // Quem o usuário segue
User.belongsToMany(User, { through:Follow, foreignKey: 'followingId', otherKey: 'followerId', as: 'followers' }); // Quem segue o usuário
User.belongsToMany(Bubble, { through: BubbleMember, as: 'bubbles', foreignKey: 'userId' })

// Relacionamento Post
Post.belongsTo(User, { through: User, foreignKey: 'userId' , as: 'author' });
Post.belongsToMany(User, { through: Like, foreignKey:"postId", otherKey: 'userId', as: 'likers' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

// Relacionamento Like
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

// Realacionamento Bubble
Bubble.belongsToMany(User, { through: BubbleMember, as: 'members', foreignKey: 'bubbleId' })

export { sequelize, User, Post, Like }