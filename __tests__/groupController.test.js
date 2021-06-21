import 'babel-polyfill';
import { createGroup, updateGroup, findAllGroups, deleteGroup } from '../src/hw-4/services/groupServices';
import Group from '../src/hw-4/models/Group';

jest.mock('../src/hw-4/models/Group');

describe('Group controller', () => {
    beforeEach(() => {
        Group.create = jest.fn().mockResolvedValueOnce({});
        Group.update = jest.fn().mockResolvedValueOnce({});
        Group.findAll = jest.fn().mockResolvedValueOnce({});
        Group.destroy = jest.fn().mockResolvedValueOnce({});
    });

    test('Should create Group record in DB', (done) => {
        createGroup({ name: 'test Group', permission: ['READ', 'WRIRE'] })
            .then(() => {
                expect(Group.create).toBeCalledTimes(1);
                done();
            })
    });

    test('Should update Group record in DB', (done) => {
        updateGroup({ name: 'test Group', permission: ['READ', 'WRIRE'] })
            .then(() => {
                expect(Group.update).toBeCalledTimes(1);
                done();
            })
    });

    test('Should find all Groups records in DB if parameters were not passed', (done) => {
        findAllGroups()
            .then(() => {
                expect(Group.findAll).toBeCalledTimes(1);
                done();
            })
    });

    test('Should find all Groups records in DB which match the search parameters', (done) => {
        findAllGroups({ name: 'test Group' })
            .then(() => {
                expect(Group.findAll).toBeCalledWith({
                    "where": {
                        name: 'test Group',
                    }
                });
                done();
            })
    });

    test('Should delete Group record from DB which match the search parameters', (done) => {
        deleteGroup({ name: 'test Group' })
            .then(() => {
                expect(Group.destroy).toBeCalledWith({
                    "where": {
                        name: 'test Group'
                    }
                });
                done();
            })
    });
});