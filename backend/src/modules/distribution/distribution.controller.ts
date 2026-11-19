import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { DistributionService } from "./distribution.service";
import { CreateTransferDto } from "./dto/create-transfer.dto";

@ApiTags("Distribution & Branch Transfers")
@Controller("distribution")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class DistributionController {
  constructor(private readonly distributionService: DistributionService) {}

  @Get("transfers")
  @ApiOperation({ summary: "Ambil seluruh surat jalan transfer antar cabang" })
  async findAll(@CurrentUser("id") userId: string) {
    const data = await this.distributionService.findAll(userId);
    return ServiceResponse.success("Daftar transfer cabang berhasil dimuat", data);
  }

  @Get("transfers/:id")
  @ApiOperation({ summary: "Ambil detail transfer cabang" })
  async findOne(@Param("id") id: string, @CurrentUser("id") userId: string) {
    const data = await this.distributionService.findOne(id, userId);
    return ServiceResponse.success("Detail transfer cabang berhasil dimuat", data);
  }

  @Post("transfers")
  @ApiOperation({ summary: "Buat surat jalan transfer cabang baru" })
  async create(@CurrentUser("id") userId: string, @Body() dto: CreateTransferDto) {
    const data = await this.distributionService.create(userId, dto);
    return ServiceResponse.success("Surat jalan transfer berhasil dibuat", data, 201);
  }

  @Patch("transfers/:id/status")
  @ApiOperation({ summary: "Perbarui status transfer cabang (shipping / received)" })
  async updateStatus(
    @Param("id") id: string,
    @Body("status") status: string,
    @CurrentUser("id") userId: string,
  ) {
    const data = await this.distributionService.updateStatus(id, status, userId);
    return ServiceResponse.success("Status transfer berhasil diperbarui", data);
  }
}
