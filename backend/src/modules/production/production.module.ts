import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";
import { BusinessModule } from "../business/business.module";
import { ProductionController } from "./production.controller";
import { ProductionService } from "./production.service";

@Module({
  imports: [PrismaModule, BusinessModule],
  controllers: [ProductionController],
  providers: [ProductionService],
  exports: [ProductionService],
})
export class ProductionModule {}
