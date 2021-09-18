import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { ObjectSchema } from 'joi';
import { BadRequest } from '../responses/error.helper';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadta: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    const message = error?.message;

    if (error) {
      throw  BadRequest(message);
    }
    return value;
  }
}
