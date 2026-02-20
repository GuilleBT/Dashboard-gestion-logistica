# 📦 Nexus Logistics - Sistema de Gestión de Inventario

Aplicación web Single Page Application (SPA) desarrollada con **Angular 21** para la gestión logística avanzada, autenticación de operarios y control de stock en tiempo real. 

Proyecto Final para el Grado Superior en Desarrollo Web.

## 🚀 Tecnologías Principales
* **Frontend:** Angular 21 (Standalone Components, Signals, Reactive Forms).
* **UI/UX:** PrimeNG v18 (DataGrid, Modals).
* **Backend & Base de Datos:** Supabase (PostgreSQL, Autenticación JWT, BaaS).
* **Arquitectura:** Lazy Loading, Guards (Auth & Role), Interceptors.

## ⚙️ Requisitos e Instalación

1. Clonar el repositorio.
2. Abrir la terminal en el directorio del proyecto.
3. Instalar las dependencias de Node:
   ```bash
   npm install
   Ejecutar el servidor de desarrollo:

Bash
ng serve -o
El proyecto se abrirá automáticamente en http://localhost:4200/.

🔐 Variables de Entorno (environment.ts)
Para que la aplicación se comunique con el backend, es necesario configurar las variables de Supabase en src/environments/environment.ts:

TypeScript
export const environment = {
  production: false,
  supabase: {
    url: 'https://iesrwgzrzleivoyahmdt.supabase.co',
    publicKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3J3Z3pyemxlaXZveWFobWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzQ0MTksImV4cCI6MjA4NzAxMDQxOX0.aOPv58WXSY0zWIvpm6bATHkWdXnxEF43nEspJAQr7hk'
  }
};
👥 Cuentas de Prueba (Roles)
El sistema implementa un Control de Acceso Basado en Roles (RBAC). Usa estas credenciales para probar las funcionalidades:

Administrador (Acceso total: Crear, Leer, Editar y Borrar):

Email: admin@nexus.com

Contraseña: [123456]

Operario Básico (Solo Crear y Leer):

Email: [guillermobeltrantabares@gmail.com]

Contraseña: [123456]