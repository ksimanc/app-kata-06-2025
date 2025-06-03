# Sistema de Gestión de Usuarios

Una aplicación full-stack para la gestión de usuarios, computadoras y solicitudes de acceso en una organización. El sistema consta de un frontend en Angular, backend en Express.js y una base de datos PostgreSQL.

## Características

- 👥 Gestión de Usuarios
  - Crear y administrar perfiles de usuario
  - Ver detalles e historial de usuarios
- 💻 Gestión de Computadoras
  - Seguimiento de asignaciones de computadoras
  - Ver historial de asignaciones
- 🔐 Sistema de Solicitudes de Acceso
  - Enviar nuevas solicitudes de acceso
  - Revisar y gestionar solicitudes pendientes

## Stack Tecnológico

- **Frontend**: Angular
- **Backend**: Express.js
- **Base de Datos**: PostgreSQL
- **Desarrollo**: Docker

## Comenzando

### Prerrequisitos

- Docker y Docker Compose
- Node.js (recomendado para desarrollo local)
- Git

### Configuración del Entorno de Desarrollo

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/ksimanc/app-kata-06-2025.git
   cd app-kata-06-2025
   ```

2. Crear archivo de entorno:
   - Copiar `.env.example` a `.env`

    ```
    cp .env.example .env
    ```

3. Iniciar el entorno de desarrollo:
   ```sh
   sh ./scripts/dev.sh
   ```

> [!NOTE]
> En MacOS debes abrir Docker Desktop para poder ejecutar contenedores.

Este comando realizará:
- Creación de una red Docker con todos los contenedores requeridos
- Inicio del servidor de desarrollo de Angular
- Lanzamiento del backend en Express.js
- Inicialización de la base de datos PostgreSQL
- Instalación de todas las dependencias necesarias
- Creación y población de tablas si es necesario

### Estructura del Proyecto

- `bbog-kata-users-web-ui/`: Aplicación frontend en Angular
- `bbog-kata-users-mngr/`: Servidor backend en Express.js
- `scripts/`: Scripts de desarrollo y despliegue

## Desarrollo

El proyecto utiliza un entorno de desarrollo containerizado para mantener la consistencia entre diferentes máquinas de desarrollo.

### Desarrollo Frontend
- Ubicado en `bbog-kata-users-web-ui/`
- Utiliza las últimas características de Angular
- Incluye componentes modulares para usuarios, computadoras y solicitudes de acceso

### Desarrollo Backend
- Ubicado en `bbog-kata-users-mngr/`
- Implementación de API RESTful
- Interacciones con la base de datos usando TypeScript
- Controladores y servicios estructurados
