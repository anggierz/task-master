const request = require('supertest');
const app = require('../app');
const sequelize = require('../models');
const { User } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('User Integration Tests', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'int@test.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toBe("User registered successfully");
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'int@test.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
