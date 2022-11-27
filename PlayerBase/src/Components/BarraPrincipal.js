import './BarraPrincipal.css'
import logo from '../imgs/logo.png' 
import BarraNav from './BarraNav'
import {BrowserRouter , Routes , Route, Link} from 'react-router-dom'
//import routes from './routes'
import Login from './Login.js'
import Principal from "./Principal.js"
export default function BarraPrincipal(){
    const v = 'principal'
    return(  
        <div id="barra">
            <div id='square-icon'>
                <img id ="image" src = {logo} height = '100px'/>
            </div>
            {v!='principal'?<input id = "Pesquisa"type={Text}/>:null}
            <Link to={'/login'}>
                <button className='btns'>Login</button>
            </Link>         
            
        
            <BarraNav/>
        </div>
    )
}