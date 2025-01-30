const Pet = require('../models/Pet');
const qrcode = require('qrcode');

exports.getPet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPet = async (req, res) => {
    const { name, breed, age, tutor, contact, health, diet, behavior, care } = req.body;
    try {
        const pet = new Pet({ name, breed, age, tutor, contact, health, diet, behavior, care });
        const savedPet = await pet.save();
        res.status(201).json(savedPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pet deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.generateViewQRCode = async (req, res) => {
    const petId = req.params.id;
    const viewUrl = `http://localhost:5000/api/pets/${petId}`;

    try {
        const qrCode = await qrcode.toDataURL(viewUrl);
        res.json({ qrCode });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.generateEditQRCode = async (req, res) => {
    const petId = req.params.id;
    const editUrl = `http://localhost:5000/edit/${petId}`; // URL da página de edição

    try {
        const qrCode = await qrcode.toDataURL(editUrl);
        res.json({ qrCode });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};