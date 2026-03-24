# Node.js Learning

A hands-on learning repository that walks through core Node.js concepts — from basic module usage and file-system operations to building HTTP servers with Express.js.

---

## Repository Structure

```
Node-Js-learning/
├── HelloWorld/          # Core Node.js built-in modules
│   ├── Hello.js         # Entry point – module imports, crypto module
│   ├── math.js          # CommonJS module exports example
│   ├── file.js          # File-system (fs) and OS (os) module operations
│   ├── contacts.txt     # Sample data file read by file.js
│   ├── test.txt         # Output file written/appended by file.js
│   └── backup.txt       # Copy of test.txt created by file.js
├── server/              # HTTP server and Express.js
│   ├── index.js         # Server code – raw http module → Express.js
│   ├── log.txt          # Request log written by the server
│   ├── package.json     # server-specific dependencies (Express)
│   └── package-lock.json
├── package.json         # Root dependencies and npm start script
└── package-lock.json
```

---

## Key Technologies

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | Any LTS | Runtime environment |
| **Express.js** | ^5.2.1 | HTTP server framework |
| **fs** (built-in) | — | File-system operations (sync & async) |
| **os** (built-in) | — | OS information (e.g. CPU count) |
| **http** (built-in) | — | Low-level HTTP server |
| **url** (built-in) | — | URL parsing |
| **crypto** (built-in) | — | Cryptographic utilities |

---

## Code Organisation

### `HelloWorld/` — Node.js Fundamentals

#### `math.js` — CommonJS Modules
Demonstrates the two ways to export values from a Node.js module:

```js
// Named object export
module.exports = { add, sub };

// Shorthand (alternative shown in comments)
exports.add = (a, b) => a + b;
```

#### `Hello.js` — Module Imports
Shows how to `require` a local module and a built-in module:

```js
const math   = require('./math');   // local module
const crypto = require('crypto');   // built-in module
```

#### `file.js` — File-System & OS Modules
Covers the full `fs` API surface with side-by-side sync/async comparisons:

| Operation | Sync (blocking) | Async (non-blocking) |
|---|---|---|
| Write file | `fs.writeFileSync` | `fs.writeFile` |
| Read file | `fs.readFileSync` | `fs.readFile` |
| Append to file | `fs.appendFileSync` | — |
| Copy file | `fs.cpSync` | — |
| Delete file | `fs.unlinkSync` | — |
| File stats | `fs.statSync` | — |
| Create directory | `fs.mkdirSync` | — |

It also uses `os.cpus().length` to print the number of CPU threads available to Node.js's default thread pool.

---

### `server/` — HTTP Servers

#### `index.js` — From Raw HTTP to Express.js
The file is structured as a progression through two approaches (the raw `http` approach is preserved in comments for reference):

**Stage 1 – Raw `http` module (commented out)**
```js
const http = require('http');
const server = http.createServer((req, res) => {
    res.end("Hello from server!");
});
server.listen(8000);
```

**Stage 2 – Request logging with `fs` + URL routing (commented out)**
Logs every incoming request to `log.txt` and routes `/`, `/about`, and `/contact` paths using `url.parse`.

**Stage 3 – Express.js (active code)**
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send("hello from home page"));
app.get('/about', (req, res) => res.send("hello from about page " + req.query.name));

app.listen(8000, () => console.log("Server started"));
```

The `/about` route reads a `name` query parameter (e.g. `GET /about?name=Anshu`), demonstrating `req.query` access in Express.

---

## Running the Code

**Prerequisites:** Node.js installed.

### HelloWorld scripts

```bash
# Install root dependencies
npm install

# Run the main Hello.js entry point
npm start
# equivalent: node HelloWorld/Hello.js

# Run the file-system demo (writes/appends to test.txt and backup.txt)
node HelloWorld/file.js
```

### Express server

```bash
cd server
npm install
npm start
# Server listens on http://localhost:8000
```

Then open:
- `http://localhost:8000/` → Home page
- `http://localhost:8000/about?name=Anshu` → About page with query param

---

## Concepts Covered

1. **CommonJS module system** — `require`, `module.exports`, `exports`
2. **Built-in modules** — `fs`, `os`, `http`, `url`, `crypto`
3. **Synchronous vs asynchronous I/O** — blocking vs non-blocking file operations
4. **Node.js thread pool** — default size of 4, configurable up to the number of CPU cores
5. **HTTP server from scratch** — using the `http` module
6. **Request routing and logging** — manual URL parsing with `url.parse`
7. **Express.js basics** — routing, query parameters, `res.send`
8. **npm semantic versioning** — understanding `^` (caret) ranges in `package.json`
