# Administracion de ventas - Backend

El proyecto de Administración de Ventas es una API REST desarrollada en Node.js que ofrece una plataforma para gestionar y administrar ventas de manera eficiente. Esta API proporciona una interfaz de programación de aplicaciones (API) que permite a los administradores de ventas realizar diversas operaciones, como agregar, actualizar y eliminar ventas, administrar inventario, y más.

URL_DEPLOY =

## Funcionalidades Destacadas

- Gestión de ventas: Permite a los administradores agregar, actualizar y eliminar información sobre ventas realizadas, incluyendo detalles como el cliente, los productos vendidos, fechas, etc.

- Administración de inventario: Facilita el seguimiento del inventario disponible para garantizar que los productos estén siempre disponibles para la venta.

- Autenticación y seguridad: Utiliza JSON Web Tokens (JWT) para garantizar la seguridad de las rutas y datos sensibles, protegiendo así la información de los usuarios.

## Requisitos

Antes de ejecutar la API, asegúrese de tener instalado Node.js en su sistema. Además, será necesario tener acceso a una base de datos MySQL para almacenar la información de las ventas y el inventario.

## Instalación

Para comenzar a utilizar la API, siga estos pasos:

1. Clonar el repositorio desde GitHub:

```bash
git clone https://github.com/tu-usuario/administracion-de-ventas-backend.git
cd administracion-de-ventas-backend
```

2. Instalar las dependencias necesarias:

```bash
npm install
```

3. Configurar variables de entorno:

Cree un archivo `.env` en la raíz del proyecto con la siguiente información y reemplace los valores entre corchetes con sus propias configuraciones:

```
PORT = [puerto]
NODE_ENV = [dev o prod]

# DB
DB_CONNECTION_URI = [mysql://<user>:<pass>@<host>:<port>/<dbname>]
DB_LOGGING = [boolean: activa el registro de consultas SQL en la consola para facilitar el proceso de depuración]

# JSON WEB TOKEN
JWT_SECRET_KEY = [su secreto para generar JWT]

# NODEMAILER
MAILER_EMAIL = [dirección de correo electrónico desde la cual se enviarán los correos electrónicos a través de Nodemailer]
MAILER_PASSWORD = [contraseña de la dirección de correo electrónico utilizada para enviar correos electrónicos]

MAILER_HOST = [servidor SMTP que se utilizará para enviar correos electrónicos]
MAILER_PORT = [ puerto del servidor SMTP]
MAILER_SECURE = [boolean: conexión segura (TLS) para enviar correos electrónicos]
```

## Uso

Para ejecutar la API en un entorno de desarrollo, puede utilizar el siguiente comando:

```bash
npm run dev
```

Si desea compilar el código TypeScript y ejecutar la API en producción, ejecute los siguientes comandos:

```bash
npm run build
npm start
```

### API Routes

- [Auth](./docs/auth.md)
- [Category](./docs/category.md)
- [Product](./docs/product.md)
- [Person](./docs/person.md)
- [Product entry](./docs/productEntry.md)
- [Sale](./docs/sale.md)

## Tecnologías Principales

- Node.js
- Typescript
- Express.js
- Sequelize (ORM)
- MySQL
- JSON Web Tokens (JWT)
- Nodemailer

## Licencia

Este proyecto se distribuye bajo la Licencia MIT. Siéntase libre de usar, modificar y distribuir este código de acuerdo con los términos de la Licencia MIT.
