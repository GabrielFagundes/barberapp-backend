import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/constrollers/UserController';
import SessionController from './app/constrollers/SessionController';
import FileController from './app/constrollers/FileController';
import ProviderController from './app/constrollers/ProviderController';
import AppointmentController from './app/constrollers/AppointmentController';
import ScheduleController from './app/constrollers/ScheduleController';
import NotificationController from './app/constrollers/NotificationController';
import AvailableController from './app/constrollers/AvailableController';

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

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
