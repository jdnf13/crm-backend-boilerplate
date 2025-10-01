import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService.js';
import { QueryFailedError } from 'typeorm'; // Importamos TypeORM QueryFailedError (opcional, pero buena práctica)

/**
 * Clase Controlador para la gestión de Clientes.
 * Recibe el servicio como dependencia en el constructor (DI).
 */
export class ClientController {
  private clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  /**
   * GET /api/v1/clients - Obtiene todos los clientes.
   */
  getAllClients = async (req: Request, res: Response): Promise<void> => {
    try {
      const clients = await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      res.status(500).json({ message: 'Error interno del servidor al obtener clientes' });
    }
  };

  /**
   * GET /api/v1/clients/:id - Obtiene un cliente por ID.
   */
  getClientById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const client = await this.clientService.getClientById(id);

      if (!client) {
        res.status(404).json({ message: 'Cliente no encontrado' });
        return;
      }
      res.status(200).json(client);
    } catch (error) {
      console.error('Error al obtener cliente por ID:', error);
      res.status(500).json({ message: 'Error interno del servidor al obtener cliente' });
    }
  };

  /**
   * POST /api/v1/clients - Crea un nuevo cliente.
   */
  createClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { firstName, lastName, email, phone, company, status } = req.body;

      if (!firstName || !lastName || !email) {
        res.status(400).json({ message: 'Faltan campos obligatorios: firstName, lastName y email' });
        return;
      }

      const newClient = await this.clientService.createClient({ firstName, lastName, email, phone, company, status });
      res.status(201).json(newClient);
    } catch (error) {
      // Manejo genérico de error de clave única (ej. email duplicado)
      // Los códigos de error varían por DB. Aquí verificamos el mensaje o tipo si es QueryFailedError.
      if (error instanceof QueryFailedError && (error.message.includes('Duplicate entry') || error.message.includes('unique constraint'))) {
          res.status(409).json({ message: 'El email proporcionado ya está registrado.' });
          return;
      }
      console.error('Error al crear cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor al crear cliente' });
    }
  };

  /**
   * PUT /api/v1/clients/:id - Actualiza un cliente.
   */
  updateClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedClient = await this.clientService.updateClient(id, updateData);

      if (!updatedClient) {
        res.status(404).json({ message: 'Cliente no encontrado' });
        return;
      }
      res.status(200).json(updatedClient);
    } catch (error) {
       // Manejo genérico de error de clave única (ej. email duplicado)
       if (error instanceof QueryFailedError && (error.message.includes('Duplicate entry') || error.message.includes('unique constraint'))) {
        res.status(409).json({ message: 'El nuevo email proporcionado ya está registrado por otro usuario.' });
        return;
       }
      console.error('Error al actualizar cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor al actualizar cliente' });
    }
  };

  /**
   * DELETE /api/v1/clients/:id - Elimina un cliente.
   */
  deleteClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.clientService.deleteClient(id);

      if (!wasDeleted) {
        res.status(404).json({ message: 'Cliente no encontrado para eliminar' });
        return;
      }
      res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      res.status(500).json({ message: 'Error interno del servidor al eliminar cliente' });
    }
  };
}
