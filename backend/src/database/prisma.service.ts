import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    let connectionUrl =
      process.env.DATABASE_URL ||
      'mysql://root:rootpassword@mysql:3306/scm_db?allowPublicKeyRetrieval=true';

    // MySQL 8 caching_sha2_password memerlukan allowPublicKeyRetrieval jika tidak memakai TLS/SSL
    if (
      (connectionUrl.startsWith('mysql://') || connectionUrl.startsWith('mariadb://')) &&
      !connectionUrl.includes('allowPublicKeyRetrieval=')
    ) {
      connectionUrl += (connectionUrl.includes('?') ? '&' : '?') + 'allowPublicKeyRetrieval=true';
    }

    const adapter = new PrismaMariaDb(connectionUrl);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
