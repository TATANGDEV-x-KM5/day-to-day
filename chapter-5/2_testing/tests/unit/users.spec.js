const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createUser, getUserById } = require('../../libs/users.libs');
let user = {};

describe('test createUser()', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany();
    });

    test('test email belum terdaftar -> sukses', async () => {
        try {
            let email = 'usertest@mail.com';
            let password = 'pasword123';

            let result = await createUser(email, password);
            user = result;

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('password');
            expect(result.email).toBe(email);
            expect(result.password).toBe(password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('test email sudah terdaftar -> error', async () => {
        try {
            let email = 'usertest@mail.com';
            let password = 'pasword123';

            let result = await createUser(email, password);

            expect(result).toBe('error');  // false error
        } catch (err) {
            expect(err).toBe('email sudah dipakai');
        }
    });
});


describe('test getUserById()', () => {
    test('test cari user dengan id yang terdaftar -> sukses', async () => {
        try {
            let result = await getUserById(user.id);

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('password');
            expect(result.email).toBe(user.email);
            expect(result.password).toBe(user.password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('test cari user dengan id yang tidak terdaftar -> error', async () => {
        try {
            let result = await getUserById(user.id + 1000);

            expect(result).toBe('error');  // false error
        } catch (err) {
            expect(err).toBe('user tidak ditemukan');
        }
    });
});