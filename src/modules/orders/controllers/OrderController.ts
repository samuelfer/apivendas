import { Response, Request } from 'express';
import CreateOrderService from '../typeorm/services/CreateOrderService';
import ShowOrderService from '../typeorm/services/ShowOrderService';

export default class OrderController {

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const product = await createOrder.execute({
      customer_id, products,
    });

    return response.json(product);
  }

}
