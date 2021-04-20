import Joi from '@hapi/joi';

const pattern = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;

export default Joi.object().keys({
    login: Joi.string().regex(pattern).required(),
    password: Joi.string().alphanum().regex(pattern).required(),
    age: Joi.number().min(4).max(120).required()
});