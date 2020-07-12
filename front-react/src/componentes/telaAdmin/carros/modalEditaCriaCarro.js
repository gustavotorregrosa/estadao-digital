import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import * as helper from '../../../suporte/helper'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import VMasker from 'vanilla-masker'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class EditaCarro extends Component {

    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.elemSelectMarcas = null
        this.instanciaSelectMarcas = null
        this.abrirModal = this.abrirModal.bind(this)
        this.inputPlaca = null
    }

    state = {
        loading: false,
        id: "",
        modelo: "",
        marca: "",
        placa: "",
        ano: "",
        marcas: null
    }

    componentDidMount() {
        this.elem = document.getElementById('modal-edita-carro')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => {
                this.setState({
                    loading: false,
                    id: "",
                    modelo: "",
                    marca: "",
                    placa: "",
                    ano: ""
                })
                setTimeout(() => {
                    M.updateTextFields()
                }, 100)

                try {
                    this.instanciaSelectMarcas.destroy()
                } catch (e) {
                    console.log(e)
                }
                this.elemSelectMarcas = null
            }
        })
        this.ativaSelectMarcas()
        this.props.setAbreModal(this.abrirModal)

        this.listaMarcas()
        
    }


    listaMarcas = () => {
        jwtFetch("marcas/listar").then(marcas => {
            this.setState({
                marcas
            })
        })
    }

 

    selecionaMarca(marca) {
        try {
            this.instanciaSelectMarcas.destroy()
        } catch (e) {
            console.log(e)
        }
        this.elemSelectMarcas.value = marca
        this.instanciaSelectMarcas = M.FormSelect.init(this.elemSelectMarcas, {})
    }

   

    ativaSelectMarcas = () => {
        jwtFetch("marcas/listar").then(marcas => {
            this.setState({
                marcas
            })
            this.instanciaSelectMarcas = M.FormSelect.init(this.elemSelectMarcas, {})
        })
    }


    listarOptionsMarcas = () => {
        let marcas = []
        if (this.state.marcas) {
            marcas = this.state.marcas.map(el => (<option value={el.id}>{el.nome}</option>))
        }

        return marcas
    }

    listagemMarcas = () => {
        let marcas = this.state.marcas
        return marcas
    }

    alterarMarca = () => {
        try {
            this.instanciaSelectMarcas.destroy()
        } catch (e) {
            console.log(e)
        }

        this.instanciaSelectMarcas = M.FormSelect.init(this.elemSelectMarcas, {})
        let marca = this.instanciaSelectMarcas.getSelectedValues()[0]
      
        this.setState({
            marca
        })
    }

    abrirModal = (carro = null) => {
        
        if (!carro) {
            carro = {
                id: "",
                modelo: "",
                marca: "",
                placa: "",
                ano: ""
            }
        } else {
            if(carro.marca && carro.marca.id){
                carro.marca = carro.marca.id
            }
           
        }

        this.setState({
            ...carro,
        })
        this.instance.open()
        setTimeout(() => {
            this.inputPlaca.value = this.state.placa
            M.updateTextFields()
            this.selecionaMarca(carro.marca)
        }, 100)


    }

    fechaModal = () => {
        this.instance.close()
    }

    alterarModelo = (e) => {
        let modelo = e.target.value
        this.setState({
            modelo
        })
    }

    alterarAno = (e) => {
        let ano = e.target.value
        this.setState({
            ano
        })
    }


    alterarPlaca = (e) => {
        let placa = e.target.value
        this.setState({
            placa
        })
    }


    salvaCarro = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let opcoes = {
            url: 'carros/salvar',
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                modelo: this.state.modelo,
                placa: this.state.placa,
                ano: this.state.ano,
                marca: this.state.marca
            }),

            headers: myHeaders
        }
        setTimeout(() => {
            jwtFetch(opcoes.url, opcoes).then(r => {
                M.toast({ html: r.mensagem })
                this.fechaModal()
                this.props.listarCarros()
            }).catch(r => {
                this.fechaModal()
            })
        }, 1000);
    }

    render() {
        return (

            <div>
                <div id="modal-edita-carro" style={{ width: '80%'}} className="modal">
                    <div className="row modal-content">
                        <div className="">
                            <div className="input-field col s5">
                                <input value={this.state.modelo} onChange={(e) => this.alterarModelo(e)} id="novo-modelo-carro" type="text" className="validate" />
                                <label htmlFor="novo-modelo-carro">Modelo</label>
                            </div>
                        </div>

                        <div className="">
                            <div className="input-field col offset-s1 s5">
                                <input value={this.state.ano} onChange={(e) => this.alterarAno(e)} id="novo-ano-carro" type="number" className="validate" />
                                <label htmlFor="novo-ano-carro">Ano</label>
                            </div>
                        </div>
                    </div>

                    <div className="row modal-content">
                        <div className="modal-content">
                            <div className="input-field col s3">
                                <input ref={
                                    input => this.inputPlaca = input
                                }
                                    defaultValue={this.state.placa} onChange={(e) => this.alterarPlaca(e)} id="novo-placa-carro" type="text" className="validate" />
                                <label htmlFor="novo-placa-carro">Placa</label>
                            </div>

                            <div className="input-field col offset-s1 s3">
                                <select ref={
                                    select => this.elemSelectMarcas = select
                                }
                                    onChange={() => this.alterarMarca()}>
                                    <option value="0" selected>Escolha uma marca</option>
                                    {this.listarOptionsMarcas()}
                                </select>
                                <label>Marcas</label>
                            </div>

                        </div>
                    </div>

                    <div className="modal-footer">
                        <a onClick={e => this.salvaCarro(e)} href="#" className="waves-effect waves-green btn-flat">Salvar</a>

                    </div>
                    {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

                </div>

            </div>
        )
    }
}

export default EditaCarro