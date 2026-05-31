<div align="center">
  <img src="frontend/src/assets/svgs/banner.svg" alt="QuickTaskManager Banner" width="100%">
</div>

<br>

<div align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22d3ee.svg?style=for-the-badge" alt="License: MIT"></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-3-42b883.svg?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3"></a>
  <a href="https://www.fastify.io/"><img src="https://img.shields.io/badge/Fastify-latest-000000.svg?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify"></a>
  <a href="https://sqlite.org/"><img src="https://img.shields.io/badge/SQLite-3-003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite"></a>
</div>

<p align="center">
  <a href="#setup">Setup</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#api">API</a> •
  <a href="#brand">Brand</a> •
  <a href="#license">License</a>
</p>

---

## Setup

### Prerequisites

- Node.js v18+ and npm
- Git

### 1. Clone

```bash
git clone https://github.com/Ansari-Codes/task-manager-fastify-vue-js.git
cd task-manager-fastify-vue-js
```

### 2. Backend

```bash
cd backend
npm install
```

Start:

```bash
node src/server.js
```

API at `http://localhost:4000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App at `http://localhost:5173`.

### 4. Production Build

```bash
cd frontend
npm run build
```

Output in `frontend/dist/`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vue 3, Tailwind CSS v4, Vite, Vue Router |
| Backend | Fastify, bcrypt |
| Database | SQLite (better-sqlite3) |

---

## API

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | Register |
| `POST` | `/auth/login` | Login (cookie session) |
| `POST` | `/auth/logout` | Logout |
| `GET`  | `/auth/me` | Current user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/tasks/create` | Create task |
| `GET`  | `/tasks/all` | Get all user tasks |
| `GET`  | `/tasks/get/:id` | Get single task |
| `PUT`  | `/tasks/edit/:id` | Update task |
| `DELETE` | `/tasks/del/:id` | Delete permanently |
| `DELETE` | `/tasks/trash/:id` | Move to trash |
| `GET`  | `/tasks/filter?...` | Filter & search |

### Stats

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/stats/stats` | Software-wide statistics (public) |

---

## Brand

<p align="center">
  <img src="frontend/src/assets/svgs/logo.svg" alt="QTM Logo" width="80">
</p>

**QuickTaskManager** and **QTM** are the trademarks and brand identifiers for this project.

The QTM logo is a hexagonal shape representing structure and efficiency, paired with a checkmark symbolizing task completion. The color palette uses cyan (`#22d3ee`) for speed and indigo (`#6366f1`) for reliability.

The brand name, logo, and associated visual assets are the intellectual property of the project author and are protected under the terms of the MIT License.

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE).

---

<div align="center">

  Built by <a href="https://github.com/Ansari-Codes">Muhammad Abu Bakar Siddique Ansari</a>

</div>
