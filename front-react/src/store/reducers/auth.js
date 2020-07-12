import * as actionTypes from '../actions/actionTypes'
import { atualizaObjeto } from '../utility'

const initialState = {
    abreRedirect: false,
    logado: null
    
}

const abreRedirect = (state, action) => {
    return atualizaObjeto(state, {
        abreRedirect: true
    })
}

const fechaRedirect = (state, action) => {
    return atualizaObjeto(state, {
        abreRedirect: false
    })
}

const atualizaLoginLS = (state, action) => {
    let objUsuario = localStorage.getItem("usuario")
    let jwt = localStorage.getItem("jwt")
    let objAtualiza = {
        logado: false,
        usuario: null,
        jwt: null
    }
    if(objUsuario && jwt){
        objAtualiza = {
            ...objAtualiza,
            logado: true,
            usuario: objUsuario,
            jwt
        }
    }
    return atualizaObjeto(state, objAtualiza)
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ABRE_REDIRECT:
            return abreRedirect(state, action)
        case actionTypes.FECHA_REDIRECT:
            return fechaRedirect(state, action)
        case actionTypes.VERIFICA_LOGIN_LOCALSTORAGE:
            return atualizaLoginLS(state, action)
        default:
            return state
    }
}

export default reducer