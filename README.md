# TaskManager - Modern Todo Application

A modern, full-stack todo application built with React, Express.js, and PostgreSQL, featuring a clean UI and real-time updates.

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │  ←──►   │  Express Backend│  ←──►   │   PostgreSQL   │
│    (Client)     │   HTTP  │    (Server)     │ Drizzle │   Database     │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        ↓                           ↓                          ↓
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Components    │         │     Routes      │         │    Schema       │
│ - TodoList     │         │ - GET /todos    │         │ - todos table   │
│ - TodoItem     │         │ - POST /todo    │         │   - id          │
│ - AddTodo      │         │ - PATCH /todo   │         │   - title       │
│ - TodoFilters  │         │ - DELETE /todo  │         │   - completed   │
└─────────────────┘         └─────────────────┘         │   - order      │
                                                        └─────────────────┘
```

## Tech Stack

### Frontend
- React with TypeScript
- TanStack Query for data fetching
- Shadcn UI components
- Tailwind CSS for styling
- Zustand for state management
- Wouter for routing

### Backend
- Express.js server
- PostgreSQL database
- Drizzle ORM
- Zod for validation

## Features

- ✨ Create, read, update, and delete todos
- 🔄 Real-time updates with optimistic UI
- 🎯 Filter todos by status (all/active/completed)
- 📱 Responsive design
- 🎨 Modern UI with animations
- ⌨️ Keyboard accessibility
- 🔄 Drag and drop reordering

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/devXpraAddy/TaskManager.git
cd TaskManager
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
DATABASE_URL=your_postgresql_database_url
```

4. Push the database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## API Documentation

### Endpoints

#### GET /api/todos
Returns all todos ordered by their position.

Response:
```typescript
{
  id: number;
  title: string;
  completed: boolean;
  order: number;
}[]
```

#### POST /api/todos
Create a new todo.

Request body:
```typescript
{
  title: string;
  completed?: boolean;
  order: number;
}
```

#### PATCH /api/todos/:id
Update an existing todo.

Request body:
```typescript
{
  title?: string;
  completed?: boolean;
  order?: number;
}
```

#### DELETE /api/todos/:id
Delete a todo.

#### POST /api/todos/reorder
Reorder todos.

Request body:
```typescript
{
  orderedIds: number[];
}
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and stores
│   │   └── pages/        # Page components
├── server/                # Backend Express application
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── db.ts            # Database connection
└── shared/               # Shared TypeScript types
    └── schema.ts        # Database schema and types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
