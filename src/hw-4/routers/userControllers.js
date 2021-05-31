import express from 'express';
import jwt from 'jsonwebtoken';
import { createValidator } from 'express-joi-validation';
import { bodySchema, querySchema } from '../services/userValidation';
import { getAutoSuggestUsers, createUser, updateUser, findUser, deleteUser, getUserByLogin } from '../services/usersService';
import { checkToken } from '../helpers/authorizationHelper';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get(validator.query(querySchema), checkToken, (req, res, next) => {
        const { loginSubstr, limit } = req.query;
        getAutoSuggestUsers(loginSubstr, limit)
            .then(users => res.send(users))
            .catch((err) => {
                next(err);
            });
    })
    .post(validator.body(bodySchema), checkToken, (req, res, next) => {
        getUserByLogin(req.body.login)
            .then(user => {
                if (user) {
                    res.status(409).json({
                        message: `The user with login ${user.login} was already created`
                    });
                }
                createUser(req.body)
                    .then((us) => res.send(us))
                    .catch((err) => {
                        next(err);
                    });
            });
    });

router.route('/:id')
    .get(checkToken, (req, res, next) => {
        findUser({ id: Number(req.params.id) })
            .then((user) => res.send(user))
            .catch((err) => {
                next(err);
            })
    })
    .put(validator.body(bodySchema), checkToken, (req, res, next) => {
        const { params, body } = req;
        updateUser(body, { id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${params.id} was updated.`))
            .catch((err) => {
                next(err);
            })
    })
    .delete(checkToken, (req, res, next) => {
        deleteUser({ id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
            .catch((err) => {
                next(err);
            })
    });

router.route('/login')
    .post((req, res, next) => {
        const userLogin = req.body.login;
        const userPassword = req.body.password;

        getUserByLogin(userLogin)
            .then(user => {
                if (user && user.password === userPassword) {
                    const payload = { 'sub': user.id, 'login': user.login };
                    const token = jwt.sign(payload, '34scrtstrng12', { expiresIn: 3000 });

                    res.send(token);
                } else {
                    res.status(403).json({
                        message: 'Bad login/password combination'
                    });
                }
            })
            .catch(err => {
                next(err);
            });
    })

export default router;