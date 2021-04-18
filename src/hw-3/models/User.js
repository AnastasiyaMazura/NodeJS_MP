import Sequelize from 'sequelize';
import db from '../data-access/db';

export default db.define('users', {
    age: { type: Sequelize.STRING },
    login: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
}, { timestamps: false });