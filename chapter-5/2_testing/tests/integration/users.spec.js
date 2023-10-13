const app = require('../../app');
const request = require('supertest');

describe('test POST /api/v1/users endpoint', () => {
    test('test email belum terdaftar -> sukses', async () => {
        try {
            let email = 'usertest2@mail.com';
            let password = 'pasword123';

            let { statusCode, body } = await request(app).post('/api/v1/users').send({ email, password });

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    // test('test email sudah terdaftar -> error', async () => {
    //     try {

    //     } catch (err) {
    //         expect(err).toBe('email sudah dipakai');
    //     }
    // });
});


// describe('test GET /api/v1/users/:id endpoint', () => {
//     test('test cari user dengan id yang terdaftar -> sukses', async () => {
//         try {

//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test('test cari user dengan id yang tidak terdaftar -> error', async () => {
//         try {

//         } catch (err) {
//             expect(err).toBe('user tidak ditemukan');
//         }
//     });
// });