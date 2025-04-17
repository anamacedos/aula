/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD de plataforma
 * Data: 14/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const plataformaDAO = require('../../model/DAO/plataforma.js')


//Função para inserir uma nova plataforma
const insertPlataforma = async function(plataforma, contentType) {
    try {
        if(contentType == 'application/json'){
            if(plataforma.plataforma == undefined || plataforma.plataforma == null || plataforma.plataforma == ""){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resulPlataforma = await plataformaDAO.insertPlataforma(plataforma)
                if(resulPlataforma)
                    return MESSAGE.SUCESS_CREATED_ITEM
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


//função para listar todas as plataformas

const listarPlataformas = async function(){
    try {
        let dadosPlataformas = {}
        let resulPlataformas = await plataformaDAO.selectAllPlataforma()

        if(resulPlataformas != false){
            if(resulPlataformas.length > 0 || typeof(resultJogo) == 'object'){
                dadosPlataformas.status = true
                dadosPlataformas.status_code = 200
                dadosPlataformas.items = resulPlataformas.length
                dadosPlataformas.plataformas = resulPlataformas

                return dadosPlataformas
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para listar a plataforma com base no id
const buscarPlataforma = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosPlataforma = {}
            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(id))

            if(resultPlataforma != false){
                if(resultPlataforma.length > 0 || typeof(resultJogo) == 'object'){
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.plataforma = resultPlataforma
                    return dadosPlataforma
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

module.exports = {
    insertPlataforma,
    listarPlataformas,
    buscarPlataforma
}