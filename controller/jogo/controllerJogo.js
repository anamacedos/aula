/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const jogoDAO = require('../../model/DAO/jogo.js')

//Funcao para inserir um novo jogo
const insertJogo = async function (jogo) {
    if(jogo.nome == undefined || jogo.nome == "" || jogo.nome == null || jogo.nome.lenght > 80 ||
        jogo.data_lancamento == undefined || jogo.data_lancamento == "" || jogo.data_lancamento == null || jogo.data_lancamento.lenght > 10 ||
        jogo.versao == undefined || jogo.versao == "" || jogo.versao == null || jogo.versao.lenght > 10 ||
        jogo.tamanho == undefined ||  jogo.tamanho.lenght > 10 ||
        jogo.descricao == undefined ||
        jogo.foto_capa == undefined || jogo.foto_capa.lenght > 200 ||
        jogo.link == undefined || jogo.nome.link > 200

    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    }else{
        //encaminha os dados do novo jogo para ser inserido no banco de dados
        let resultJogo = await jogoDAO.insertJogo(jogo)
        if(resultJogo)
            return MESSAGE.SUCESS_CREATED_ITEM //201
        else
            return MESSAGE.ERROR_INTERNAL_SERVER //500
    }
}


//Funcao para atualizar um jogo
const atualizarJogo = async function () {
    
}

//Funcao para excluir um jogo
const excluirJogo = async function () {
    
}

//Funcao para retornar todos os jogos
const listarJogo = async function () {
    
}

//Funcao para buscar um jogo 
const buscarJogo = async function () {
    
}

module.exports = {
    insertJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}
