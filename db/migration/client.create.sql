-- ============================================================
-- CREACIÓN TABLAS CLIENTS (MySQL 8.x)
-- ============================================================

DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  company VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'Lead',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- INSERTS DE EJEMPLO
-- ============================================================

-- Clientes
INSERT INTO clients (first_name, last_name, email, phone, company, status)
VALUES
  ('Carlos', 'Ramírez', 'carlos.ramirez@example.com', '3001234567', 'Tech Solutions', 'Prospecto'),
  ('Laura', 'Martínez', 'laura.martinez@example.com', '3109876543', 'Finanzas SA', 'Activo');

-- ============================================================
-- VERIFICAR REGISTROS
-- ============================================================

SELECT * FROM clients;
