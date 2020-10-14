jest.mock('@services');
jest.mock('express');
jest.mock('./users.validators');
jest.mock('@helpers/errors');

import { usersService } from '@services';
import { request, response } from 'express';
import {
    getUsersMiddleware,
    getUserByIdMiddleware,
    createUserMiddleware,
    updateUserMiddleware,
    deleteUserMiddleware,
    addUserGroupMiddleware,
    getUserByLoginSubstringMiddleware
} from './users.controller';
import { ValidatedRequest } from 'express-joi-validation';
import {
    UserByIdSchema,
    UserDeleteByIdSchema,
    UserPostByIdSchema,
    UserPutByIdSchema,
    UsersGetSchema
} from './users.types';

const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 5));
const nextFunction = jest.fn;

describe('GET users', () => {
    afterAll(() => {
        response.statusCode = 200;
    });

    test('it should run getAllUsers', () => {
        const spy = jest.spyOn(usersService, 'getAllUsers');
        getUsersMiddleware(request, response, nextFunction);
        expect(spy).toBeCalled();
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        getUsersMiddleware(request, response, nextFunction);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.getAllUsers = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        getUsersMiddleware(request, response, nextFunction);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('GET user by id', () => {
    beforeAll(() => {
        request.params = { id: '1' };
    });

    afterAll(() => {
        request.params = {};
        response.statusCode = 200;
    });

    test('it should run getUser', () => {
        const spy = jest.spyOn(usersService, 'getUser');
        getUserByIdMiddleware(request as ValidatedRequest<UserByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual('1');
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        getUserByIdMiddleware(request as ValidatedRequest<UserByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.getUser = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        getUserByIdMiddleware(request as ValidatedRequest<UserByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('POST create user', () => {
    beforeAll(() => {
        request.body = { name: 'test' };
    });

    afterAll(() => {
        response.statusCode = 200;
        request.body = {};
    });

    test('it should run createUser', () => {
        const spy = jest.spyOn(usersService, 'createUser');
        createUserMiddleware(request as ValidatedRequest<UserPostByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ name: 'test' });
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        createUserMiddleware(request as ValidatedRequest<UserPostByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.createUser = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        createUserMiddleware(request as ValidatedRequest<UserPostByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('PUT update user by id', () => {
    beforeAll(() => {
        request.params = { id: '1' };
        request.body = { name: 'test' };
    });

    afterAll(() => {
        response.statusCode = 200;
        request.body = {};
        request.params = {};
    });

    test('it should run updateUser', () => {
        const spy = jest.spyOn(usersService, 'updateUser');
        updateUserMiddleware(request as ValidatedRequest<UserPutByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ id: '1', name: 'test' });
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        updateUserMiddleware(request as ValidatedRequest<UserPutByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.updateUser = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        updateUserMiddleware(request as ValidatedRequest<UserPutByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('DELETE delete user by id', () => {
    beforeAll(() => {
        request.params = { id: '1' };
        request.query = {};
    });

    afterAll(() => {
        response.statusCode = 200;
        request.params = {};
        request.query = {};
    });

    test('it should run soft deleteUser', () => {
        const spy = jest.spyOn(usersService, 'deleteUser');
        deleteUserMiddleware(request as ValidatedRequest<UserDeleteByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ id: '1' });
    });

    test('it should run hard deleteUser', () => {
        request.query.force = 'true';
        const spy = jest.spyOn(usersService, 'deleteUser');
        deleteUserMiddleware(request as ValidatedRequest<UserDeleteByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[1].value).resolves.toEqual({ id: '1', force: 'true' });
        request.query = {};
    });

    test('it should run hard removeGroupFromUser', () => {
        request.query.groupName = 'test';
        const spy = jest.spyOn(usersService, 'removeGroupFromUser');
        deleteUserMiddleware(request as ValidatedRequest<UserDeleteByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ id: '1', groupName: 'test' });
        request.query = {};
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        deleteUserMiddleware(request as ValidatedRequest<UserDeleteByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.deleteUser = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        deleteUserMiddleware(request as ValidatedRequest<UserDeleteByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('POST add user group by id', () => {
    beforeAll(() => {
        request.params = { id: '1' };
        request.query = { groupName: 'test' };
    });

    afterAll(() => {
        response.statusCode = 200;
        request.params = {};
        request.query = {};
    });

    test('it should run addGroupToUser', () => {
        const spy = jest.spyOn(usersService, 'addGroupToUser');
        addUserGroupMiddleware(request as ValidatedRequest<UserPostByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ id: '1', groupName: 'test' });
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        addUserGroupMiddleware(request as ValidatedRequest<UserPostByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.addGroupToUser = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        addUserGroupMiddleware(request as ValidatedRequest<UserPostByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('GET get user by login substring', () => {
    beforeAll(() => {
        request.query = { loginSubstring: 'test', limit: '5' };
    });

    afterAll(() => {
        response.statusCode = 200;
        request.query = {};
    });

    test('it should run getAutoSuggestUsers', () => {
        const spy = jest.spyOn(usersService, 'getAutoSuggestUsers');
        getUserByLoginSubstringMiddleware(request as ValidatedRequest<UsersGetSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ loginSubstring: 'test', limit: 5 });
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        getUserByLoginSubstringMiddleware(request as ValidatedRequest<UsersGetSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        usersService.getAutoSuggestUsers = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        getUserByLoginSubstringMiddleware(request as ValidatedRequest<UsersGetSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});
