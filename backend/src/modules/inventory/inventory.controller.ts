import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { InventoryService } from "./inventory.service";
import { CreateIngredientDto, StockOpnameDto } from "./dto/create-ingredient.dto";

@ApiTags("Inventory")
@Controller("inventory")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: "Ambil daftar seluruh bahan baku gudang & status stok" })
  async findAll(@CurrentUser("id") userId: string) {
    const data = await this.inventoryService.findAll(userId);
    return ServiceResponse.success("Data inventaris bahan baku berhasil dimuat", data);
  }

  @Post()
  @ApiOperation({ summary: "Tambah master bahan baku baru di gudang" })
  async create(
    @Body() dto: CreateIngredientDto,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.inventoryService.create(dto, userId);
    return ServiceResponse.success("Master bahan baku berhasil ditambahkan", data);
  }

  @Post("opname")
  @ApiOperation({ summary: "Lakukan koreksi stok opname fisik gudang" })
  async stockOpname(
    @Body() dto: StockOpnameDto,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.inventoryService.stockOpname(dto, userId);
    return ServiceResponse.success(data.message, data);
  }

  @Post("dispatch-kitchen")
  @ApiOperation({ summary: "Pengeluaran dan serah terima bahan baku ke kitchen/barista" })
  async dispatchKitchen(
    @Body() dto: { ingredientId: string; quantity: number; station?: string; notes?: string },
    @CurrentUser("id") userId: string
  ) {
    const data = await this.inventoryService.dispatchToKitchen(dto, userId);
    return ServiceResponse.success(data.message, data);
  }

  @Get("movements")
  @ApiOperation({ summary: "Ambil riwayat log mutasi stok bahan (in, out, adjust)" })
  async getMovements(@CurrentUser("id") userId: string) {
    const data = await this.inventoryService.getMovements(userId);
    return ServiceResponse.success("Log mutasi stok berhasil dimuat", data);
  }
}
