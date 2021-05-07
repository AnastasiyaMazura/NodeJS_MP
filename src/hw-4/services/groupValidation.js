import Joi from '@hapi/joi';

const permissions = ['READ', 'DELETE', 'SHARE', 'WRITE', 'UPLOAD_FILES'];

export const bodySchema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(...permissions)).required(),
});

export const paramsSchema = Joi.object({
    id: Joi.string().required()
});
  
export const querySchema = Joi.object({
    userId: Joi.required()
});