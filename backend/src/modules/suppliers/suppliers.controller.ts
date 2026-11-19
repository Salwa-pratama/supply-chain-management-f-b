import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { SuppliersService } from "./suppliers.service";
import { CreateSupplierItemDto } from "./dto/create-supplier-item.dto";

@ApiTags("Suppliers")
@Controller("suppliers")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get("my-profile")
  @ApiOperation({ summary: "Ambil profil pemasok aktif (Portal Pemasok)" })
  async getMyProfile(@CurrentUser("id") userId: string) {
    const data = await this.suppliersService.getMySupplierProfile(userId);
    return ServiceResponse.success("Profil pemasok berhasil dimuat", data);
  }

  @Patch("my-profile")
  @ApiOperation({ summary: "Perbarui profil pemasok aktif (Portal Pemasok)" })
  async updateMyProfile(
    @CurrentUser("id") userId: string,
    @Body() dto: { name?: string; phone?: string; address?: string; category?: string }
  ) {
    const data = await this.suppliersService.updateMyProfile(userId, dto);
    return ServiceResponse.success("Profil pemasok berhasil diperbarui", data);
  }

  @Get("my-catalog")
  @ApiOperation({ summary: "Ambil komoditas item jualan pemasok yang login" })
  async getMyCatalog(@CurrentUser("id") userId: string) {
    const data = await this.suppliersService.getMyCatalog(userId);
    return ServiceResponse.success("Katalog komoditas pemasok berhasil dimuat", data);
  }

  @Get()
  @ApiOperation({ summary: "Ambil daftar seluruh mitra pemasok dan katalognya" })
  async findAll() {
    const data = await this.suppliersService.findAll();
    return ServiceResponse.success("Daftar pemasok berhasil dimuat", data);
  }

  @Get(":id")
  @ApiOperation({ summary: "Ambil detail spesifik pemasok dan item yang dijual" })
  async findOne(@Param("id") id: string) {
    const data = await this.suppliersService.findOne(id);
    return ServiceResponse.success("Detail pemasok berhasil dimuat", data);
  }

  @Post("items")
  @ApiOperation({ summary: "Tambah komoditas bahan baru ke katalog pemasok" })
  async addSupplierItem(
    @Body() dto: CreateSupplierItemDto,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.suppliersService.addSupplierItem(dto, userId);
    return ServiceResponse.success("Komoditas bahan berhasil ditambahkan ke katalog", data);
  }
}
