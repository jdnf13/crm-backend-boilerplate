import { AppDataSource } from '../config/data-source.js';
import { Client } from '../entities/Client.entity.js';
import { DeepPartial } from 'typeorm';

/**
 * Interfaz para la data de creación/actualización de un cliente.
 */
interface ClientData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  status?: string;
}

/**
 * Capa de servicio para la gestión de la lógica de negocio de los Clientes.
 * Interactúa directamente con el Repositorio de TypeORM.
 */
export class ClientService {
  private clientRepository = AppDataSource.getRepository(Client);

  /**
   * Obtiene todos los clientes.
   */
  async getAllClients(): Promise<Client[]> {
    // Aquí podrías añadir lógica de paginación o filtrado avanzado
    const clients = await this.clientRepository.find({
      order: {
        lastName: 'ASC',
      },
    });
    return clients;
  }

  /**
   * Obtiene un cliente por ID.
   * @param id ID del cliente (UUID).
   */
  async getClientById(id: string): Promise<Client | null> {
    const client = await this.clientRepository.findOneBy({ id });
    return client;
  }

  /**
   * Crea un nuevo cliente.
   * @param data Datos del nuevo cliente.
   */
  async createClient(data: ClientData): Promise<Client> {
    const newClient = this.clientRepository.create(data as DeepPartial<Client>);
    await this.clientRepository.save(newClient);
    return newClient;
  }

  /**
   * Actualiza un cliente existente por ID.
   * @param id ID del cliente (UUID).
   * @param data Datos a actualizar.
   */
  async updateClient(id: string, data: Partial<ClientData>): Promise<Client | null> {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      return null;
    }

    // Fusiona los datos existentes con los datos nuevos
    this.clientRepository.merge(client, data as DeepPartial<Client>);
    await this.clientRepository.save(client);
    return client;
  }

  /**
   * Elimina un cliente por ID.
   * @param id ID del cliente (UUID).
   * @returns Retorna true si se eliminó, false si no se encontró.
   */
  async deleteClient(id: string): Promise<boolean> {
    const result = await this.clientRepository.delete(id);
    // Corrección: Usamos ?? 0 para manejar `null` de forma segura.
    return (result.affected ?? 0) > 0;
  }
}
