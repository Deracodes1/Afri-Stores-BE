import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto, userId: string) {
    try {
      const { categoryId, ...productData } = createProductDto;

      // 1. Check if Category exists
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID "${categoryId}" not found`,
        );
      }

      // 2. Create the product object
      const product = this.productRepository.create({
        ...productData,
        ownerId: userId, // Use the ID column directly
        category: category,
      });

      // 3. Save to database
      return await this.productRepository.save(product);
    } catch (error) {
      // THIS WILL LOG THE REAL ERROR TO YOUR TERMINAL (e.g., Foreign Key Violation)
      console.error('DATABASE SAVE ERROR:', error);
      throw error;
    }
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
