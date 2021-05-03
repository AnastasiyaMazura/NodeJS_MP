import Sequelize from 'sequelize';
import db from '../data-access/db';

export default db.define('users', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    age: { type: Sequelize.NUMBER },
    login: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
}, { timestamps: false });