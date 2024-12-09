const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [];

// Create a student
app.post('/students', (req, res) => {
    students.push(req.body);
    res.status(201).send(req.body);
});

// Get all students
app.get('/students', (req, res) => res.send(students));

// Get a student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    student ? res.send(student) : res.status(404).send('Student not found');
});

// Update a student by ID
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        Object.assign(student, req.body);
        res.send(student);
    } else {
        res.status(404).send('Student not found');
    }
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    index !== -1 ? (students.splice(index, 1), res.sendStatus(204)) : res.status(404).send('Student not found');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
