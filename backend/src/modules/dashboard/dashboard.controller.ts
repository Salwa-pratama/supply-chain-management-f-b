import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { DashboardService } from "./dashboard.service";

@ApiTags("Dashboard")
@Controller("dashboard")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("owner-overview")
  @ApiOperation({ summary: "Ringkasan metrik dashboard pemilik toko" })
  async getOwnerOverview(@CurrentUser("id") userId: string) {
    const data = await this.dashboardService.getOwnerOverview(userId);
    return ServiceResponse.success("Metrik pemilik toko berhasil dimuat", data);
  }

  @Get("scm-pipeline")
  @ApiOperation({ summary: "Status pergerakan live 5 tahap rantai pasok" })
  async getScmPipeline(@CurrentUser("id") userId: string) {
    const data = await this.dashboardService.getScmPipeline(userId);
    return ServiceResponse.success("Status alur rantai pasok berhasil dimuat", data);
  }

  @Get("admin-stats")
  @ApiOperation({ summary: "Statistik platform nasional untuk Super Admin" })
  async getAdminStats() {
    const data = await this.dashboardService.getAdminPlatformStats();
    return ServiceResponse.success("Statistik platform super admin berhasil dimuat", data);
  }
}
