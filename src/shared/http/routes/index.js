import productRouter from '@modules/products/routes/product.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import userRouter from '@modules/users/routes/user.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
