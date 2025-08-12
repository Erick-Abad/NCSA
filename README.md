# NCSA Starter (Node + Vercel + MySQL Aiven)

Proyecto base para desplegar en Vercel (serverless) con frontend Bootstrap y backend Node (Express),
conectado a MySQL administrado (Aiven).

## 1) Requisitos
- Cuenta en Vercel y GitHub
- Instancia MySQL en Aiven (host/port/user/password/CA)
- Tablas creadas con `ncsa_schema_v1.sql` (ya lo hiciste)

## 2) Variables de entorno en Vercel
Configurar en Settings → Environment Variables:
- DATABASE_HOST
- DATABASE_PORT
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_NAME (ncsa)
- DATABASE_SSL=true
- DATABASE_CA (pega todo el CA .pem)

## 3) Deploy
- Sube este proyecto a GitHub
- En Vercel: Add New Project → Importa el repo → Deploy
- Probar:
  - /api/health
  - /api/courses

## 4) Estructura
- /api/index.js → Express como función serverless
- /src/db.js → conexión MySQL (pool + SSL)
- /src/routes.js → endpoints (health, courses)
- /public → frontend con Bootstrap

## 5) Qué ya está listo (avance #1)
- ✅ Base de datos NCSA en Aiven (esquema y datos demo)
- ✅ Proyecto Node serverless listo para Vercel
- ✅ Frontend con Bootstrap y listado de cursos
- ✅ Endpoint GET/POST /api/courses conectado a MySQL

## 6) Qué falta para el MVP (siguiente)
- Autenticación básica (login) → más adelante SSO
- Módulo usuarios y roles (student/admin/seller)
- Sección Tienda (productos, cotizaciones)
- Conexión con Moodle (Web Services)
- Hardening de seguridad (validación inputs, rate-limit, CORS si aplica)

## 7) Desarrollo local (opcional)
- `npm i`
- `.env` basado en `.env.example` (usa las credenciales de Aiven)
- `npm run dev` (vercel dev)
- Abre http://localhost:3000
