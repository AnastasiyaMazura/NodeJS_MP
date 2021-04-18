import express from 'express';
import sequelize from './data-access/db';
import userRouter from './routers/userControllers';

import User from './models/User';
import { predefinedUsers } from './predefinedUsers';
import { createUser, updateUser } from './services/usersService';

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
    })
    .catch(err => { console.error('Unable to connect to the database:', err); });


const app = express();
const PORT = process.execArgv.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));