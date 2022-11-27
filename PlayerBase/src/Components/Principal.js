import './Principal.css'
import BarraPrincipal from './BarraPrincipal'
export default function Principal(){
    return(
        <div id='principal'>
            <BarraPrincipal/>
            <div>
                <h1><div id = "p">Player</div><div id='b'>Base</div> informação do campo na sua mão</h1>
                <h2>Pesquise um jogador</h2>
                <input id='pesquisa' type={Text} placeholder = "De qual jogador informações?"/>

            </div>
        </div>
    )
}