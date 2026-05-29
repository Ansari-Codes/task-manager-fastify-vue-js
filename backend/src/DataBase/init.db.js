const Database = require('better-sqlite3')

const db = new Database('database.db')
db.prepare(`PRAGMA foreign_keys = ON;`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
)
`).run()

db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    priority TEXT DEFAULT 'medium'
        CHECK(priority IN ('optional','low','medium','high','critical')),
    status TEXT DEFAULT 'pending'
        CHECK(status IN ('pending','in_progress','done','cancelled','trashed')),
    deadline TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`).run();

const tables = {
    Users: 'users',
    Tasks: 'tasks'
}

module.exports = {
    db,
    tables
}