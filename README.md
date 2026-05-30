# Fullstack Todo App — .NET + React + SQL Server

A full-stack todo application with CRUD operations, built to demonstrate a modern web stack with a REST API, React frontend, and SQL Server persistence.

## Features

- Create, read, update, and delete todos
- ASP.NET Core Web API with Entity Framework Core
- React + TypeScript + Vite frontend
- Redux Toolkit for state management
- Tailwind CSS for styling
- Swagger UI in development

## Tech stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Backend  | ASP.NET Core 8, EF Core, SQL Server             |
| Frontend | React 19, TypeScript, Vite, Redux Toolkit       |
| Styling  | Tailwind CSS 4                                  |
| API docs | Swagger / OpenAPI                               |

## Project structure

```
fullstack-dotnet-react-sql/
├── backend/          # ASP.NET Core Web API
├── frontend/         # React + Vite app
└── docker-compose.yml
```

## Getting started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (see `frontend/.nvmrc`)
- [Docker](https://www.docker.com/) (for SQL Server)

### 1. Start SQL Server

```bash
docker compose up -d
```

### 2. Configure the backend

Copy the example settings and adjust if needed:

```bash
cp backend/appsettings.example.json backend/appsettings.json
```

Apply migrations and run the API:

```bash
cd backend
dotnet ef database update
dotnet run
```

API runs at `http://localhost:5200`. Swagger UI: `http://localhost:5200/swagger`.

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## API endpoints

| Method | Route              | Description   |
| ------ | ------------------ | ------------- |
| GET    | `/api/todo`        | List todos    |
| GET    | `/api/todo/{id}`   | Get one todo  |
| POST   | `/api/todo`        | Create todo   |
| PUT    | `/api/todo/{id}`   | Update todo   |
| DELETE | `/api/todo/{id}`   | Delete todo   |

## Author

**Taraneh H** — [GitHub @programmingskills-2022](https://github.com/programmingskills-2022)
