const express = require('express');
const Form = require('../models/form');
const router = express.Router();

// Create a new form
router.post('/form', async (req, res) => {
    const { title, fields } = req.body;
    const form = new Form({ title, fields });
    try {
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single form by ID
router.get('/form/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all forms
router.get('/forms', async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a form
router.put('/form/:id', async (req, res) => {
    const { title, fields } = req.body;
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, { title, fields }, { new: true });
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a form
router.delete('/form/:id', async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json({ message: 'Form deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
