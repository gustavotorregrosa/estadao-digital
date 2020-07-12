import React, {Component} from 'react'
import Logo from '../logo/logo'
import estilizar from '../../hoc/efeitos/aplicaEstilos'
import NavBar from './navBar/navBar'
import { connect } from 'react-redux'

class TelaInicial extends Component {

    componentDidUpdate(){
        if(this.props.logado){
            this.props.history.push('/admin')
        }
    }

    render(){
        return(
            <div>
                <NavBar />
                {estilizar(Logo, {
                    textAlign: "center",
                    marginTop: "8em"
                })}

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

export default connect(mapStateToProps)(TelaInicial)