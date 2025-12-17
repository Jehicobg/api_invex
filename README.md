# Invex API ![In Development](https://img.shields.io/badge/status-in%20development-yellow)

API para manejar **productos, variantes y atributos** con **soft delete**, validación con **Zod** y manejo de errores con **AppError**.

## Tecnologías

- Node.js + Express  
- Prisma ORM  
- PostgreSQL (Neon) / SQLite  
- Zod  

---

## Instalación

```bash
git clone https://github.com/Jehicobg/api_invex.git
cd api_invex
npm install
```

- Se recomienda tener Docker para levantar la base de datos de desarrollo.

Variables de entorno
```bash
PORT=3000
DATABASE_URL="postgresql://user:password@host:port/dbname"
ACCESS_EXPIRES=minutes
REFRESH_EXPIRES=days
JWT_SECRET=yoursecret
```

## Prisma

Se deben ejecutar lo siguiente comandos de prisma antes de inciar el repo

```bash
# Generar client
npx prisma generate

# Crear migración inicial
npx prisma migrate dev --name init

# Aplicar migraciones en producción
npx prisma migrate deploy

```

##### Ejecutar API

```bash
npm run dev
```

Por defecto, la API correrá en http://localhost:3000.

## Endpoints principales

| Método | Ruta          | Descripción                     |
| ------ | ------------- | ------------------------------- |
| GET    | /products     | Listar productos                |
| POST   | /products     | Crear producto + variantes      |
| PATCH  | /products/:id | Actualizar producto + variantes |
| DELETE | /products/:id | Soft delete (active = false)    |

