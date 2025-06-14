
# 📝 Task Master

**Task Master** es una API REST construida con **Node.js**, **Express** y **Sequelize** que permite a los usuarios gestionar tareas personales. Ofrece funcionalidades de registro, autenticación, gestión de tareas por usuario y un sistema seguro de acceso mediante tokens JWT.

Incluye despliegue en **Heroku** y uso de **CI/CD con GitHub Actions**.

Este repositorio es la resolución a la actividad Seguridad, pruebas y despliegue de la asignatura "Desarrollo Avanzado de Backend y APIs" del Máster de Desarrollo Web de la UEM.

---

## 🔐 Características

- **Autenticación JWT** con tokens que expiran a la hora.
- **Contraseñas cifradas** con Bcrypt y salt único.
- **Middleware de seguridad**: Helmet, sanitización, validación y prevención de XSS.
- **Pruebas unitarias e integración** con Jest y Supertest.
- **Docker + Docker Compose**: desarrollo y despliegue simplificado.
- **CI/CD con GitHub Actions**: ejecuta tests y despliega automáticamente en Heroku si todo está correcto.
- **Cobertura de tests > 80%**.

---

## 🛠 Instalación y ejecución

### ⚙️ Requisitos

- Docker y Docker Compose
- Node.js 18+ (si no usas contenedores)

### 🔧 Pasos

```bash
git clone https://github.com/anggierz/task-master.git
cd task-master
cp .env.example .env
docker-compose up --build
```

La API estará disponible en:  
📍 http://localhost:3000

### 🧪 Ejecutar tests

```bash
npm run test
```

---

## 📬 Endpoints disponibles

| Método | Ruta                  | Descripción                   |
|--------|------------------------|-------------------------------|
| POST   | `/api/users/register` | Registro de usuario           |
| POST   | `/api/users/login`    | Login y obtención de JWT      |
| GET    | `/api/tasks`          | Obtener todas las tareas      |
| POST   | `/api/tasks`          | Crear tarea                   |
| PUT    | `/api/tasks/:id`      | Actualizar tarea              |
| DELETE | `/api/tasks/:id`      | Eliminar tarea                |

---

## ☁️ Despliegue

### En Heroku

Se utiliza **JawsDB** como add-on para MySQL. Las credenciales se gestionan mediante variables de entorno (`.env`) o configuraciones del entorno en Heroku.

La conexión CI/CD se realiza con **GitHub Actions**. Solo se realiza `deploy` si los tests pasan.

---

## ♻️ Posibles mejoras futuras

- Mejorar la robustez de la aplicación: control de errores, refactorización...
- Mejorar los archivos relacionados con Docker