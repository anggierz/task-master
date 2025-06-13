const request = require('supertest');
const app = require('../app');
let jwtToken;

describe('User Endpoints', () => {
  let token = '';

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@test.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should login a user and receive token', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@test.com',
        password: '123456'
      });
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
});
