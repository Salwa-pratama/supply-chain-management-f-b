import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessModule } from './modules/business/business.module';
import { ProductsModule } from './modules/products/products.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UsersModule } from './modules/users/users.module';
import { ProductionModule } from './modules/production/production.module';
import { DistributionModule } from './modules/distribution/distribution.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    BusinessModule,
    ProductsModule,
    InventoryModule,
    OrdersModule,
    SuppliersModule,
    PurchaseOrdersModule,
    DashboardModule,
    UsersModule,
    ProductionModule,
    DistributionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
