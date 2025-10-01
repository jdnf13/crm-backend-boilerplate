-- ============================================================
-- CREACIÓN TABLAS USERS (MySQL 8.x)
-- ============================================================

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  auth_provider VARCHAR(50) NOT NULL DEFAULT 'google',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- INSERTS DE EJEMPLO
-- ============================================================

-- Usuarios
INSERT INTO users (email, first_name, last_name, auth_provider)
VALUES
  ('juan@example.com', 'Juan', 'Pérez', 'google'),
  ('maria@example.com', 'María', 'Gómez', 'google');

-- ============================================================
-- VERIFICAR REGISTROS
-- ============================================================
SELECT * FROM users;