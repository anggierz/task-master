const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const TaskModel = require('./Task');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const User = UserModel(sequelize);
const Task = TaskModel(sequelize);

User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Task
};
