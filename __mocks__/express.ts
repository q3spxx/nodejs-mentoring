const express = jest.createMockFromModule('express');

class Router {
    route() {
        return this;
    }
    all() {
        return this;
    }
    put() {
        return this;
    }
    get() {
        return this;
    }
    post() {
        return this;
    }
    delete() {
        return this;
    }
}

// @ts-ignore
express.Router = () => new Router();

class Response {
    statusCode = 200;
    json = () => {
        return this;
    };
    status = (status: number) => {
        this.statusCode = status;
        return this;
    };
}
export const response = new Response();
export const request = { params: {}, body: {}, query: {} };
export default express;
