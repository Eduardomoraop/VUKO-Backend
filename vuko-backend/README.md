# 🛸 VUKO.ai - Backend | Intelligence Engine (Backend)

Bienvenido al núcleo de VUKO.ai, una API RESTful diseñada para gestionar mentorías profesionales personalizadas mediante el uso de Inteligencia Artificial. Este sistema actúa como el motor principal de la plataforma, exponiendo endpoints seguros para el consumo del frontend.

## 📋 Requisitos Mínimos

- Node.js (v16 o superior)
- Cuenta en MongoDB Atlas
- API Key de Google Gemini (para el servicio de IA)

## 🛠️Stack Tecnológico

Entorno de ejecución: Node.js
Framework: Express.js
Base de datos: MongoDB Atlas (Cloud)
Modelado de datos: Mongoose
Seguridad: JWT (JSON Web Tokens) & Bcrypt
Servicio IA: Google Gemini 1.5 Flash

## 🛠️ Instalación y Configuración

1. Clona el repositorio:
   `git clone <url-de-tu-repo>`
2. Instala las dependencias:
   `npm install`
3. Configura las variables de entorno:
   - Crea un archivo `.env` basado en el `.env.example`.
   - Agrega tus credenciales de MongoDB, JWT y Google API.

## 🚀 Comandos de ejecución

Modo Desarrollo: npm run dev (utiliza Nodemon).
Modo Producción: npm start (para despliegue en Render).

## 📡 Endpoints de la API

POST /api/users/register — Crea un nuevo perfil y lo vincula con la IA.
POST /api/users/login — Autenticación y entrega de credenciales.
GET /api/users/advice — Consulta de consejo personalizado (Requiere Token).
PUT /api/users/update — Actualización de información profesional (Requiere Token).

## 🌍 Deploy

El servidor se encuentra desplegado en: [(https://vuko-backend.onrender.com)]
