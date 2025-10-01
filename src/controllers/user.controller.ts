import { Request, Response } from 'express';
import { UserService } from '../services/UserService.js';
import { signJwt } from '../utils/jwt.utils.js';

/**
 * Clase Controlador para la gestión de Usuarios y la Autenticación.
 * Recibe el servicio como dependencia en el constructor (DI).
 */
export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  /**
   * POST /api/v1/auth/google/callback - Simula el proceso de OAuth.
   * 1. Simula recibir datos del frontend.
   * 2. Usa el UserService para crear/actualizar el usuario.
   * 3. Emite un JWT y lo establece en una cookie HTTP-only.
   */
  googleAuthCallback = async (req: Request, res: Response): Promise<void> => {
    try {
      // Simulación: En un caso real, el "code" o "token" de Google se usaría aquí
      // para obtener los datos reales del usuario desde Google.
      const simulatedOAuthProfile = {
        email: 'simulated.user@gmail.com',
        firstName: 'Usuario',
        lastName: 'Simulado',
        authProvider: 'google',
      };

      const user = await this.userService.findOrCreateUser(simulatedOAuthProfile);

      // Payload del JWT: solo datos no sensibles necesarios para la sesión
      const jwtPayload = {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      };

      const accessToken = signJwt(jwtPayload);

      // Establecer el JWT como cookie HTTP-only y Secure
      res.cookie('accessToken', accessToken, {
        httpOnly: true, // Previene acceso desde JS (mitiga XSS)
        secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
        sameSite: 'strict', // Protección CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      // Retornar una respuesta de éxito (ej. redirigir en el frontend)
      res.status(200).json({ message: 'Autenticación exitosa', userId: user.id });

    } catch (error) {
      console.error('Error en el callback de autenticación:', error);
      res.status(500).json({ message: 'Error interno del servidor durante la autenticación' });
    }
  };

  /**
   * GET /api/v1/protected - Ruta de prueba que requiere JWT válido.
   */
  protectedRoute = (req: Request, res: Response): Response => {
    // Si llegamos aquí, el authMiddleware ya verificó el token y adjuntó req.user
    const user = (req as any).user;
    
    return res.status(200).json({
      message: 'Acceso autorizado a ruta protegida',
      userSession: user,
      timestamp: new Date().toISOString(),
    });
  };
  
  /**
   * POST /api/v1/auth/logout - Cierra la sesión limpiando la cookie.
   */
  logout = (req: Request, res: Response): Response => {
    // Limpiar la cookie de sesión
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Fija la expiración al pasado
    });

    return res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
  };
}
