import store from '../store/store'
import { verificaLoginLS } from '../store/actions/index'
import { url as appUrl } from './helper'
import M from 'materialize-css'


export const converteBase64 = arquivo => new Promise((success) => {
    const reader = new FileReader()
    reader.readAsDataURL(arquivo)
    reader.onload = () => success(reader.result)
})


export const carregaImagem = (imagem, quadro) => {
    let reader = new FileReader()
    reader.onload = () => {
        quadro.src = reader.result
    }
    reader.readAsDataURL(imagem)
}


const getJwt = () => {
    const jwt = store.getState().autenticacao.jwt
    return jwt
}

const atualizaJwtUsuario = () => {
    return new Promise((success, reject) => {
        store.dispatch(verificaLoginLS())
        success()
    })
}

const geraRequest = (rota, obj = null) => {
    let method = obj ? obj.method : "get"

    let h = new Headers()
    h.set("Content-Type", "application/json")
    h.set("jwt", getJwt())

    let objRequest = {
        method,
        headers: h,
    }

    if (method != "get") {
        objRequest.body = obj.body
    }

    return new Request(appUrl + rota, objRequest)
}



const jwtFetchUnit = requestUnit => {
    return new Promise((success, reject) => {
        fetch(requestUnit).then(r => {
            let status = r.status
            success(r.json().then(conteudo => {
                return {
                    status,
                    conteudo
                }
            }))
        })
    })
}


const pFetchGarantido = (url, opcoes) => new Promise((success, reject) => {
    jwtFetchUnit(geraRequest(url, opcoes)).then(resp => success(resp))
})


export const jwtFetch = (url, opcoes = null) => {
    return new Promise((success, reject) => {
        pFetchGarantido(url, opcoes).then(r => {
            let status = r.status
            if (status == 203) {
                let objUsuario = r.conteudo
                localStorage.setItem('jwt', objUsuario.jwt)
                localStorage.setItem('usuario', JSON.stringify(objUsuario.usuario))
                atualizaJwtUsuario().then(() => geraRequest(url, opcoes)).then(r => jwtFetchUnit(r)).then(r => r.conteudo).then(r => success(r))
            } else if (status == 301) {
                M.toast({ html: "Voce sera redirecionado para um novo login" })
                localStorage.clear()
                setTimeout(() => {
                    store.dispatch(verificaLoginLS())
                    setTimeout(() => {
                        const e = new CustomEvent('abreLogin')
                        document.dispatchEvent(e)

                    }, 1000)
                }, 500)
            }
            else if (status < 200 || status > 299) {
                reject(r)
            }
            else {
                success(r.conteudo)
            }

        })
    })
}