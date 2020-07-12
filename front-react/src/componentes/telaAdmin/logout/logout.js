import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
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
        loading: false
    }

    componentDidMount() {
        this.elem = document.getElementById('modal2')
        this.instance = M.Modal.init(this.elem, {})
        this.props.setAbreModal(this.abrirModal)
    }

    fechaModal = () => {
        this.instance.close()
    }

    abrirModal = () => {
        this.instance.open()
    }

    exibeNome = () => {
        let nome = ""
        if (this.props.usuario) {
            let objUsuario = JSON.parse(this.props.usuario)
            nome = objUsuario.nome
        }
        return nome
    }

    fazerLogout = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        localStorage.removeItem("usuario")
        localStorage.removeItem("jwt")
        setTimeout(() => {
            this.setState({
                loading: false
            })
            this.fechaModal()
            this.props.verificaLoginLocalStorage()
            M.toast({html: 'Logout realizado com sucesso'})
        }, 2000)

    }

    render() {
        return (
            <div>
                <div id="modal2" className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <p>Deseja efetuar o logout {this.exibeNome()}?</p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" onClick={(e) => this.fazerLogout(e)} className="waves-effect waves-green btn-flat">Logout</a>
                        </div>
                        {this.state.loading ? (<div class="progress"><div class="indeterminate"></div></div>) : null}
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


const mapStateToProps = state => {
    return {
        // logado: state.autenticacao.logado,
        usuario: state.autenticacao.usuario
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin)