import './Registro.css'
import logo from '../imgs/logo.png' 
import { paste } from '@testing-library/user-event/dist/paste'

export default function Registro(){
    return (
        <div id='registro'>
            
            <div id='div-login'>
                <h1>Cadastro</h1>
                <div id='circle'>
                <img id ="img" src = {logo} height = '100px'/>    
                </div>
                <input type={Text} placeholder = "E-mail"/>
                <input type={'password'} placeholder = "Senha"/>
                <input type={'password'} placeholder = "Confirmação de senha"/>
                <button id='btn'>Cadastrar</button>
            </div>
        </div>
    )
}