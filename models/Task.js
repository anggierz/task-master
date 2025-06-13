const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;
