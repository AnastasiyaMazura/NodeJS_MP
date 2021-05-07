import Sequelize from 'sequelize';
import User from '../models/User';

export const getAutoSuggestUsers = (loginSubstr, limit) => {
    const usersLimit = Number(limit);

    return new Promise((resolve, reject) => {
        User.findAll({ 
            where: { login: { [Sequelize.Op.substring]: loginSubstr } },
            order: [['login', 'ASC']],
            limit: usersLimit 
        })
        .then((us) => resolve(us))
        .catch(() => reject())
    })
}

export const createUser = (data) => {
    const { id, age, login, password } = data;
    const userData = {
        id,
        age,
        login,
        password
    };

    return new Promise((resolve, reject) => {
        User.findOne({ where: { login: login }})
        .then((existedUser) => {
            if (existedUser) {
                User.update(userData, { where: { login: login }})
                    .then((us) => resolve(us))
                    .catch(() => reject())
            } else {
                User.create(userData)
                    .then((us) => resolve(us))
                    .catch(() => reject())
            }
        })
    })   
}

export const updateUser = (data, params) => {
    const { id, age, login, password } = data;
    const userData = {
        id,
        age,
        login,
        password
    };

    return new Promise((resolve, reject) => { 
        User.update(userData, { where: params })
            .then((us) => resolve(us))
            .catch(() => reject())         
    })   
}

export const findUser = (params) => {
    return new Promise((resolve, reject) => { 
        User.findAll({ where: params })
            .then((us) => resolve(us))
            .catch(() => reject())      
    }) 
}

export const deleteUser = (params) => {
    return new Promise((resolve, reject) => { 
        User.destroy({ where: params })
            .then((us) => resolve(us))
            .catch(() => reject())     
    })   
}