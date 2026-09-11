# Syndmarq

## Plataforma Web de Portafolio Profesional

Syndmarq es una plataforma web orientada a profesionales, estudiantes y freelancers que permite crear, administrar y compartir un portafolio profesional mediante un enlace público.

El proyecto se encuentra actualmente en desarrollo como parte de mis Residencias Profesionales.

---

## Estado del proyecto

**Proyecto en desarrollo**

Actualmente se han implementado los módulos principales de la plataforma y se continúa trabajando en nuevas funcionalidades.

### Funcionalidades implementadas

- Registro de usuarios
- Inicio y cierre de sesión
- Autenticación mediante JWT
- Dashboard de usuario
- Edición del perfil profesional
- Gestión de proyectos
- Creación, edición y eliminación de proyectos
- Gestión de enlaces profesionales
- Ordenamiento de enlaces
- Portafolio público mediante nombre de usuario
- Personalización visual del portafolio
- Diferentes temas de diseño
- Registro de visitas al portafolio
- Estadísticas de visitas
- Gráfica de visitas de los últimos 7 días

### Funcionalidades en desarrollo

- Configuración de cuenta
- Generación y uso de código QR
- Opciones para compartir el portafolio
- Carga y almacenamiento de imágenes
- Panel administrativo
- Mejoras de SEO
- Validaciones y seguridad para producción

---

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- TypeScript
- JWT
- bcrypt

### Base de datos

- PostgreSQL

### Herramientas de desarrollo

- Visual Studio Code
- Git
- GitHub
- PostgreSQL / psql

---

## Estructura general

```text
Syndmarq/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── db.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md