import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { ProductionService } from "./production.service";
import { CreateBatchDto } from "./dto/create-batch.dto";

@ApiTags("Kitchen Production")
@Controller("production")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Get("batches")
  @ApiOperation({ summary: "Ambil seluruh batch produksi dapur & bar" })
  async findAll(@CurrentUser("id") userId: string) {
    const data = await this.productionService.findAll(userId);
    return ServiceResponse.success("Daftar batch produksi berhasil dimuat", data);
  }

  @Get("batches/:id")
  @ApiOperation({ summary: "Ambil detail batch produksi" })
  async findOne(@Param("id") id: string, @CurrentUser("id") userId: string) {
    const data = await this.productionService.findOne(id, userId);
    return ServiceResponse.success("Detail batch produksi berhasil dimuat", data);
  }

  @Post("batches")
  @ApiOperation({ summary: "Buat batch produksi dapur baru" })
  async create(@CurrentUser("id") userId: string, @Body() dto: CreateBatchDto) {
    const data = await this.productionService.create(userId, dto);
    return ServiceResponse.success("Batch produksi baru berhasil dibuat", data, 201);
  }

  @Patch("batches/:id/status")
  @ApiOperation({ summary: "Perbarui status & progress batch produksi" })
  async updateStatus(
    @Param("id") id: string,
    @Body() dto: { status: string; progress?: number; actualYield?: string; notes?: string },
    @CurrentUser("id") userId: string,
  ) {
    const data = await this.productionService.updateStatus(id, dto, userId);
    return ServiceResponse.success("Status batch produksi berhasil diperbarui", data);
  }
}
