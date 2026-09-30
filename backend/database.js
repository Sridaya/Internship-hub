const Database = require("better-sqlite3");

const db = new Database("users.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS password_resets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        expires_at TEXT NOT NULL
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS internships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        department TEXT,
        location TEXT,
        mode TEXT,
        stipend TEXT,
        duration TEXT,
        description TEXT,
        apply_link TEXT,
        source TEXT,
        verified INTEGER DEFAULT 0
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS applications(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         user_id INTEGER NOT NULL,
         internship_id INTEGER NOT NULL,
         applied_at TEXT DEFAULT CURRENT_TIMESTAMP,
         status TEXT DEFAULT 'Applied'
    )
`).run();

module.exports = db;