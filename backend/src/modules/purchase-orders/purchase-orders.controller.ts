import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { PurchaseOrdersService } from "./purchase-orders.service";
import {
  CreatePurchaseOrderDto,
  QcReceiveDto,
  UpdatePoStatusDto,
} from "./dto/create-po.dto";

@ApiTags("PurchaseOrders")
@Controller("purchase-orders")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class PurchaseOrdersController {
  constructor(private readonly poService: PurchaseOrdersService) {}

  @Get()
  @ApiOperation({ summary: "Ambil daftar seluruh PO (untuk toko atau pemasok)" })
  async findAll(
    @CurrentUser("id") userId: string,
    @CurrentUser("role") role: string
  ) {
    const data = await this.poService.findAll(userId, role);
    return ServiceResponse.success("Daftar Purchase Order berhasil dimuat", data);
  }

  @Get(":id")
  @ApiOperation({ summary: "Ambil detail spesifik Purchase Order" })
  async findOne(@Param("id") id: string) {
    const data = await this.poService.findOne(id);
    return ServiceResponse.success("Detail Purchase Order berhasil dimuat", data);
  }

  @Post()
  @ApiOperation({ summary: "Buat Purchase Order baru ke pemasok" })
  async create(
    @Body() dto: CreatePurchaseOrderDto,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.poService.create(dto, userId);
    return ServiceResponse.success("Purchase Order berhasil dikirim ke pemasok", data);
  }

  @Patch(":id/supplier-status")
  @ApiOperation({ summary: "Pemasok mengonfirmasi atau mengirim PO" })
  async updateStatusBySupplier(
    @Param("id") id: string,
    @Body() dto: UpdatePoStatusDto
  ) {
    const data = await this.poService.updateStatusBySupplier(id, dto);
    return ServiceResponse.success("Status PO berhasil diperbarui oleh pemasok", data);
  }

  @Post(":id/qc-receive")
  @ApiOperation({ summary: "Gudang verifikasi QC dan tambah stok otomatis" })
  async verifyQcAndReceive(
    @Param("id") id: string,
    @Body() dto: QcReceiveDto,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.poService.verifyQcAndReceive(id, dto, userId);
    return ServiceResponse.success(
      "Barang berhasil diverifikasi QC dan stok gudang otomatis bertambah!",
      data
    );
  }
}
