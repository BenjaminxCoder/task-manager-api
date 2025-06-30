# 📚 Learning Log: Phase 1 — Task Manager API Setup

## 🎯 Goal
Set up a secure, modular Node.js backend connected to a PostgreSQL database, with a working `/health` route and a tested DB connection.

---

## 🗂️ Folder & File Overview

### `package.json`
- Initialized using `npm init -y`.
- Added `"type": "module"` to enable ES Module syntax (`import/export`).
- Script added: `"dev": "nodemon server.js"` for auto-reloading during development.

### `.env`
Securely stores environment variables:
```env
DB_USER=taskuser
DB_PASSWORD=secret123
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanager
```

### `.gitignore`
Used to keep untracked files like `node_modules` and `.env` out of Git:

```bash
node_modules/
.env
```

> 🔐 Prevents committing sensitive data and large dependencies to version control.

---

### `models/db.js`

**Purpose:** Connect to PostgreSQL using a connection pool.

**Key Concepts:**
- Used `pg` package’s `Pool` class.
- Loaded `.env` variables with `dotenv.config()`.
- Created and exported a reusable DB pool instance.

**Code Summary (no real code shown):**
- Import `Pool` and `dotenv`
- Call `dotenv.config()`
- Create `new Pool({...})` with credentials from `process.env`
- `export default pool;` for reuse across app

---

### `server.js`

**Purpose:** Start Express server, test DB, and expose a `/health` route.

**Key Concepts:**
- Imported Express and the exported DB pool.
- Defined and tested a `/health` route (`GET /health`) that returns JSON: `{ status: "OK" }`
- Ran a test query: `SELECT NOW()` to confirm PostgreSQL connection.
- Logged success or error in console.
- Server listens on port `3000`.

**Developer Tip:**
- Used `pool.query(...)` directly without `pool.connect()` — connection pooling handles it.
- Avoided `con.end()` because `pool` is long-lived and manages its own cleanup.

---

### 🧠 What I Learned

1. **Environment Security**
   - `.env` prevents leaking secrets like passwords or API keys.
   - `dotenv.config()` must be called at the top before accessing `process.env`.

2. **PostgreSQL Setup & CLI**
   - Used `psql` to create a DB (`taskmanager`) and a user (`taskuser`).
   - Assigned ownership and permissions.
   - Verified users using `\du` and databases with `\l`.

3. **Connection Pooling**
   - Pooling prevents DB overload by reusing active connections.
   - More scalable than opening a new connection per query.
   - Helps avoid bricking or rate-limiting by the DB engine.

4. **Express Server Setup**
   - Basic route creation and listening on a port.
   - Middleware (`express.json()`) will be added later.
   - `/health` route useful for uptime checks, Docker, and CI/CD.

5. **Modular File Structure**
   - `models/` for DB access logic
   - `server.js` as the entry point and central hub
   - Future: `routes/`, `controllers/`, and `middleware/` for scalable design
   - Compared file structure to banking accounts and car assembly — each part does its job.