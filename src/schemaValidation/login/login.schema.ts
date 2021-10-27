import * as Joi from 'joi';
import {
  requiredString,
} from 'src/common/utils/validations/validationTypes';

export const schemaLogin = Joi.object({
  username: requiredString,
  password: requiredString,
});

