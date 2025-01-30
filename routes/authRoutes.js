const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');
const jwt = require('jsonwebtoken');

// Rota de Registro
router.post('/register', async (req, res) => {
    const { name, email, password, createdAt } = req.body;
    try {
        const tutor = new Tutor({ name, email, password, createdAt });
        await tutor.save();
        res.status(201).json({ message: 'Tutor registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const tutor = await Tutor.findOne({ email });
        if (!tutor) {
            return res.status(400).json({ message: 'Email invalido! Tente novamente.' });
        }

        const isMatch = await tutor.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta! Tente novamente.' });
        }

        const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;