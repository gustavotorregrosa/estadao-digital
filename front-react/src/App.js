import React, {Component} from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import TelaInicial from './componentes/telaInicial/telaInicial'
import TelaAdmin from './componentes/telaAdmin/telaAdmin'
import * as actions from './store/actions/index'
import { connect } from 'react-redux'


class App extends Component {
    rotas = (
      <Switch>
        <Route path="/admin" component={TelaAdmin}/>
        <Route path="/" exact component={TelaInicial}/>
      </Switch>
    )
  
    componentDidMount(){
      this.props.verificaLoginLocalStorage()
    }
  
    render() {
      return this.rotas
    }
  
  }
  
  const mapStateToProps = state => {
    return {
      redirectAberto: state.autenticacao.abreRedirect
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      abreRedirect: () => dispatch(actions.abreRedirect()),
      verificaLoginLocalStorage: () => dispatch(actions.verificaLoginLS())
    }
  }
  
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));