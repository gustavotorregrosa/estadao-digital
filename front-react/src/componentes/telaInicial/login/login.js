import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import * as helper from '../../../suporte/helper'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'


class ModalLogin extends Component {
    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.abrirModal = this.abrirModal.bind(this)
    }

    state = {
        loading: false,
        email: '',
        password: ''
    }

    componentDidMount() {
        this.elem = document.getElementById('modal1')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                email: '',
                password: ''
            })

        })
        this.props.setAbreModal(this.abrirModal)

        document.addEventListener('abreLogin', this.abrirModal)
    }

    componentWillUnmount(){
        document.removeEventListener('abreLogin', this.abrirModal)
    }

    abrirModal = () => {
        this.instance.open()
        M.updateTextFields()
    }

    fechaModal = () => {
        this.instance.close()
    }

    fazerLogin = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let opcoes = {
            url: helper.url.concat('usuario/login'),
            method: 'post',
            body: JSON.stringify(this.state),
            headers: myHeaders
        }
        let status
        fetch(opcoes.url, opcoes).then(resposta => {
            status = resposta.status
            return resposta.json()
        }).then(data => {
            if(status == 200){
                localStorage.setItem("usuario", JSON.stringify(data.usuario))
                localStorage.setItem("jwt", data.jwt)
                this.fechaModal()
                this.props.verificaLoginLocalStorage()
            } 
            
            M.toast({html: data.mensagem})
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


    render() {
        return (
            <div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" onChange={(e) => this.handleChangeEmail(e)} type="email" className="validate" />
                                <label htmlFor="email">E-mail</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" onChange={(e) => this.handleChangePassword(e)} type="password" className="validate" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" onClick={(e) => this.fazerLogin(e)} className="waves-effect waves-green btn-flat">Login</a>
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
        verificaLoginLocalStorage: () => dispatch(actions.verificaLoginLS()),
        
    }
}

export default connect(null, mapDispatchToProps)(ModalLogin)