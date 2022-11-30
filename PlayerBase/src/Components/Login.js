import './Login.css'
import logo from '../imgs/logo.png' 
import { Link } from 'react-router-dom'

export default function Login(){
    return(
        <view>
            <div id='login'>
            <div id='div-login'>
            <h1>Login</h1>
            <div id='circle'>
            <img id ="img" src = {logo} height = '100px'/>    
            </div>
            
            <input type={Text} placeholder ="e-mail"/>
            <input type={'password'} placeholder='senha'/>
            <button id='btn'>Acessar</button>
            <h4>Não possui conta? <Link to={'/Registro'}>Cadastre-se já</Link></h4>
            </div>
        </div>
        </view>
        
        
    )
}
