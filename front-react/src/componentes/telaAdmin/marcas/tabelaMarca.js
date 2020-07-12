import React, { Component } from 'react'

class TabelaMarcas extends Component {

    listaItens = () => {
        if (this.props.marcas) {
            let marcas = [...this.props.marcas]
            let tbl = marcas.map(el => (<tr key={el.id}><td>{el.nome}</td><td>{this.botoes(el)}</td></tr>))
            return tbl
        }
        return null
    }   

    botoes = (el) => {
        return (
            <div>
                <a href="#" onClick={(e) => this.ativaEdicao(e, el)}><i className="material-icons">edit</i></a>
                &nbsp;&nbsp;&nbsp;
                <a href="#" onClick={(e) => this.ativaDelecao(e, el)}><i className="material-icons">delete</i></a>
            </div>
        )
    }

    ativaEdicao = (e, el) => {
        e.preventDefault()
        this.props.editar(el)
    }

    ativaDelecao = (e, el) => {
        e.preventDefault()
        this.props.deletar(el)
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Marcas</th>
                            <th>Acoes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.listaItens()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TabelaMarcas