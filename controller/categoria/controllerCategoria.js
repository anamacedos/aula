/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD do categoria
 * Data: 17/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const categoriaDAO = require('../../model/DAO/categoria.js')

//função para inserir uma nova categoria
const insertCategoria = async function(categoria, contentType){
    try {
        if(contentType == 'application/json'){
            if(categoria.categoria == undefined || categoria.categoria == null || categoria.categoria == ""){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                //encaminha os novos dados da categoria para ser inserida no banco
                let resultCategoria = await categoriaDAO.insertCategoria(categoria)
                if(resultCategoria)
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

const listarCategorias = async function() {
    try {
        let dadosCategorias = {}
        let resultCategorias = await categoriaDAO.selectAllCategoria()

        if(resultCategorias != false){
            if (resultCategorias.length > 0 || typeof(resultCategorias == 'object')){
                dadosCategorias.status = true
                dadosCategorias.status_code = 200
                dadosCategorias.item = resultCategorias.length
                dadosCategorias.categorias = resultCategorias

                return dadosCategorias
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

const bucarCategoria = async function(id){
    try {
        if(id == "" || id == undefined || id == null || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosCategoria = {}
            let resultCategoria = await categoriaDAO.selectByIdCategoria(parseInt(id))

            if(resultCategoria != false){
                if(resultCategoria.length > 0 || typeof(resultCategoria) == 'object'){
                    dadosCategoria.status = true
                    dadosCategoria.status_code = 200
                    dadosCategoria.categoria = resultCategoria

                    return dadosCategoria
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


const atualizarCategoria = async function (categoria, id, contentType){
    try {
        if(contentType == 'application/json'){
            if(categoria.categoria == undefined || categoria.categoria == "" || categoria.categoria == null || id == undefined || id == "" || id == null || isNaN(id) || id<=0){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultCategoria = await bucarCategoria(parseInt(id))
                if(resultCategoria.status_code == 200){
                    categoria.id = parseInt(id)
                    let result = await categoriaDAO.updateCategoria(categoria)
    
                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    
                }else if(resultCategoria.status_code == 404){
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

//Função para deletar uma categoria
const excluirCategoria = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultCategoria = await categoriaDAO.selectByIdCategoria(parseInt(id))

            if(resultCategoria != false || typeof resultCategoria == 'object'){
                if(resultCategoria.length > 0){
                    let result = await categoriaDAO.deleteCategoria(id)

                    if(result)
                        return MESSAGE.SUCESS_DELETED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else{
                    MESSAGE.ERROR_NOT_FOUND
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
    insertCategoria,
    listarCategorias,
    bucarCategoria,
    atualizarCategoria,
    excluirCategoria
}