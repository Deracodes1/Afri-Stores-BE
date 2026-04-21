import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepo.find();
  }

  async seed() {
    const defaultCategories = [
      { name: 'Electronics', description: 'High-end tech and gadgets' },
      { name: 'Home & Kitchen', description: 'Furniture and appliances' },
      { name: 'Kiddies', description: 'kids playthings and toys' },
      { name: 'Defense', description: 'High grade military equipments' },
      { name: 'Appliances', description: 'Highly durable end to end' },
    ];

    // Using upsert on 'name' so you can run this multiple times safely
    return await this.categoryRepo.upsert(defaultCategories, ['name']);
  }
}
