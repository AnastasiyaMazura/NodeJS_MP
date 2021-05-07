import express from 'express';
import db from '../data-access/db';
import { createValidator } from 'express-joi-validation';
import { createGroup, updateGroup, findAllGroups, deleteGroup, addUsersToGroup } from '../services/groupServices';
import { bodySchema, querySchema, paramsSchema } from '../services/groupValidation';

const router = express.Router();
const validator = createValidator();

router.route('/')
    .get((req, res) => findAllGroups()
        .then(groups => res.send(groups))
        .catch(err => console.error(err))
    )

    .post(validator.body(bodySchema), (req, res) => {
        createGroup(req.body)
            .then((gr) => res.send(gr))
            .catch(err => console.error(err));
    });

router.route('/:id')
    .get((req, res) => {
        findAllGroups({ id: req.params.id })
            .then((group) => res.send(group))
            .catch(() => res.send('Group was not found!'))
    })
    .put(validator.body(bodySchema), (req, res) => {
        const { params, body } = req;
        updateGroup(body, { id: params.id })
            .then(() => res.send(`Group with ID = ${req.params.id} was updated.`))
            .catch(() => res.send('Group was not updated!'))
    })
    .delete((req, res) => {
        deleteGroup({ id: req.params.id })
            .then(() => res.send(`Group with ID = ${req.params.id} was deleted.`))
            .catch(() => res.send('Group was not deleted!'))
    })
    .post(validator.query(querySchema), validator.params(paramsSchema), (req, res) => {
        const userIds = req.query.userId;
        const groupId = req.params.id;

        db.transaction().then((t) => {
            addUsersToGroup(groupId, userIds, { transaction: t })
                .then(group => res.status(201).json({
                    message: `The new users has been added to group #${groupId}`,
                    content: group
                }))
                .then(() => t.commit())
                .catch((err) => {
                    res.status(500).json({ message: err.message });
                    return t.rollback();
                });
        });
    });

export default router;