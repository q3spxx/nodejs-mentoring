jest.mock('@services');
jest.mock('express');
jest.mock('./auth.validators');
jest.mock('@helpers/errors');

import { usersService } from '@services';
import { request, response } from 'express';
import { loginMiddleware } from './auth.controller';

const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 5));

describe('POST login', () => {
    afterAll(() => {
        response.statusCode = 200;
        request.body = {};
    });

    test('it should run getUserByLoginAndPassword', () => {
        request.body = { username: 'test', password: 'test' };
        const spy = jest.spyOn(usersService, 'getUserByLoginAndPassword');
        loginMiddleware(request, response);
        expect(spy).toBeCalled();
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        loginMiddleware(request, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.getUserByLoginAndPassword = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        loginMiddleware(request, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});
