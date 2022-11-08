const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    telefone: String,
    jogadores_favoritos: Array,
})

module.exports = User