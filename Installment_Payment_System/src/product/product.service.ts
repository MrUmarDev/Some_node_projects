import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
      @InjectModel(Product)
      private productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  async findAll(findProductDto: FindProductDto): Promise<Product[]> {
    const { name, description, price, imageURL } = findProductDto;

    const where = {} as any;

    if (name) {
      where.name = name;
    }

    if (description) {
      where.description = description;
    }

    if (price) {
      where.price = price;
    }

    if (imageURL) {
      where.imageURL = imageURL;
    }

    return this.productModel.findAll({
      where,
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    await product.update(updateProductDto);

    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    await product.destroy();
  }
}
