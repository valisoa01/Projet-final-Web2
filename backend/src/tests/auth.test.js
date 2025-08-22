const request = require('supertest');
const app = require('../server');
const { sequelize, User, RevokedToken } = require('../models');


beforeAll(async () => {
await sequelize.sync({ force: true });
});


afterAll(async () => {
await sequelize.close();
});


describe('Auth flow', () => {
test('Register -> Login -> Get profile', async () => {
const registerRes = await request(app)
.post('/auth/register')
.field('username', 'toto')
.field('email', 'toto@example.com')
.field('password', 'secret123')
.field('confirmPassword', 'secret123');


expect(registerRes.statusCode).toBe(201);


const loginRes = await request(app).post('/auth/login').send({ email: 'toto@example.com', password: 'secret123' });
expect(loginRes.statusCode).toBe(200);
expect(loginRes.body).toHaveProperty('token');


const token = loginRes.body.token;


const meRes = await request(app).get('/users/me').set('Authorization', `Bearer ${token}`);
expect(meRes.statusCode).toBe(200);
expect(meRes.body.email).toBe('toto@example.com');
});
});