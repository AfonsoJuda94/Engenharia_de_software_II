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

//Private Route Get dados do usuário por id
app.get('/users/:id', checkToken, async (req, res) =>{
    
    const id = req.params.id

    //Check if user exist || Checar se o usuário existe
    //Pegando as informações por id, menos o password por questão de segurança
    const user = await User.findById(id, '-password')

    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }

    /* Retornando os dados do usuário, menos o password por segurança */
    res.status(200).json({ user })
})

//Private Route Get dados do usuário por email
app.get('/usersEmail/:email', checkToken, async (req, res) =>{
    
    const email = req.params.email

    //Check if user exist || Checar se o usuário existe
    //Pegando as informações por usuário, menos o password por questão de segurança
    const user = await User.find({email: email}, '-password')

    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }

    /* Retornando os dados do usuário, menos o password por segurança */
    res.status(200).json({ user })
})

//Private Route adição de favorito
app.put('/users/:email', checkToken, async (req, res) =>{
    
    const email = req.params.email
    const favorito = req.body
    //Pegando as informações 
    const jogadores = await User.find( {email: email}, 'jogadores_favoritos')
    const jogadoresAtualizado = jogadores[0].jogadores_favoritos
    jogadoresAtualizado.push(favorito)

    /* Lógica para ser implementada para adição de jogador favoritor */
    /*Selecionar o campo array jogadores_favoritos e salvar em uma variável, pegar esse array e adicionar 
    o novo favorito com .push, com o novo array é so executar o updateOne*/

    /* Atualizando o campo */
    const user = await User.updateOne({"email": email}, {$set: {"jogadores_favoritos": jogadoresAtualizado }})

    if(!user) {
        return res.status(404).json({ msg: 'Falha na conexão' })
    }

    /* Retornando os dados do usuário editado, menos o password por segurança */
    res.status(200).json({ msg: 'Jogador adicionado com sucesso' })
})

//Verificação de token
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    /* Pegando o token do Header */
    const token = authHeader && authHeader.split(' ')[1]

    /* Caso o usuário não tenha token */
    if(!token) {
        return res.status(401).json({ msg: 'Acesso negado!'})
    }

    /* Validando se o token é válido */
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        /* Caso a verificação do token passar é liberado o acesso a rota */ 
        next()

    } catch(error) {
        res.status(400).json({msg: "Token inválido!"})
    }
}

//Register User - Registro de usuário
app.post('/auth/register', async(req, res) => {

    const { name, email, password, confirmPassword, telefone, jogadores_favoritos  } = req.body

    //validations
    if(!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!'})
    }

    if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!'})
    }
   
    if(!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!'})
    }

    if(!telefone) {
        return res.status(422).json({ msg: 'O telefone é obrigatória!'})
    }

    if(password !== confirmPassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!'})
    }

    //Check if user exists, verificação se já existe email cadastrado 
    //.findOne é equivalente a uma query where do SQL
    const userExists = await User.findOne({ email: email})

    if(userExists) {
       return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' })
    }
    
    //Create password - criando a senha croptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create user - Criar usuário
    const user = new User({
        name,
        email, 
        /* Salvando no banco a senha criptografada */
        password: passwordHash,
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

//Login User
app.post("/auth/login", async (req, res) => {

    const {email, password}  = req.body

     //validations
     if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!'})
    }
    if(!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!'})
    }

    //Check if user exists || Checar se o usuário existe
    //.findOne é equivalente a uma query where do SQL
    const user = await User.findOne({ email: email})

    if(!user) {
       return res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    //Check if password match || Verificar se a senha confere
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida' })
    }
    
    try {
        
        const secret = process.env.SECRET
        
        const token = jwt.sign({
                id: user._id,
            },
            secret,
        )

        res.status(200).json({msg: "Autenticação realizada com sucesso", token })

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