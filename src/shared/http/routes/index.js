import { Router } from 'express';
import productRouter from '@modules/products/routes/product.routes';
import userRouter from '@modules/users/routes/user.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);

export default routes;
