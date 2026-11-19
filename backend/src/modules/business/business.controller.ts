import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { BusinessService } from "./business.service";

@ApiTags("Business")
@Controller("business")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get("my")
  @ApiOperation({ summary: "Ambil profil bisnis aktif milik user/staf" })
  async getMyBusiness(@CurrentUser("id") userId: string) {
    const data = await this.businessService.getMyBusiness(userId);
    return ServiceResponse.success("Data bisnis berhasil dimuat", data);
  }

  @Get("all")
  @ApiOperation({ summary: "Ambil seluruh bisnis (Super Admin)" })
  async getAllBusinesses() {
    const data = await this.businessService.getAllBusinesses();
    return ServiceResponse.success("Daftar seluruh bisnis berhasil dimuat", data);
  }
}
