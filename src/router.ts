import { Router } from 'express';
import { traineeRouter } from './controllers/trainee';
import { userRouter } from './controllers/user';

const routers: Router = Router();

routers.use('/trainee', traineeRouter);
routers.use('/user', userRouter);

export default routers;
