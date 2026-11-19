import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@ApiTags("Orders")
@Controller("orders")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: "Ambil daftar seluruh riwayat pesanan/transaksi toko" })
  async findAll(@CurrentUser("id") userId: string) {
    const data = await this.ordersService.findAll(userId);
    return ServiceResponse.success("Daftar pesanan berhasil dimuat", data);
  }

  @Get("stats/today")
  @ApiOperation({ summary: "Ambil statistik performa kasir (POS) hari ini" })
  async getTodayStats(@CurrentUser("id") userId: string) {
    const data = await this.ordersService.getTodayStats(userId);
    return ServiceResponse.success("Statistik kasir hari ini berhasil dimuat", data);
  }

  @Get(":id")
  @ApiOperation({ summary: "Ambil detail nota pesanan kasir" })
  async findOne(@Param("id") id: string, @CurrentUser("id") userId: string) {
    const data = await this.ordersService.findOne(id, userId);
    return ServiceResponse.success("Detail pesanan berhasil dimuat", data);
  }

  @Post()
  @ApiOperation({ summary: "Proses transaksi kasir baru (potong stok bahan otomatis)" })
  async create(
    @Body() dto: CreateOrderDto,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.ordersService.create(dto, userId);
    return ServiceResponse.success("Transaksi penjualan berhasil dicatat", data);
  }
}
