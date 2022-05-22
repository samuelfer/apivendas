import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/entities/repositories/CustomersRepository';

class ListCustomerService {

  public async execute(): Promise<User[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
