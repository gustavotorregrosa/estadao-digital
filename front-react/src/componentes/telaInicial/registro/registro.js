import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import * as helper from '../../../suporte/helper'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'


class ModalRegistro extends Component {
    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.abrirModal = this.abrirModal.bind(this)
        this.objComputed = this.computed()
    }

    state = {
        loading: false,
        nome: '',
        email: '',
        password: '',
        pvalidation: ''
    }

    componentDidMount() {
        this.elem = document.getElementById('modal3')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                nome: '',
                email: '',
                password: '',
                pvalidation: ''
            })

        })
        this.props.setAbreModal(this.abrirModal)
    }


    computed = () => {
        function confirmacaoValida(senha, confirmacao){
            return senha == confirmacao
        }
        let classeConfirmacaoSenha = ""
        if(this.state.pvalidation !== ""){
            classeConfirmacaoSenha = "invalid"
            if(confirmacaoValida(this.state.password, this.state.pvalidation)){
                classeConfirmacaoSenha = "valid"
            }
        }
        let classesBtnSubmit = "waves-effect waves-green btn-flat disabled"
        
        if(!this.state.loading && this.state.nome.length > 0 && this.state.email.length > 5 && this.state.email.includes("@") && this.state.password.length >= 8 && confirmacaoValida(this.state.password, this.state.pvalidation)){
            classesBtnSubmit = "waves-effect waves-green btn-flat"
        }

        return {
            classeConfirmacaoSenha,
            classesBtnSubmit
        }
    }

    componentDidUpdate(){
        this.objComputed = this.computed()
    }

    abrirModal = () => {
        this.instance.open()
        M.updateTextFields()
    }

    fechaModal = () => {
        this.instance.close()
    }

    registrar = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let opcoes = {
            url: helper.url.concat('usuario/registrar'),
            method: 'post',
            body: JSON.stringify(this.state),
            headers: myHeaders
        }
        let status
        fetch(opcoes.url, opcoes).then(resposta => {
            status = resposta.status
            return resposta.json()
        }).then(data => {
            if (status == 200) {
                localStorage.setItem("usuario", JSON.stringify(data.usuario))
                localStorage.setItem("jwt", data.jwt)
                this.props.verificaLoginLocalStorage()

            }
            this.fechaModal()
            M.toast({ html: data.mensagem })

        })
    }

    handleChangeNome = (e) => {
        this.setState({
            nome: e.target.value
        })
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }


    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleChangePasswordValidation = (e) => {
        this.setState({
            pvalidation: e.target.value
        })
    }


    render() {
        return (
            <div>
                <div id="modal3" className="modal" style={{maxHeight: '100%', width: '80%', overflow: 'visible'}}>
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="nomeRegistro" value={this.state.nome} onChange={(e) => this.handleChangeNome(e)} type="text" className="validate" />
                                <label htmlFor="nomeRegistro">Nome</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="emailRegistro" value={this.state.email} onChange={(e) => this.handleChangeEmail(e)} type="email" className="validate" />
                                <label htmlFor="emailRegistro">E-mail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="passwordRegistro" value={this.state.password} onChange={(e) => this.handleChangePassword(e)} type="password" minLength="8" className="validate" />
                                <label htmlFor="passwordRegistro">Password</label>
                                <span className="helper-text" data-error="8 caracteres ou mais"></span>

                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="passwordConfirmationRegistro" value={this.state.pvalidation} onChange={(e) => this.handleChangePasswordValidation(e)} onBlur={(e) => this.handleChangePasswordValidation(e)} type="password" className={this.objComputed.classeConfirmacaoSenha} />
                                <label htmlFor="passwordConfirmationRegistro">Password Confirmation</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" onClick={(e) => this.registrar(e)} className={this.objComputed.classesBtnSubmit}>Registrar</a>
                        </div>
                        {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}
                    </div>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verificaLoginLocalStorage: () => dispatch(actions.verificaLoginLS())
    }
}

export default connect(null, mapDispatchToProps)(ModalRegistro)