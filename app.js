const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Rotas
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);

// Exportar a instância do app
module.exports = app;