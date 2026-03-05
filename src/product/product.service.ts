import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  products = [
    {
      name: 'Samsung Galaxy',
      description: 'Highly Durable Phone',
      price: 50,
      id: '1',
    },
    {
      name: 'Hisense TV',
      description: 'MultiPurpose HI-sense TV for streaming, netlix and chill',
      price: 220,
      id: '2',
    },
    {
      name: 'Hp EliteBook',
      description: 'Highly Performant machine',
      price: 150,
      id: '3',
    },
  ];
  create(createProductDto: CreateProductDto) {
    this.products.push(createProductDto);
    return 'New Product successfully created';
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const requestedProduct = this.products.find((product) => product.id === id);
    if (!requestedProduct) {
      throw new NotFoundException('This product does not exist in our DB');
    }
    return requestedProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const requestedProduct = this.products.find((product) => product.id === id);
    if (!requestedProduct) {
      throw new NotFoundException(
        'sorry this product you are trying to modify does not exist in our DB',
      );
    }
    const updatedProduct = { ...requestedProduct, ...updateProductDto };
    this.products.push(updatedProduct);
    return `Product field successfully updated in the DB`;
  }

  remove(id: string) {
    const requestedProduct = this.products.find((product) => product.id === id);
    if (!requestedProduct) {
      throw new NotFoundException(
        'this product can not be deleted because we do not have it in our DB',
      );
    }
    const modifiiedProduct = this.products.filter(
      (product) => product.id !== id,
    );
    this.products = modifiiedProduct;
    return {
      message: `Product Successfully deleted`,
    };
  }
}
