import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/constrollers/UserController';
import SessionController from './app/constrollers/SessionController';
import FileController from './app/constrollers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ message: 'Started' });
});

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// Routes bellow this middleware will pass only if the user is logged in
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
