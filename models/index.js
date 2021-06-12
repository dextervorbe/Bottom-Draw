const User = require('./User');
const Item = require('./Item');

User.hasMany(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Item.belongsTo(User, {
  foreignKey: 'user_id'
});

// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// Comment.belongsTo(Item, {
//   foreignKey: 'item_id'
// });

module.exports = { User, Item };
