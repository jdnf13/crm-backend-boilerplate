**CRM Backend Boilerplate (Node.js & TypeScript)**

Este proyecto sirve como la estructura base (boilerplate) para un sistema de Gestión de Relaciones con Clientes (CRM) de alto rendimiento. 

Está diseñado con un enfoque modular, utilizando TypeScript, Express, TypeORM y una estrategia de autenticación sin estado (Stateless) basada en JWT y Cookies HTTP-only.🚀 

**Tecnologías Clave**
1. Node.js (ESM) Entorno de ejecución asíncrono.
2. TypeScript: Tipado estático y mejor mantenibilidad.
3. Framework: Express Framework web minimalista para API REST.
4. ORM: TypeORM para Abstracción de la base de datos relacional (SQL).
5. SeguridadJWT + Cookies HTTP-onlyAutenticación sin estado y segura contra ataques XSS.Gestor PaquetespnpmInstalación rápida y eficiente de dependencias.🛠️ 

**Requisitos Previos:**
Antes de comenzar, asegúrate de tener instalado
1. Node.js: Se recomienda usar nvm (Node Version Manager).
2. pnpm: El gestor de paquetes.
3. Base de Datos SQL: (Ej. MySQL, PostgreSQL o PlanetScale) y sus credenciales de acceso.

**⚙️ Configuración del Entorno:**
Sigue estos pasos para levantar el proyecto en tu máquina local.

1. Establecer la Versión de Node.js

El proyecto requiere la versión de Node.js 20.14.0, tal como se define en el archivo .nvmrc.

# Carga e instala (si es necesario) la versión 20.14.0 ejecutando:
nvm install && nvm use


2. Instalación de Dependencias

Utiliza pnpm para instalar todas las dependencias del proyecto, incluyendo desarrollo y producción:

pnpm install

3. Configuración de Variables de Entorno

Crea un archivo llamado .env en la raíz del proyecto, copiando el contenido de .env.example.

.env# Configuración del Servidor
PORT=4000
NODE_ENV=development 

# Seguridad 
JWT_SECRET=tu_secreto_muy_seguro_aqui_para_jwt
JWT_EXPIRES_IN=7d

# Configuración de la Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password123
DB_NAME=crm_db

# ... (otras variables de OAuth)
Asegúrate de configurar tu base de datos para que TypeORM pueda conectarse. 

**El modo synchronize:** true está activado en development para crear automáticamente las tablas.


**▶️ Ejecución del Proyecto:** 
Modo Desarrollo (con Recarga Automática)Utiliza el script dev para iniciar el servidor en modo watch con ts-node-dev.pnpm dev

# El servidor iniciará en http://localhost:4000
Modo Producción (Compilado)Compila el código TypeScript a JavaScript:

pnpm build

Ejecuta el bundle resultante en la carpeta dist:

pnpm serve

🗺️ Estructura de Endpoints Iniciales

El proyecto inicial incluye endpoints para simular la autenticación via Google OAuth y proteger rutas. 