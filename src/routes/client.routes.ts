import { Router } from 'express';
import { ClientController } from '../controllers/client.controller.js';
import { ClientService } from '../services/ClientService.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

// Inicializar el servicio y el controlador, inyectando la dependencia
const clientService = new ClientService();
const clientController = new ClientController(clientService);

// Inicializar el router de Express
const clientRouter = Router();

// Todas las rutas de gestión de clientes requieren autenticación
clientRouter.use(authMiddleware);

/**
 * Rutas CRUD para la gestión de Clientes
 * Prefijo: /api/v1/clients
 */

// POST /clients - Crear Cliente
clientRouter.post('/', clientController.createClient);

// GET /clients - Obtener todos los Clientes
clientRouter.get('/', clientController.getAllClients);

// GET /clients/:id - Obtener Cliente por ID
clientRouter.get('/:id', clientController.getClientById);

// PUT /clients/:id - Actualizar Cliente
clientRouter.put('/:id', clientController.updateClient);

// DELETE /clients/:id - Eliminar Cliente
clientRouter.delete('/:id', clientController.deleteClient);

export default clientRouter;
