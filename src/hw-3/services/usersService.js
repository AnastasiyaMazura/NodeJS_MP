import User from '../models/User';

export const createUser = (data) => {
    const { age, login, password } = data;
    const userData = {
        age: age,
        login: login,
        password: password
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
    const { age, login, password } = data;
    const userData = {
        age: age,
        login: login,
        password: password
    };

    return new Promise((resolve, reject) => { 
        User.update(userData, { where: params })
            .then((us) => resolve(us))
            .catch(() => reject())         
    })   
}

export const findAllUsers = (params) => {
    if (!params) {
        return new Promise((resolve, reject) => { 
            User.findAll()
                .then((us) => resolve(us))
                .catch(() => reject())        
        }) 
    } else {
        return new Promise((resolve, reject) => { 
            User.findAll({ where: params })
                .then((us) => resolve(us))
                .catch(() => reject())      
        }) 
    }
}

export const deleteUser = (params) => {
    return new Promise((resolve, reject) => { 
        User.destroy({ where: params })
            .then((us) => resolve(us))
            .catch(() => reject())     
    })   
}