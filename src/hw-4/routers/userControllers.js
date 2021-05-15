import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema, querySchema } from '../services/userValidation';
import { getAutoSuggestUsers, createUser, updateUser, findUser, deleteUser } from '../services/usersService';
import { logServiceError } from '../services/logServiceMiddleware';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get(validator.query(querySchema), (req, res, next) => {
        const { loginSubstr, limit } = req.query;
        getAutoSuggestUsers(loginSubstr, limit)
            .then(users => res.send(users))
            .catch(() => {
                logServiceError({ message: 'Suggested users were not found' }, req, res, next);
            });
    })
    .post(validator.body(bodySchema), (req, res, next) => {
        createUser(req.body)
            .then((us) => res.send(us))
            .catch(() => {
                logServiceError({ message: 'User was not created' }, req, res, next);
            });
    });

router.route('/:id')
    .get((req, res, next) => {
        findUser({ id: Number(req.params.id) })
            .then((user) => res.send(user))
            .catch(() => {
                logServiceError({ message: 'User does not exist!' }, req, res, next);
            })
    })
    .put(validator.body(bodySchema), (req, res, next) => {
        const { params, body } = req;
        updateUser(body, { id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${params.id} was updated.`))
            .catch(() => {
                logServiceError({ message: 'User was not updated!' }, req, res, next);
            })
    })
    .delete((req, res, next) => {
        deleteUser({ id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
            .catch(() => {
                logServiceError({ message: 'User was not deleted' }, req, res, next);
            })
    });

export default router;