import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/User.entity.js';
import { DeepPartial } from 'typeorm';

/**
 * Interfaz para la data recibida o esperada para un usuario.
 */
interface UserProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  authProvider?: string;
}

/**
 * Capa de servicio para la gestión de la lógica de negocio de los Usuarios.
 * Interactúa con TypeORM y maneja la lógica de autenticación (creación/actualización).
 */
export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Obtiene o crea un usuario basado en el perfil de OAuth.
   * Si el usuario existe, lo actualiza. Si no, lo crea.
   * @param profile Datos de perfil simulados de Google OAuth.
   */
  async findOrCreateUser(profile: UserProfile): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: profile.email });

    if (existingUser) {
      // Usuario existente: actualiza y retorna
      this.userRepository.merge(existingUser, profile as DeepPartial<User>);
      await this.userRepository.save(existingUser);
      return existingUser;
    }

    // Usuario nuevo: crea y retorna
    const newUser = this.userRepository.create(profile as DeepPartial<User>);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
