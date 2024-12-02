const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

router.get('/add', (req, res) => {
    res.render('add-task');
});

router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    await Task.create({ title, description });
    res.redirect('/tasks');
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    await Task.findByIdAndUpdate(id, { status });
    res.redirect('/tasks');
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
});

module.exports = router;
