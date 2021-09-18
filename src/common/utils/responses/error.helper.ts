import { HttpException, HttpStatus } from '@nestjs/common';
import { BAD_REQUEST, DATA_NOT_FOUND_ERROR } from '../../constants/responses/error.constants';

export const BadRequest = (message: string) =>
  new HttpException(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message,
     error: BAD_REQUEST
    },
    HttpStatus.BAD_REQUEST,
  );
export const DataNotFoundError = (message: string) =>
  new HttpException(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message,
     error: DATA_NOT_FOUND_ERROR
    },
    HttpStatus.BAD_REQUEST,
  );
