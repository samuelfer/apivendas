import ProductRepository from '@modules/products/typeorm/repositories/ProductsRespository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import OrdersRepository from '@modules/orders/typeorm/repositories/OrdersRepository';
import Order from '../entities/Order';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}
class CreateOrderService {

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find products ${checkInexistentProducts[0].id}.`);
    }

    /**
     * Valida se a quantidade solicitada existe no banco
     */
    const quantityAvailable = products.filter(
      product => existsProducts.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity}
        is not available for ${quantityAvailable[0].id}.`
      );
    }

    const serializedProducts = products.map(
      product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(
      product => ({
        id: product.product_id,
        quantity: existsProducts.filter(
          p => p.id === product.product_id)[0].quantity -
          product.quantity,
      }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
