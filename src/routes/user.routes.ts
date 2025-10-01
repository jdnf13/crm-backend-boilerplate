import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserService } from '../services/UserService.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

// Inicializar el servicio y el controlador, inyectando la dependencia
const userService = new UserService();
const userController = new UserController(userService);

// Inicializar el router de Express
const userRouter = Router();

/**
 * Rutas de Autenticación
 * Prefijo: /api/v1/auth
 */

// POST /auth/google/callback - Punto de entrada de la autenticación
userRouter.post('/google/callback', userController.googleAuthCallback);

// POST /auth/logout - Cierre de sesión
userRouter.post('/logout', userController.logout);

/**
 * Ruta de Prueba Protegida
 * Esta ruta usa el middleware de autenticación (authMiddleware)
 */
userRouter.get('/protected', authMiddleware, userController.protectedRoute);

export default userRouter;
