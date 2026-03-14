import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto, userId: string) {
    const product = this.productRepository.create({
      ...createProductDto,
      owner: { id: userId },
    });
    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find({ relations: ['owner'] }); // includesing owner details
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['owner'], // includes owner details
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto); //  merges changes into existing product
    return this.productRepository.save(product);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.productRepository.delete(id);
  }
}
