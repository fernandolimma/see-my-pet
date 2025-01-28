const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const auth = require('../middleware/auth');

router.get('/:id', petController.getPet);
router.post('/', auth, petController.createPet);
router.put('/:id', auth, petController.updatePet);
router.delete('/:id', auth, petController.deletePet);

// Novas rotas para gerar QR Codes
router.get('/:id/qr/view', petController.generateViewQRCode);
router.get('/:id/qr/edit', auth, petController.generateEditQRCode);

module.exports = router;