import { Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles("super_admin")
  @ApiOperation({ summary: "Ambil seluruh pengguna platform (Khusus Super Admin)" })
  @ApiQuery({ name: "role", required: false })
  @ApiQuery({ name: "search", required: false })
  async findAll(@Query("role") role?: string, @Query("search") search?: string) {
    const data = await this.usersService.findAll(role, search);
    return ServiceResponse.success("Daftar pengguna berhasil dimuat", data);
  }

  @Patch(":id/status")
  @Roles("super_admin")
  @ApiOperation({ summary: "Toggle status aktif/nonaktif akun pengguna" })
  async toggleStatus(@Param("id") id: string) {
    const data = await this.usersService.toggleStatus(id);
    return ServiceResponse.success("Status pengguna berhasil diperbarui", data);
  }
}
