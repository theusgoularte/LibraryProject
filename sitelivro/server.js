const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'Library'
});

db.connect(err => {
    if (err) { console.error('Database connection failed:', err.message); return; }
    console.log('Connected to MySQL Database!');
});

app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/books', (req, res) => {
    const { title, author, status_reading, rate } = req.body;
    const sql = 'INSERT INTO books (title, author, status_reading, rate) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, author, status_reading, rate], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).send('Book saved successfully!');
    });
});

app.delete('/books/:id', (req, res) => {
    db.query('DELETE FROM books WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send('Book removed!');
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));