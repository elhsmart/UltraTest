import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Type, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

export class NotFoundFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let httpStatus = HttpStatus.NOT_FOUND;

    response
      .status(httpStatus)
      .json({
        statusCode: httpStatus,
        message: exception.message,
        error: exception.error,
      });
  }
}
