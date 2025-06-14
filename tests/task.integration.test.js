const request = require('supertest');
const app = require('../app');
const sequelize = require('../models');
const { User, Task } = require('../models');
let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app)
    .post('/api/users/register')
    .send({ email: 'task@test.com', password: '123456' });

  const res = await request(app)
    .post('/api/users/login')
    .send({ email: 'task@test.com', password: '123456' });

  token = res.body.token;
});

describe('Task Integration Tests', () => {
  let taskId;

  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Integration Task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Integration Task');
    taskId = res.body.id;
  });

  it('should get tasks for user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Task');
  });

  it('should delete task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully.');
  });
});
