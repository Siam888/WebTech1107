
// Models (or Repositories) (app/models/*.js)

// Purpose: Data access and structure.

// Define:
// Data shapes/schemas (e.g., with an ORM or validation schema)
// Persistence details (in-memory array for demos; DB for real apps)
// CRUD helpers that services use (e.g., findAll, findById, insert, update, delete)
// Mapping between DB records and domain objects if needed

// Avoid: Business rules, HTTP concerns, route/controller logic.



export default [
    { id: 1, title: "Dune" },
    { id: 2, title: "1984" },
    { id: 3, title: "Book" },
];
