# ⚛️ VUKO.ai - Frontend

Este repositorio contiene la interfaz de usuario de VUKO.ai, una aplicación Fullstack desarrollada con React y Vite. La plataforma permite a los usuarios gestionar su perfil profesional y recibir asesoría estratégica mediante Inteligencia Artificial, conectándose de forma segura a una API REST externa.

## 📋 Requisitos Mínimos

Para cumplir con las pautas de evaluación de NEOLAND, esta parte del proyecto implementa:

- Consumo de API: Comunicación fluida con el backend desplegado en Render.
- Operaciones CRUD: Interfaz funcional para la creación, lectura, actualización y eliminación de datos.
- Gestión de Autenticación: Manejo de seguridad mediante JWT almacenado en localStorage.
- Enrutado Dinámico: Separación clara entre áreas públicas (Login/Registro) y privadas (Dashboard).
- Validaciones Visuales: Manejo de errores de red y de lógica mediante alertas interactivas.

## 🛠️Stack Tecnológico

React.js: Biblioteca principal para la construcción de interfaces de usuario.
Vite: Herramienta de construcción de última generación para un desarrollo ágil.
React Router Dom: Gestión de la navegación y protección de rutas en el cliente.
SweetAlert2: Implementación de diálogos y notificaciones profesionales para mejorar la UX.
CSS3: Estilos personalizados con enfoque en diseño responsivo.

## 🛠️ Instalación y Configuración

Sigue estos pasos para ejecutar el entorno de desarrollo local:

1. Instalar las dependencias:
npm install
2. Configurar variables de entorno:
Crea un archivo .env en la raíz de esta carpeta y añade la URL de tu API:
VITE_API_URL= <https://vuko-backend.onrender.com>
3. Iniciar el servidor de desarrollo:
npm run dev

## 📁  Estructura del Proyecto

src/pages: Vistas principales del flujo de usuario (Login, Register, Dashboard).

src/assets: Recursos estáticos, imágenes y estilos globales.

.env: Configuración de variables de entorno (Base URL de la API).

## 🚀 Despliegue

La aplicación está optimizada para ser desplegada en Netlify o Vercel. Al realizar el deploy, es fundamental configurar la variable de entorno VITE_API_URL en el panel de control de la plataforma para asegurar la conexión con el servidor de producción.
