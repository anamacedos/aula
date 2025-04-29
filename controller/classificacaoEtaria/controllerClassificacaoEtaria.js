/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD da classificacao etária
 * Data: 24/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const classificacaoEtariaDAO = require('../../model/DAO/classificacaoEtaria.js')

//Funcao para inserir uma nova classificação etária
const insertClassificacaoEtaria = async function (classificacao_etaria, contentType) {
    try {
            if (contentType == 'application/json'){
            
        
                if(classificacao_etaria.classificacao_etaria == undefined || classificacao_etaria.classificacao_etaria == null || classificacao_etaria.classificacao_etaria == ""){
                    return MESSAGE.ERROR_REQUIRED_FIELDS //400

                }else{
                    //encaminha os dados do novo jogo para ser inserido no banco de dados
                    let resultClassificacaoEtaria = await classificacaoEtariaDAO.insertClassificacaoEtaria(classificacao_etaria)
                    if(resultClassificacaoEtaria)
                        return MESSAGE.SUCESS_CREATED_ITEM //201
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
            console.log(error)
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para trazer uma lista de todas as classificacoes
const listarClassificacaoEtaria = async function () {

try {
    let dadosClassificacaoes = {}
        //chama a função para retornar os dados do jogo
        let resultClassificacaoEtaria = await classificacaoEtariaDAO.selectAllClassificacaoEtaria()

        if (resultClassificacaoEtaria != false){

            if (resultClassificacaoEtaria.length > 0 || typeof(resultClassificacaoEtaria) == 'object'){

                //cria um objeto do tipo json para retornar a lista de jogos
                dadosClassificacaoes.status = true
                dadosClassificacaoes.status_code = 200
                dadosClassificacaoes.items = resultClassificacaoEtaria.length
                dadosClassificacaoes.games = resultClassificacaoEtaria
                return dadosClassificacaoes
            }else{
                return MESSAGE.ERROR_NOT_FOUND

            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    
} catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    
}
    
}

//listar classificacao com base no id
const buscarClassificacaoEtaria = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosClassificacao = {}
            let resultClassificacao = await classificacaoEtariaDAO.selectByClassificacaoEtaria(parseInt(id)) //se caso chegar um numero decimal, o parse int pega só a parte inteira
            
            if (resultClassificacao != false){

                if (resultClassificacao.length > 0 || typeof(resultClassificacao) == 'object'){

                    //cria um objeto do tipo json para retornar a lista de jogos
                    dadosClassificacao.status = true
                    dadosClassificacao.status_code = 200
                    dadosClassificacao.games = resultClassificacao
                    return dadosClassificacao
                }else{
                    return MESSAGE.ERROR_NOT_FOUND

                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
        
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }
    
}

//Função para atualizar uma classificação etária
const atualizarClassificacaoEtaria = async function (classificacao_etaria, id, contentType){
    try {
        if(contentType == 'application/json'){
            if(classificacao_etaria.classificacao_etaria == undefined || classificacao_etaria.classificacao_etaria == "" || classificacao_etaria.classificacao_etaria == null || id == undefined || id == "" || id == null || isNaN(id) || id<=0){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultClassificacaoEtaria = await buscarClassificacaoEtaria(parseInt(id))
                if(resultClassificacaoEtaria.status_code == 200){
                    classificacao_etaria.id = parseInt(id)
                    let result = await classificacaoEtariaDAO.updateClassificacaoEtaria(classificacao_etaria)
                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        console.log(result)
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    
                }else if(resultClassificacaoEtaria.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para deletar uma classificacao no banco
const excluirClassificacaoEtaria = async function (id) {
    try { 
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultClassificacaoEtaria = await classificacaoEtariaDAO.selectAllClassificacaoEtaria(parseInt(id))

            if(resultClassificacaoEtaria != false || typeof resultClassificacaoEtaria == 'object'){
                if(resultClassificacaoEtaria.length > 0){
                    let result = await classificacaoEtariaDAO.deleteClassificacaoEtaria(id)

                    if(result)
                        return MESSAGE.SUCESS_DELETED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
    
}

module.exports = {
    insertClassificacaoEtaria,
    listarClassificacaoEtaria,
    buscarClassificacaoEtaria,
    atualizarClassificacaoEtaria,
    excluirClassificacaoEtaria
}


