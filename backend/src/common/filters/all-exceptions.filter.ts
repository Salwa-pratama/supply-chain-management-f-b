import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ServiceResponse } from '../models/service_response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let data: unknown = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const responseObj = res as Record<string, unknown>;
        message =
          (responseObj['message'] as string) ||
          (responseObj['error'] as string) ||
          exception.message;

        // If class-validator returned array of error messages
        if (Array.isArray(responseObj['message'])) {
          message = responseObj['message'].join(', ');
          data = responseObj['message'];
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorPayload = ServiceResponse.failure(message, data, status);
    response.status(status).json(errorPayload);
  }
}
