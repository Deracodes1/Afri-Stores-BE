import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepo.find({
      // Optional: if you want to see products inside categories immediately
      // relations: ['associatedProducts'],
    });
  }

  // A helper method for your seeding logic later
  async createMany(categories: Partial<Category>[]) {
    return await this.categoryRepo.save(categories);
  }
  // category.service.ts
  async seed() {
    const defaultCategories = [
      {
        name: 'Electronics',
        description: 'High-end tech and gadgets',
        // Add any other columns you have here
      },
      {
        name: 'Home & Kitchen',
        description: 'Furniture and appliances',
      },
      // ... total of 5
    ];

    // upsert is robust because it prevents "duplicate key" errors
    await this.categoryRepo.upsert(defaultCategories, ['name']);
  }
}
