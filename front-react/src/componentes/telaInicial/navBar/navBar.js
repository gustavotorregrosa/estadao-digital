import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import '../../../suporte/icons.css'
import ModalLogin from '../login/login'
import ModalRegistro from '../registro/registro'

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.elem = null
        this.instancia = null
    }

    componentDidMount() {
        this.ativaSideNav()
    }

    ativaSideNav = () => {
        if (this.instancia) {
            this.instancia.destroy()
        }
        this.elems = document.getElementById('minhasidenav')
        M.Sidenav.init(this.elems, {});
        this.instancia = M.Sidenav.getInstance(this.elems)
    }

    abreModalRegistro(e) {
        e.preventDefault()
        this.childAbreModalRegistro()
    }


    abreModalLogin(e) {
        e.preventDefault()
        this.childAbreModalLogin()
    }

    render() {
        return (
            <div>
                <nav className="black">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Estadão digital</a>
                        <a href="#" onClick={(e) => this.instancia.open()} className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#" onClick={(e) => this.abreModalRegistro(e)} >Registrar</a></li>
                            <li><a href="#" onClick={(e) => this.abreModalLogin(e)}>Login</a></li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="minhasidenav">
                    <li><a href="#" onClick={(e) => this.abreModalRegistro(e)}>Registrar</a></li>
                    <li><a href="#" onClick={(e) => this.abreModalLogin(e)}>Login</a></li>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <li><div className="divider"></div></li>
                    <li><a href="#" onClick={(e) => this.instancia.close()} >Fechar</a></li>
                </ul>
                <ModalLogin setAbreModal={f => this.childAbreModalLogin = f} />
                <ModalRegistro setAbreModal={f => this.childAbreModalRegistro = f} />
            </div>

        )
    }
}

export default NavBar