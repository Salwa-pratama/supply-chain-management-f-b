import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ServiceResponse } from '../models/service_response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.';
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
      // Log error teknis di terminal untuk keperluan debugging pengembang
      this.logger.error(`[Unhandled Exception] ${exception.message}`, exception.stack);

      // Cek apakah error merupakan Prisma unique constraint (P2002)
      const errObj = exception as { code?: string; meta?: { target?: string[] | string } };
      if (errObj.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'Email sudah digunakan. Silakan gunakan email lain atau masuk ke akun Anda.';
      } else {
        // Jangan pernah membocorkan detail database/Prisma/SQL ke pengguna
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.';
      }
    }

    const errorPayload = ServiceResponse.failure(message, data, status);
    response.status(status).json(errorPayload);
  }
}
