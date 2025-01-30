const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    breed: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    tutor: { 
        type: String, 
        required: true 
    },
    contact: {
        whatsapp: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String, 
            required: true 
        },
    },
    health: { 
        type: String 
    },
    diet: { 
        type: String 
    },
    behavior: { 
        type: String 
    },
    care: { 
        type: String 
    },
});

module.exports = mongoose.model('Pet', petSchema);