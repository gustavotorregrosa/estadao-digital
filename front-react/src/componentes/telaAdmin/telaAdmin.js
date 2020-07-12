import React, {Component} from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './navBar/navBar'
import TelaMarcas from './marcas/telaPrincipal'
import TelaCarros from './carros/telaCarros'

class TelaAdmin extends Component {

    componentDidUpdate() {
        if (this.props.logado === false) {
            this.props.history.push('/')
        }
    }

    render(){
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route path='/admin/marcas' component={TelaMarcas} />
                    <Route path='/admin/carros' component={TelaCarros} />
                    <Redirect from="/admin/*" to="/admin" />
                </Switch>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        logado: state.autenticacao.logado,
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(TelaAdmin)