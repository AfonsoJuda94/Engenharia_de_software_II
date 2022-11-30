//Register User - Registro de usuário
app.post('/auth/register', async(req, res) => {

    const {email, senha, confirmSenha, telefone, jogadores_favoritos} = req.body
    const {name, password, confirmPassword} = req.body

    const mongoose = require('mongoose')

    const User = mongoose.model('User', {
        name: String,
        email: String,
        senha: String,
        password: String,   
        telefone: String,
        jogadores_favoritos: String,
        jogadores_favoritos: Array,
    })


    //validations
    if(!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!'})
    }

    //validations 
    if(!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!'})
    }

    if(!senha) {
    if(!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória!'})
    }

    if(senha !== confirmSenha) {
    if(!telefone) {
        return res.status(422).json({ msg: 'O telefone é obrigatória!'})
    }

    if(password !== confirmPassword) {
        return res.status(422).json({ msg: 'As senhas não conferem!'})
    }
    }}
 app.post('/auth/register', async(req, res)) => {
    const userExists = await User.findOne({ email: email})

    if(userExists) {
        return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' })
       return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' })
    }


    //Create password - criando a senha
    //Create password - criando a senha croptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)
    

    //Create user - Criar usuário
    const user = new User('',{
        name,
        email, 
        /* Salvando no banco a senha criptografada */
        senha: passwordHash, 
        telefone, 
        password: passwordHash,
        telefone,
        jogadores_favoritos,
        jogadores_favoritos
    })