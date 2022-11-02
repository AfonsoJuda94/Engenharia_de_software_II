/* Imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Configurando o express com Json como padrão
app.use(express.json())

//Models
const User = require('./models/User')

//Public Route
app.get('/', (req, res) =>{
    res.status(200).json({ msg: 'Bem vindo a nossa API!'})
})

//Register User - Registro de usuário
app.post('/auth/register', async(req, res) => {

    const {email, senha, confirmSenha, telefone, jogadores_favoritos} = req.body

    //validations 
    if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!'})
    }
   
    if(!senha) {
        return res.status(422).json({ msg: 'A senha é obrigatória!'})
    }

    if(senha !== confirmSenha) {
        return res.status(422).json({ msg: 'As senhas não conferem!'})
    }

    //Check if user exists, verificação se já existe email cadastrado 
    //.findOne é equivalente a uma query where do SQL
    const userExists = await User.findOne({ email: email})

    if(userExists) {
        return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' })
    }
    
    //Create password - criando a senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    //Create user - Criar usuário
    const user = new User({
        email, 
        /* Salvando no banco a senha criptografada */
        senha: passwordHash, 
        telefone, 
        jogadores_favoritos,
    })

    try {

        await user.save()
        res
            .status(201)
            .json({ msg: 'Usuário criado com sucesso!'})

    } catch(error) {
        console.log(error)
        res
            .status(500)
            .json({
                msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
            })
    }
})

//Credencials de conexão ao banco 
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

/* Conectando no banco Mongodb */
mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.h4ghz5e.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.PORT || 3000);
        console.log('Conectou ao banco!');
    })
    .catch(err => console.log(err))