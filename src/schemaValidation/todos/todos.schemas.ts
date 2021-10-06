import * as Joi from 'joi';
import {
  joiString,
  requiredString,
} from 'src/common/utils/validations/validationTypes';



export const SchemaCreateUpdateTODO = Joi.object({
  status: joiString,
  description: joiString,
  title: joiString,
});
