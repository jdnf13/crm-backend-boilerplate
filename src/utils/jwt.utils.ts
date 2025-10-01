import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Función auxiliar para obtener el secreto JWT o lanzar un error.
 */
function getJwtSecret(): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno.');
  }
  return JWT_SECRET;
}

/**
 * Firma un nuevo JWT.
 * @param payload Objeto con la información del usuario a incrustar.
 */
export function signJwt(payload: object) {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
}

/**
 * Verifica y decodifica un JWT.
 * @param token Token JWT.
 */
export function verifyJwt(token: string) {
  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);
    return { decoded, expired: false };
  } catch (error) {
    const isExpired = error instanceof Error && error.name === 'TokenExpiredError';
    return { 
        decoded: null, 
        expired: isExpired 
    };
  }
}
