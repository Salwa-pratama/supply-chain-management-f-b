import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // CORS Configuration
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Global Prefix: /api/v1
  app.setGlobalPrefix('api/v1');

  // Global Validation Pipe for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global Exception Filter for standardized error responses
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger API Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('SCM F&B - Supply Chain Management API')
    .setDescription(
      'Dokumentasi resmi RESTful API untuk Sistem Supply Chain Management (SCM) F&B.\n' +
        'Mencakup manajemen akun & bisnis, katalog produk, resep (BOM), inventaris gudang, pengadaan (PO), dan penjualan omnichannel.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Masukkan token JWT Anda (contoh: eyJhbGciOi...)',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'SCM F&B API Docs',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Aplikasi berjalan pada: http://localhost:${port}/api/v1`);
  logger.log(`📑 Dokumentasi Swagger tersedia di: http://localhost:${port}/api/docs`);
}

void bootstrap();
