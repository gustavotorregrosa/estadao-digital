import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import TabelaCarros from './tabelaCarro'
import ListaPaginacao from '../searchBar/listaPaginacao'
import ModalEditaCriaCarro from './modalEditaCriaCarro'
import ModalDeletaCarro from './modalDeletaCarro'
import * as helper from '../../../suporte/helper'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class TelaCarros extends Component {

    state = {
        carros: null,
        textoBusca: null,
        pagina: 1
    }

    numItensPorPagina = 5

    alteraPagina = pagina => {
        this.setState({
            pagina
        })
    }


    listaCompletaCarros = () => {
        jwtFetch("carros/listar").then(carros => {
            this.setState({
                carros,
                pagina: 1
            })
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.listaCompletaCarros()
        }, 100)
    }

    getCarros = () => {
        let carros = this.state.carros
        let t = this.state.textoBusca
        if (t) {
            carros = this.state.carros.filter(c => c.modelo.toLowerCase().includes(t.toLowerCase()))
        }
        return carros
    }

    getCarrosPaginados = () => {
        let pagina = this.state.pagina
        let carrosF = null
        let carros = this.getCarros()
        if (carros) {
            carrosF = carros.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return carrosF
    }


    alteraTextoBusca = (t) => {
        let texto = t ? t : null
        this.setState({
            textoBusca: texto,
            pagina: 1
        })
    }

    abreModalCriaCarros = e => {
        e.preventDefault()
        this.abreModalEditaCarro()
    }

    abreModalEditaCarro = (carro = null) => {
        this.childAbreModalEditaCarro(carro)
    }

    abreModalDeletaCarro = carro => {
        this.childAbreModalDeletaCarro(carro)
    }


    render() {
        return (
            <div className="container">
                <br />
                <br />
                <div className="row">
                    <div className="col s5"><h5>Carro</h5></div>
                    <div className="col s6">
                        <SearchBar informaTxtBusca={(t) => { this.alteraTextoBusca(t) }} />
                    </div>
                    <div className="col s1">
                        <a
                            onClick={e => this.abreModalEditaCarro(e)}
                            style={{
                                marginTop: "1em"
                            }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                    </div>
                </div>

                <div className="row">
                    <div className="col s4 offset-s8">
                        <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.getCarros()} />
                    </div>
                </div>
                <br />
                <br />
                <TabelaCarros deletar={(el) => this.abreModalDeletaCarro(el)} editar={(el) => this.abreModalEditaCarro(el)} carros={this.getCarrosPaginados()} />        
                <ModalEditaCriaCarro listarCarros={() => this.listaCompletaCarros()}
                setAbreModal={f => this.abreModalEditaCarro = f} />
                <ModalDeletaCarro listarCarros={() => this.listaCompletaCarros()} setAbreModal={f => this.childAbreModalDeletaCarro = f}  />
                </div>
        )
    }
}

export default TelaCarros