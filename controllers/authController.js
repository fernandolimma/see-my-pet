require('dotenv').config(); // Carrega as variáveis de ambiente

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Tutor = require('../models/Tutor');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingTutor = await Tutor.findOne({ email });
        if (existingTutor) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        const tutor = new Tutor({ name, email, password });
        await tutor.save();

        const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const tutor = await Tutor.findOne({ email });
        if (!tutor) {
            return res.status(400).json({ message: 'Email inválido! Tente novamente.' });
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
};