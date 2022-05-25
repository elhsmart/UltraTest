import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Type,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class MysqlErrorFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'ER_DUP_ENTRY': {
        httpStatus = HttpStatus.CONFLICT;
        break;
      }
    }

    response.status(httpStatus).json({
      statusCode: httpStatus,
      message: exception.message,
      error: exception.error,
    });
  }
}
