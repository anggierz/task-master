require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sanitize = require('./middlewares/sanitize');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(sanitize);

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
