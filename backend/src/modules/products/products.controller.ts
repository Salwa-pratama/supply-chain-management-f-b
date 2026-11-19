import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ServiceResponse } from "../../common/models/service_response";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";

@ApiTags("Products")
@Controller("products")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "Dapatkan seluruh katalog produk aktif toko" })
  async findAll(
    @CurrentUser("id") userId: string,
    @Query("category") category?: string
  ) {
    const data = await this.productsService.findAll(userId, category);
    return ServiceResponse.success("Katalog produk berhasil dimuat", data);
  }

  @Get(":id")
  @ApiOperation({ summary: "Detail produk beserta komposisi resep (BOM)" })
  async findOne(@Param("id") id: string, @CurrentUser("id") userId: string) {
    const data = await this.productsService.findOne(id, userId);
    return ServiceResponse.success("Detail produk berhasil dimuat", data);
  }

  @Post()
  @ApiOperation({ summary: "Tambah produk baru beserta resep bahan baku" })
  async create(
    @Body() dto: CreateProductDto,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.productsService.create(dto, userId);
    return ServiceResponse.success("Produk berhasil dibuat", data);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Perbarui produk dan resep komposisi (BOM)" })
  async update(
    @Param("id") id: string,
    @Body() dto: Partial<CreateProductDto>,
    @CurrentUser("id") userId: string
  ) {
    const data = await this.productsService.update(id, dto, userId);
    return ServiceResponse.success("Produk berhasil diperbarui", data);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Hapus produk dari katalog" })
  async remove(@Param("id") id: string, @CurrentUser("id") userId: string) {
    const data = await this.productsService.remove(id, userId);
    return ServiceResponse.success("Produk berhasil dihapus", data);
  }
}
