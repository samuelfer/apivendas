import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.get('/', sessionController.createSession);

sessionRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.createSession
);

export default sessionRouter;
