const app = require('../../app');
const request = require('supertest');
let user = {};

describe('test POST /api/v1/users endpoint', () => {
    test('test email belum terdaftar -> sukses', async () => {
        try {
            let name = 'usertest2';
            let email = 'usertest2@mail.com';
            let password = 'pasword123';

            let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password });
            user = body.data;

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('test email sudah terdaftar -> error', async () => {
        try {
            let name = 'usertest2';
            let email = 'usertest2@mail.com';
            let password = 'pasword123';

            let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password });

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('email sudah dipakai');
        }
    });
});


describe('test GET /api/v1/users/:id endpoint', () => {
    test('test cari user dengan id yang terdaftar -> sukses', async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.id).toBe(user.id);
            expect(body.data.name).toBe(user.name);
            expect(body.data.email).toBe(user.email);
            expect(body.data.password).toBe(user.password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('test cari user dengan id yang tidak terdaftar -> error', async () => {
        try {
            try {
                let { statusCode, body } = await request(app).get(`/api/v1/users/${user.id + 1000}`);

                expect(statusCode).toBe(400);
                expect(body).toHaveProperty('status');
                expect(body).toHaveProperty('message');
                expect(body).toHaveProperty('data');
                // expect(body.data.id).toBe(user.id);
            } catch (err) {
                expect(err).toBe('error');
            }
        } catch (err) {
            expect(err).toBe('user tidak ditemukan');
        }
    });
});