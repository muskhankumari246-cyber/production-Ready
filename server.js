import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"]
    }
}));

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, error: "Too many requests, please try again later." }
});
app.use('/api/', limiter);

const db = new sqlite3.Database('./internships.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite persistent database securely.');
        db.run(`CREATE TABLE IF NOT EXISTS internships (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            company TEXT,
            domain TEXT,
            location TEXT,
            stipend TEXT
        )`);
    }
});

app.get('/api/internships', (req, res) => {
    db.all(`SELECT * FROM internships`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({
            success: true,
            count: rows.length,
            data: rows
        });
    });
});

app.post('/api/internships', [
    body('title').trim().notEmpty().escape(),
    body('company').trim().notEmpty().escape(),
    body('domain').trim().notEmpty().escape(),
    body('location').trim().notEmpty().escape(),
    body('stipend').trim().notEmpty().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, company, domain, location, stipend } = req.body;
    const query = `INSERT INTO internships (title, company, domain, location, stipend) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [title, company, domain, location, stipend], function(err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, id: this.lastID });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Secure Server running smoothly on http://localhost:${PORT}`);
});