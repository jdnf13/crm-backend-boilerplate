import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils.js';

/**
 * Middleware para verificar la autenticación del usuario.
 * Busca el JWT en la cookie 'accessToken'.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Obtener el token de las cookies
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    // Si no hay token, denegar acceso
    return res.status(401).json({ 
      message: 'Acceso denegado. Token no proporcionado.', 
      code: 'TOKEN_MISSING' 
    });
  }

  // 2. Verificar y decodificar el token
  const { decoded, expired } = verifyJwt(accessToken);

  if (expired) {
    // Si el token expiró
    return res.status(401).json({ 
      message: 'Acceso denegado. Token expirado.', 
      code: 'TOKEN_EXPIRED' 
    });
  }

  if (decoded) {
    // 3. Token válido: adjuntar la información del usuario a la solicitud
    // Esto hace que la información del usuario esté disponible en req.user
    (req as any).user = decoded; 
    return next();
  }

  // 4. Token inválido (firma errónea, etc.)
  return res.status(401).json({ 
    message: 'Acceso denegado. Token inválido.', 
    code: 'TOKEN_INVALID' 
  });
};
