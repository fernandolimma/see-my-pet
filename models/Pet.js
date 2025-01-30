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
    address: { 
        type: String, 
        required: true 
    },
    whatsapp: { 
        type: String, 
        required: true 
    },
    health: { 
        type: String,
        required: true 
    },
    diet: { 
        type: String,
        required: true 
    },
    behavior: { 
        type: String,
        required: true 
    },
    care: { 
        type: String,
        required: true 
    },
});

module.exports = mongoose.model('Pet', petSchema);