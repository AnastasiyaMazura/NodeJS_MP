import Sequelize from 'sequelize';
import db from '../data-access/db';

export default db.define('usergroups', {
    group_id: {
        type: Sequelize.UUID,
        references: {
          model: 'groups',
          key: 'id'
        }
    },
    user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
    }
}, { timestamps: false });