import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import TabelaMarcas from './tabelaMarca'
import ModalCriaMarca from './modalNovaMarca'
import ModalEditaMarca from './modalEditaMarca'
import ModalDeletaMarca from './modalDeletaMarca'
import ListaPaginacao from '../searchBar/listaPaginacao'
import * as helper from '../../../suporte/helper'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class TelaMarcas extends Component {

    state = {
        marcas: null,
        textoBusca: null,
        pagina: 1
    }

    numItensPorPagina = 5

    alteraPagina = pagina => {
        this.setState({
            pagina
        })
    }


    listaCompletaMarcas = () => {
        jwtFetch("marcas/listar").then(marcas => {
            this.setState({
                marcas,
                pagina: 1
            })
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.listaCompletaMarcas()
        }, 100)
    }

    getMarcas = () => {
        let marcas = this.state.marcas
        let t = this.state.textoBusca
        if (t) {
            marcas = this.state.marcas.filter(m => m.nome.toLowerCase().includes(t.toLowerCase()))
        }
        return marcas
    }

    getMarcasPaginadas = () => {
        let pagina = this.state.pagina
        let marcasF = null
        let marcas = this.getMarcas()
        if (marcas) {
            marcasF = marcas.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return marcasF
    }


    alteraTextoBusca = (t) => {
        let texto = t ? t : null
        this.setState({
            textoBusca: texto,
            pagina: 1
        })
    }

    abreModalCriaMarca = e => {
        e.preventDefault()
        this.childAbreModalCriaMarca()
    }

    abreModalEditaMarca = marca => {
        this.childAbreModalEditaMarca(marca)
    }

    abreModalDeletaMarca = marca => {
        this.childAbreModalDeletaMarca(marca)
    }


    render() {
        return (
            <div className="container">
                <br />
                <br />
                <div className="row">
                    <div className="col s5"><h5>Marcas</h5></div>
                    <div className="col s6">
                        <SearchBar informaTxtBusca={(t) => { this.alteraTextoBusca(t) }} />
                    </div>
                    <div className="col s1">
                        <a
                            onClick={e => this.abreModalCriaMarca(e)}
                            style={{
                                marginTop: "1em"
                            }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                    </div>
                </div>

                <div className="row">
                    <div className="col s4 offset-s8">
                        <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.getMarcas()} />
                    </div>
                </div>
                <br />
                <br />
                <TabelaMarcas deletar={(el) => this.abreModalDeletaMarca(el)} editar={(el) => this.abreModalEditaMarca(el)} marcas={this.getMarcasPaginadas()} />
                <ModalCriaMarca listarMarcas={() => this.listaCompletaMarcas()} setAbreModal={f => this.childAbreModalCriaMarca = f} />
                <ModalEditaMarca listarMarcas={() => this.listaCompletaMarcas()} setAbreModal={f => this.childAbreModalEditaMarca = f} />
                <ModalDeletaMarca listarMarcas={() => this.listaCompletaMarcas()} setAbreModal={f => this.childAbreModalDeletaMarca = f} />

            </div>
        )
    }
}

export default TelaMarcas