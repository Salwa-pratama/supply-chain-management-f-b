import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { BusinessService } from "./business.service";
import { AddMemberDto } from "./dto/add-member.dto";

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

  @Get("members")
  @ApiOperation({ summary: "Ambil seluruh staf (kasir & gudang) untuk bisnis aktif" })
  async getMembers(@CurrentUser("id") userId: string) {
    const data = await this.businessService.getMembers(userId);
    return ServiceResponse.success("Daftar staf berhasil dimuat", data);
  }

  @Post("members")
  @ApiOperation({ summary: "Tambah staf baru (kasir / manajer_gudang) ke bisnis" })
  async addMember(
    @CurrentUser("id") userId: string,
    @Body() dto: AddMemberDto,
  ) {
    const data = await this.businessService.addMember(userId, dto);
    return ServiceResponse.success("Staf baru berhasil ditambahkan", data, 201);
  }

  @Patch("members/:id/toggle")
  @ApiOperation({ summary: "Toggle status aktif staf" })
  async toggleMember(
    @CurrentUser("id") userId: string,
    @Param("id") memberId: string,
  ) {
    const data = await this.businessService.toggleMemberStatus(userId, memberId);
    return ServiceResponse.success("Status staf berhasil diperbarui", data);
  }
}
