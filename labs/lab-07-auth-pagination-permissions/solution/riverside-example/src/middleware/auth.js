/*
  src/middleware/auth.js — Riverside FC example (Session 27)

  AUTHENTICATION: prove WHO the caller is. Runs in front of protected routes,
  verifies the JWT, and attaches the decoded payload to req.user. It does NOT
  decide what the caller may do — that is AUTHORIZATION (requireAdmin + the
  ownership checks in the controllers).

  JWT_SECRET is required in the environment. The check script sets a local
  test-only value; a running server must receive its own secret.
*/

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is required");

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET); // { sub, role, iat, exp }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { auth, JWT_SECRET };
