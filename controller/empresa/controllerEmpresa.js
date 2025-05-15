/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD de empresa
 * Data: 08/05/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const empresaDAO = require('../../model/DAO/empresa.js')

//Funcao para inserir uma nova empresa
const insertEmpresa = async function(empresa, contentType) {
    try {
        if (contentType == 'application/json'){
            if(empresa.nome == undefined || empresa.nome == "" || empresa.nome == null || empresa.nome.lenght > 100 ||
                empresa.email == undefined || empresa.email == "" || empresa.email == null || empresa.email.lenght > 50 ||
                empresa.cnpj == undefined || empresa.cnpj == "" || empresa.cnpj == null || empresa.cnpj.lenght > 20 ||
                empresa.senha == undefined || empresa.senha == "" || empresa.senha == null || empresa.senha.lenght > 20 ||
                empresa.telefone == undefined || empresa.telefone == "" || empresa.telefone == null || empresa.telefone.lenght > 20

            ){
                    return MESSAGE.ERROR_REQUIRED_FIELDS
                }else{
                    let resultEmpresa = await empresaDAO.insertEmpresa(empresa)
                    if(resultEmpresa)
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


//Função para retornar uma lista de empresas
const listarEmpresas = async function () {
    try {
        let dadosEmpresas = {}
        let resultEmpresa = await empresaDAO.selectAllEmpresa()

        if(resultEmpresa != false){
            if(resultEmpresa.length > 0 || typeof(resultEmpresa) == 'object'){
                dadosEmpresas.status = true
                dadosEmpresas.status_code = 200
                dadosEmpresas.items = resultEmpresa.length
                dadosEmpresas.empresas = resultEmpresa
                return dadosEmpresas
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

//Função para buscar um jogo pelo id
const buscarEmpresa = async function(id) {
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosEmpresas = {}
            let resultEmpresa = await empresaDAO.selectByIdEmpresa(parseInt(id))

            if(resultEmpresa != false){
                if(resultEmpresa.length > 0 || typeof(resultEmpresa) == 'object'){
                    dadosEmpresas.status = true
                    dadosEmpresas.status_code = 200
                    dadosEmpresas.empresa = resultEmpresa
                    return dadosEmpresas
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


//Função para atualizar uma empresa
const atualizarEmpresa = async function(empresa, id, contentType) {
    try {
        if(contentType == 'application/json'){
            if(
                empresa.nome == undefined || empresa.nome == "" || empresa.nome == null || empresa.nome.lenght > 100 ||
                empresa.email == undefined || empresa.email == "" || empresa.email == null || empresa.email.lenght > 50 ||
                empresa.cnpj == undefined || empresa.cnpj == "" || empresa.cnpj == null || empresa.cnpj.lenght > 20 ||
                empresa.senha == undefined || empresa.senha == "" || empresa.senha == null || empresa.senha.lenght > 20 ||
                empresa.telefone == undefined || empresa.telefone == "" || empresa.telefone == null || empresa.telefone.lenght > 20 
                
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultEmpresa = await buscarEmpresa(parseInt(id))
                if(resultEmpresa.status_code == 200){
                    empresa.id = parseInt(id)
                    let result = await empresaDAO.updateEmpresa(empresa)

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }else if(resultEmpresa.status_code == 404){
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

//Função para excluir um jogo
const excluirEmpresa = async function(id) {
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultEmpresa = await empresaDAO.selectByIdEmpresa(parseInt(id))
            
            if(resultEmpresa != false || typeof resultEmpresa == 'object'){
                if(resultEmpresa.length > 0){
                    let result = await empresaDAO.deleteEmpresa(id)

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
    insertEmpresa,
    listarEmpresas,
    buscarEmpresa,
    atualizarEmpresa,
    excluirEmpresa

}