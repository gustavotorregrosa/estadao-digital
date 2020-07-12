export const atualizaObjeto = (old, atualizacoes) => {
    return {
        ...old,
        ...atualizacoes
    }
}