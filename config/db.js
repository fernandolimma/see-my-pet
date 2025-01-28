const mongoose = require('mongoose');

// Configuração global do Mongoose
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/see-my-pet');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;