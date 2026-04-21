import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get('seed')
  async seedCategories() {
    try {
      console.log('Attempting to seed...');
      await this.categoryService.seed();
      return { message: 'Seeding successful' };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorObject = error as Record<string, unknown>;
      const errorDetail =
        typeof errorObject?.detail === 'string'
          ? errorObject.detail
          : undefined;

      console.error('SEEDING ERROR:', errorMessage);

      return {
        success: false,
        message: errorMessage,
        detail: errorDetail,
      };
    }
  }
}
