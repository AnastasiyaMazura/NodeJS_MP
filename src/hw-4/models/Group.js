import Sequelize from 'sequelize';
import db from '../data-access/db';

export default db.define('groups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
}, { timestamps: false });