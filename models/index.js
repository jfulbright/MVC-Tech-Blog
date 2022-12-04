const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users to Posts Relationships
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Posts to Comments Relationships
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// User to Comments Relationships
User.hasMany(Comment, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'post_id',
});



module.exports = {
  User,
  Post,
  Comment,
};
