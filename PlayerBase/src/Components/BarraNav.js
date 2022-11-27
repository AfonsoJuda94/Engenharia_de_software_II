import './BarraNav.css'
import lupa  from '../imgs/lupa.png'
import home from '../imgs/casa.png'
import estrela from '../imgs/estrela.png'
import perfil from '../imgs/perfil.png'
export default function BarraNav(){
    return (
        <div id="bar-nav">
            
            <button>
                <img src={home}/>
            </button>
            <button>
                <img src={lupa}/>
            </button>
            <button>
                <img src={estrela}/>
            </button>
            <button>
                <img src={perfil}/>
            </button>
        </div>
    )
}