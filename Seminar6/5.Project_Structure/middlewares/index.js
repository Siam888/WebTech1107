// Middleware is a function that runs before your route handler.
// It receives (req, res, next) and can do tasks like logging, auth, validation, or error handling.
// It can be attached globally (app.use) or to a specific router/route
// If you want a middleware to run before a route handler, register it before that route (or attach it on the route itself).

export function logRequest(req, _res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next(); // hand off to the next middleware/route
}
