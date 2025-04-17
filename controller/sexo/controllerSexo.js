/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD do sexo
 * Data: 03/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const sexoDAO = require('../../model/DAO/sexo.js')

//Função para inserir um novo sexo
const insertSexo = async function (sexo, contentType){
    try {
        if(contentType == 'application/json'){
            if(sexo.sexo == undefined || sexo.sexo == null || sexo.sexo == "" || sexo.sexo.lenght > 15){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //encaminha os dados do novo sexo para ser inserido no banco de dados
                let resultJogo = await sexoDAO.insertSexo(sexo)
                if (resultJogo)
                    return MESSAGE.SUCESS_CREATED_ITEM
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para listar todos os sexos
const listarSexo = async function(){
    try {
        let dadosSexos = {}
        let resultSexo = await sexoDAO.selectAllSexo()

        if(resultSexo != false){
            if(resultSexo.length > 0 || typeof(resultSexo == 'object')){

                //definindo os dados do objeto json que será retornado
                dadosSexos.status = true
                dadosSexos.status_code = 200
                dadosSexos.item = resultSexo.length
                dadosSexos.sexos = resultSexo

                return dadosSexos
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


//Função para listar o sexo com base no id
const buscarSexo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosSexo = {}
            let resultSexo = await sexoDAO.selectByIdsexo(parseInt(id))

            if (resultSexo != false){
                if(resultSexo.length > 0 || typeof(resultSexo) == 'object'){
                    //cria um objeto do tipo json para retornar a lista de jogos (o jogo)
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.sexo = resultSexo

                    return dadosSexo
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

//Função para deletar um sexo
const deleteSexo = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultSexo = await sexoDAO.selectByIdsexo(parseInt(id))
                if(resultSexo != false || typeof resultSexo == 'object'){
                    if(resultSexo.length > 0 ){
                        let result = await sexoDAO.deleteSexo(id)

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

//Função para atualizar um sexo
const updateSexo = async function(sexo, id, contentType){
    try {
        if(contentType == 'application/json'){
            if(sexo.sexo == undefined || sexo.sexo == null || sexo.sexo == "" || sexo.sexo.lenght > 15){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //validar se o id existe no banco
                let resultSexo = await buscarSexo(parseInt(id))
                if(resultSexo.status_code == 200){
                    //adiciona o atributo id no json para encaminhar o id da requisição
                    sexo.id = parseInt(id)
                    let result = await sexoDAO.updateSexo(sexo)

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else if(resultSexo.status_code == 404){
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

module.exports = {
    insertSexo,
    listarSexo,
    buscarSexo,
    deleteSexo,
    updateSexo
}