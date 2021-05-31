import express from 'express';
import cors from 'cors';
import sequelize from './data-access/db';
import userRouter from './routers/userControllers';
import groupRouter from './routers/groupControllers';

import User from './models/User';
import Group from './models/Group';
import UserGroup from './models/UserGroup';
import { predefinedUsers, groupsInitialList } from './predefinedData';
import { createUser, updateUser } from './services/usersService';
import { createGroup, updateGroup } from './services/groupServices';
import { logServiceError, serviceLogger, logError } from './middlewares/logServiceMiddleware';

Group.belongsToMany(User, { through: UserGroup, foreignKey: 'group_id' });
User.belongsToMany(Group, { through: UserGroup, foreignKey: 'user_id' });

sequelize.authenticate()
    .then(() => { console.log('Connection has been established successfully.');
        predefinedUsers.forEach(user => {
            User.findOne({ where: { login: user.login }})
                .then((existedUser) => {
                    if (existedUser) {
                        updateUser(user, { login: user.login });
                    } else{
                        createUser(user);
                    }
                })
        });
        groupsInitialList.forEach(group => {
            Group.findOne({ where: { id: group.id }})
                .then((existedGroup) => {
                    if (existedGroup) {
                        updateGroup(group, { id: group.id });
                    } else{
                        createGroup(group);
                    }
                })
        });
    })
    .catch(err => { console.error('Unable to connect to the database:', err); });


const app = express();
const PORT = process.execArgv.PORT || 3000;

app.use(express.json());
app.use(serviceLogger);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use(logServiceError);

process.on('uncaughtException', (err, req, res) => {
    logError(err.stack);
    res.status(500).send({ error: 'Server error' });
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
    logError(err);
});

app.use(cors());

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));