import React, { Component } from 'react'
import estilo from './estilo.module.css'

class SearchBar extends Component {

    state = {
        texto: null,
        ativaCor: false
    }

    mudaTextoBusca = (e) => {
        let texto = e.target.value
        let ativaCor = texto != ""
        this.setState({
            texto,
            ativaCor
        })
        this.props.informaTxtBusca(texto)
    }





    render() {
        let listaClasses = ['card', estilo.quadroinput]
        if(this.state.ativaCor){
            listaClasses.push(estilo.ativo)
        }
        listaClasses = listaClasses.join(' ')
        return (
            <div>
                <div className={listaClasses} >
                    <input  onChange={(e) => this.mudaTextoBusca(e)} id="inp-busca" type="text" placeholder="Busca"/>
                </div>
            </div>
        )
    }
}

export default SearchBar