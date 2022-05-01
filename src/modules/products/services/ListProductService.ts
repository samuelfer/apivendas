import { ProductRepository } from '../typeorm/repositories/ProductsRespository';
import Product from "../typeorm/entities/Product";
import { getCustomRepository } from 'typeorm';

class ListProductService {

  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    return products;
  }
}

export default ListProductService;
