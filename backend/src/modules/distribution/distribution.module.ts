import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";
import { BusinessModule } from "../business/business.module";
import { DistributionController } from "./distribution.controller";
import { DistributionService } from "./distribution.service";

@Module({
  imports: [PrismaModule, BusinessModule],
  controllers: [DistributionController],
  providers: [DistributionService],
  exports: [DistributionService],
})
export class DistributionModule {}
