const mongoose = require('mongoose')

const User = mongoose.model('User', {
    email: String,
    senha: String,
    telefone: String,
    jogadores_favoritos: String,
})

module.exports = User