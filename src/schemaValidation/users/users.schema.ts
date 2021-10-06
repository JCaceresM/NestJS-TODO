import * as Joi from 'joi';
import { requiredString } from 'src/common/utils/validations/validationTypes';


export const schemaNewUser = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  repeat_password: Joi.ref('password'),
});
export const schemaUpdateUser = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: true } }),
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
