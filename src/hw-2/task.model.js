import { v4 as uuidv4 } from 'uuid';
import { getUsers, setUsers } from './userStorage.js';

function mustBeInArray(id) {
    return new Promise((resolve, reject) => {
        const user = getUsers().find(u => u.id === id);

        if (!user) {
            reject({
                message: 'User is not found',
                status: 404
            });
        }
        resolve(user);
    });
}

function getNewId() {
    return uuidv4();
}

export function getAutoSuggestUsers(loginSubstring, limit) {
    const usersNumber = getUsers().length;
    const usersLimit = usersNumber > limit ? Number(limit) : usersNumber;

    return new Promise((resolve) => {
        const suggestedUsers = getUsers()
            .filter(user => user.login.includes(loginSubstring))
            .sort((a, b) => {
                if (a.login > b.login) return 1;
                return a.login < b.login ? -1 : 0;
            })
            .slice(0, usersLimit);

        resolve(suggestedUsers);
    });
}

export function createUser(newUserData) {
    return new Promise((resolve) => {
        const id = { id: getNewId() };
        const newUser = { ...id, ...newUserData, isDeleted: false };

        getUsers().push(newUser);
        resolve(newUser);
    });
}

export function updateUser(id, newUser) {
    return new Promise((resolve, reject) => {
        mustBeInArray(id)
            .then(user => {
                const users = getUsers();
                const index = users.findIndex(u => u.id === user.id);

                users[index] = { ...user, ...newUser };
                resolve(users[index]);
            })
            .catch(err => reject(err));
    });
}

export function deleteUser(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(id)
            .then(() => {
                const newUsers = getUsers().reduce(
                    (acc, u) => u.id === id ? acc.concat({ ...u, isDeleted: true }) : acc.concat(u),
                    []);
                setUsers(newUsers);
                resolve();
            })
            .catch(err => reject(err));
    });
}

export function getUser(id) {
    return new Promise((resolve, reject) => {
        mustBeInArray(id)
            .then(user => resolve(user))
            .catch(err => reject(err));
    });
}
