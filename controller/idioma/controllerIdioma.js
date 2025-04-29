/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD de idioma
 * Data: 24/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const idiomaDAO = require('../../model/DAO/idioma.js')

//função para inserir um novo idioma
const insertIdioma = async function(idioma, contentType){
    try {
        if(contentType == 'application/json'){
            if(idioma.idioma == undefined || idioma.idioma == null || idioma.idioma == "" || idioma.idioma.lenght <= 0){
                return MessageChannel.ERROR_REQUIRED_FIELDS //400
            }else{
                let resultIdioma = await idiomaDAO.insertIdioma(idioma)
                if(resultIdioma)
                    return MESSAGE.SUCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//função para retornar todos os idiomas
const listarIdioma = async function() {
    try {
        let dadosIdiomas = {}
        let resultIdiomas = await idiomaDAO.selectAllIdioma()

        if(resultIdiomas != false){
            if(resultIdiomas.lenght > 0 || typeof(resultIdiomas) == 'object'){
                dadosIdiomas.status = true
                dadosIdiomas.status_code = 200
                dadosIdiomas.itens = resultIdiomas.length
                dadosIdiomas.idiomas = resultIdiomas
                return dadosIdiomas
                
            }else{
                return MESSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }
}


//Função para buscar um idioma com base no seu id
const buscarIdioma = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosIdioma = {}
            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id)) //se caso chegar um numero decimal, o parse int pega só a parte inteira
            
            if (resultIdioma != false){

                if (resultIdioma.length > 0 || typeof(resultIdioma) == 'object'){

                    //cria um objeto do tipo json para retornar a lista de jogos
                    dadosIdioma.status = true
                    dadosIdioma.status_code = 200
                    dadosIdioma.games = resultIdioma
                    return dadosIdioma
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

//função para atualizar um idioma
const atualizarIdioma = async function (idioma, id, contentType){
    try {
        if(contentType == 'application/json'){
            if(idioma.idioma == undefined || idioma.idioma == "" || idioma.idioma == null || id == undefined || id == "" || id == null || isNaN(id) || id<=0){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultIdioma = await buscarIdioma(parseInt(id))
                if(resultIdioma.status_code == 200){
                    idioma.id = parseInt(id)
                    let result = await idiomaDAO.updateIdioma(idioma)
    
                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    
                }else if(resultIdioma.status_code == 404){
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

//Função para excluir um idioma
const excluirIdioma = async function (id) {
    try { 
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

            if(resultIdioma != false || typeof resultIdioma == 'object'){
                if(resultIdioma.length > 0){
                    let result = await idiomaDAO.deleteIdioma(id)

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
    insertIdioma,
    listarIdioma,
    buscarIdioma,
    atualizarIdioma,
    excluirIdioma
}