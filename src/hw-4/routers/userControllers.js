import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema, querySchema } from '../services/userValidation';
import { getAutoSuggestUsers, createUser, updateUser, findUser, deleteUser } from '../services/usersService';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get(validator.query(querySchema), (req, res, next) => {
        const { loginSubstr, limit } = req.query;
        getAutoSuggestUsers(loginSubstr, limit)
            .then(users => res.send(users))
            .catch((err) => {
                next(err);
            });
    })
    .post(validator.body(bodySchema), (req, res, next) => {
        createUser(req.body)
            .then((us) => res.send(us))
            .catch((err) => {
                next(err);
            });
    });

router.route('/:id')
    .get((req, res, next) => {
        findUser({ id: Number(req.params.id) })
            .then((user) => res.send(user))
            .catch((err) => {
                next(err);
            })
    })
    .put(validator.body(bodySchema), (req, res, next) => {
        const { params, body } = req;
        updateUser(body, { id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${params.id} was updated.`))
            .catch((err) => {
                next(err);
            })
    })
    .delete((req, res, next) => {
        deleteUser({ id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
            .catch((err) => {
                next(err);
            })
    });

export default router;