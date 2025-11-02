import sequelize from "../config/database";
import User from './userModel.js'
import Post from './postModel.js'
import Like from './likeModel.js'

// Relacionamento Usuário
User.hasMany(Post, { foreignKey: 'userId', as:'posts' })
User.belongsToMany(Post, { through: Like, foreignKey:"userId", otherKey:'postId', as: 'likers' });
User.belongsToMany(Post, { through:Follow, foreignKey: 'followerId', otherKey: 'followingId', as: 'following' }); // Ja para o futuro

// Relacionamento Post
Post.belongsTo(User, { through: User, foreignKey: 'userId' , as: 'author' });
Post.belongsToMany(User, { through: Like, foreignKey:"postId", otherKey: 'userId', as: 'likers' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

// Relacionamento Like
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

export { sequelize, User, Post, Like }