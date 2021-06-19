import 'babel-polyfill';
import { createUser, updateUser, findUser, deleteUser } from '../src/hw-4/services/usersService';
import User from '../src/hw-4/models/User';

jest.mock('../src/hw-4/models/User');

describe('User controller', () => {
    beforeEach(() => {
        User.findOne = jest.fn().mockResolvedValueOnce({});
        User.update = jest.fn().mockResolvedValueOnce({});
        User.findAll = jest.fn().mockResolvedValueOnce({});
        User.destroy = jest.fn().mockResolvedValueOnce({});
    });

    test('Should create user record in DB', (done) => {
        createUser({ age: 56, login: 'testLogin2', password: 'dtr46' })
            .then(() => {
                expect(User.findOne).toBeCalledTimes(1);
                done();
            })
    });

    test('Should update user record in DB', (done) => {
        updateUser({ age: 56, login: 'testLogin2', password: 'dtr46' })
            .then(() => {
                expect(User.update).toBeCalledTimes(1);
                done();
            })
    });

    test('Should find all users records in DB if parameters were not passed', (done) => {
        findUser()
            .then(() => {
                expect(User.findAll).toBeCalledTimes(1);
                done();
            })
    });

    test('Should find all users records in DB which match the search parameters', (done) => {
        findUser({ age: 56 })
            .then(() => {
                expect(User.findAll).toBeCalledWith({
                    "where": {
                        "age": 56,
                    }
                });
                done();
            })
    });

    test('Should delete user record from DB which match the search parameters', (done) => {
        deleteUser({ age: 56 })
            .then(() => {
                expect(User.destroy).toBeCalledWith({
                    "where": {
                        "age": 56,
                    }
                });
                done();
            })
    });

});