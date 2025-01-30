const express = require('express');
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);

// Rota para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para servir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para servir a página de edição
app.get('/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit.html'));
});

// Exportar a instância do app
module.exports = app;