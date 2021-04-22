import express from 'express';
import { createValidator } from 'express-joi-validation';
import { bodySchema, querySchema} from '../services/userValidation';
import { getAutoSuggestUsers, createUser, updateUser, findUser, deleteUser } from '../services/usersService';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get(validator.query(querySchema), (req, res) => {
        const { loginSubstr, limit } = req.query;
        getAutoSuggestUsers(loginSubstr, limit)
            .then(users => res.send(users))
            .catch(err => console.error(err))
    })
    .post(validator.body(bodySchema), (req, res) => {
        createUser(req.body)
            .then((us) => res.send(us))
            .catch(err => console.error(err));
    });

router.route('/:id')
    .get((req, res) => {
        findUser({ id: Number(req.params.id) })
            .then((user) => res.send(user))
            .catch(() => res.send(`User with ID = ${req.params.id} was not found!`))
    })
    .put(validator.body(bodySchema), (req, res) => {
        const { params, body } = req;
        updateUser(body, { id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${params.id} was updated.`))
            .catch(() => res.send('User was not updated!'))     
    })
    .delete((req, res) => {
        deleteUser({ id: Number(req.params.id) })
            .then(() => res.send(`User with ID = ${req.params.id} was deleted.`))
            .catch(() => res.send('User was not deleted!'))
    });

export default router;