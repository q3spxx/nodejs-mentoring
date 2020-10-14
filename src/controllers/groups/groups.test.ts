jest.mock('@services');
jest.mock('express');
jest.mock('./groups.validators');
jest.mock('@helpers/errors');

import { groupsService } from '@services';
import { request, response } from 'express';
import {
    getGroupsMiddleware,
    getGroupByIdMiddleware,
    createGroupMiddleware,
    updateGroupMiddleware,
    deleteGroupMiddleware
} from './groups.controller';
import { ValidatedRequest } from 'express-joi-validation';
import { GroupByIdSchema, GroupPostSchema, GroupPutByIdSchema } from './groups.types';

const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 5));

describe('GET groups', () => {
    afterAll(() => {
        response.statusCode = 200;
    });

    test('it should run getAllGroups', () => {
        const spy = jest.spyOn(groupsService, 'getAllGroups');
        getGroupsMiddleware(request, response);
        expect(spy).toBeCalled();
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        getGroupsMiddleware(request, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        groupsService.getAllGroups = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        getGroupsMiddleware(request, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('GET group by id', () => {
    beforeAll(() => {
        request.params = { id: '1' };
    });

    afterAll(() => {
        request.params = {};
        response.statusCode = 200;
    });

    test('it should run getGroup', () => {
        const spy = jest.spyOn(groupsService, 'getGroup');
        getGroupByIdMiddleware(request as ValidatedRequest<GroupByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual('1');
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        getGroupByIdMiddleware(request as ValidatedRequest<GroupByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        groupsService.getGroup = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        getGroupByIdMiddleware(request as ValidatedRequest<GroupByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('POST create group', () => {
    beforeAll(() => {
        request.body = { name: 'test' };
    });

    afterAll(() => {
        response.statusCode = 200;
        request.body = {};
    });

    test('it should run createGroup', () => {
        const spy = jest.spyOn(groupsService, 'createGroup');
        createGroupMiddleware(request as ValidatedRequest<GroupPostSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ name: 'test' });
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        createGroupMiddleware(request as ValidatedRequest<GroupPostSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        groupsService.createGroup = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        createGroupMiddleware(request as ValidatedRequest<GroupPostSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('PUT update group by id', () => {
    beforeAll(() => {
        request.params = { id: '1' };
        request.body = { name: 'test' };
    });

    afterAll(() => {
        response.statusCode = 200;
        request.body = {};
        request.params = {};
    });

    test('it should run updateGroup', () => {
        const spy = jest.spyOn(groupsService, 'updateGroup');
        updateGroupMiddleware(request as ValidatedRequest<GroupPutByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual({ id: '1', name: 'test' });
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        updateGroupMiddleware(request as ValidatedRequest<GroupPutByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        groupsService.updateGroup = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        updateGroupMiddleware(request as ValidatedRequest<GroupPutByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});

describe('DELETE delete group by id', () => {
    beforeAll(() => {
        request.params = { id: '1' };
    });

    afterAll(() => {
        response.statusCode = 200;
        request.params = {};
    });

    test('it should run deleteGroup', () => {
        const spy = jest.spyOn(groupsService, 'deleteGroup');
        deleteGroupMiddleware(request as ValidatedRequest<GroupByIdSchema>, response);
        expect(spy).toBeCalled();
        expect(spy.mock.results[0].value).resolves.toEqual('1');
    });

    test('it should run res.json on promise resolve and statusCode 200', async () => {
        const spy = jest.spyOn(response, 'json');
        deleteGroupMiddleware(request as ValidatedRequest<GroupByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(200);
    });

    test('it should run res.json on promise reject and statusCode 500', async () => {
        groupsService.deleteGroup = () => Promise.reject();
        const spy = jest.spyOn(response, 'json');
        deleteGroupMiddleware(request as ValidatedRequest<GroupByIdSchema>, response);
        await delay();
        expect(spy).toBeCalled();
        expect(response.statusCode).toBe(500);
    });
});
