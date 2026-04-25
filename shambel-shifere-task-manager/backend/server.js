const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "task_manager"
});

db.connect(err => {
    if (err) {
        process.exit(1);
    }
});

app.get('/tasks', (req, res) => {
    const query = "SELECT * FROM tasks ORDER BY created_at DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const query = "INSERT INTO tasks (title, description) VALUES (?, ?)";
    db.query(query, [title, description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, title, description, status: 'pending' });
    });
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Updated" });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Deleted" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});