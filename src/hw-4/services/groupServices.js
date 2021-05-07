import Group from '../models/Group';
import User from '../models/User';

export const createGroup = (data) => {
    const { id, name, permissions } = data;
    const groupData = {
        id,
        name,
        permissions
    };

    return new Promise((resolve, reject) => {
        Group.create(groupData)
            .then((gr) => resolve(gr))
            .catch(() => reject())
    });
};

export const updateGroup = (data, params) => {
    const { id, name, permissions } = data;
    const groupData = {
        id,
        name,
        permissions
    };

    return new Promise((resolve, reject) => {
        Group.update(groupData, { where: params })
            .then((gr) => resolve(gr))
            .catch(() => reject())

    });
};

export const findAllGroups = (params) => {
    if (!params) {
        return new Promise((resolve, reject) => {
            Group.findAll()
                .then((us) => resolve(us))
                .catch(() => reject())

        });
    } else {
        return new Promise((resolve, reject) => {
            Group.findAll({ where: params })
                .then((gr) => resolve(gr))
                .catch(() => reject())

        });
    }
};

export const deleteGroup = (params) => {
    return new Promise((resolve, reject) => {
        Group.destroy({ where: params })
            .then((gr) => resolve(gr))
            .catch(() => reject())
    });
};

export const addUsersToGroup = (groupId, userIds, transaction) => {
    return User.findAll({ where: { id: userIds } }, transaction)
        .then((users) => 
            Group.findOne({ where: { id: groupId } }, transaction)
                .then((group) => group.addUsers(users, transaction)
                    .then((affectedRows) => affectedRows)
                    .catch(error => { throw error; })
                )
        )
        .catch(error => { throw error; });
}