import * as actionTypes from './actionTypes'

export const abreRedirect = () => {
    return {
        type: actionTypes.ABRE_REDIRECT
    }
}

export const fechaRedirect = () => {
    return {
        type: actionTypes.FECHA_REDIRECT
    }
}

export const verificaLoginLS = () => {
    return {
        type: actionTypes.VERIFICA_LOGIN_LOCALSTORAGE
    }
}




