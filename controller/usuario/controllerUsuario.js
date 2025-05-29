/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD do usuário
 * Data: 22/05/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const usuarioDAO = require('../../model/DAO/usuario.js')

const insertUsuario = async function(usuario, contentType) {
    try {
        if(contentType == 'application/json'){
            if(
                usuario.nome == undefined || usuario.nome == "" || usuario.nome == null || usuario.nome.length > 80 ||
                usuario.email == undefined || usuario.email == "" || usuario.email == null || usuario.email.length > 100 ||
                usuario.telefone == undefined || usuario.telefone == "" || usuario.telefone == null || usuario.telefone.length > 15 ||
                usuario.senha == undefined || usuario.senha == "" || usuario.senha == null || usuario.senha.length > 20
            ){
                
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                 let resultUsuario = await usuarioDAO.insertUsuario(usuario)
                 
                 
                 if(resultUsuario)
                    return MESSAGE.SUCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Funcao para atualizar um usuario
const atualizarUsuario = async function (usuario, id, contentType) {
    try {
        if (contentType == 'application/json'){

            if(usuario.nome == undefined || usuario.nome == "" || usuario.nome == null || usuario.nome.length > 80 ||
                usuario.email == undefined || usuario.email == "" || usuario.email == null || usuario.email.length > 100 ||
                usuario.telefone == undefined || usuario.telefone == "" || usuario.telefone == null || usuario.telefone.length > 15 ||
                usuario.senha == undefined || usuario.senha == "" || usuario.senha == null || usuario.senha.length > 20
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //validar se o id existe no banco de dados
                let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))
                console.log(resultUsuario);
                
                if(resultUsuario.status_code == 200){
                    //adiciona um atributo id no json para encaminhar o id da requisição
                    usuario.id = parseInt(id)
                    let result = await usuarioDAO.updateUsuario(usuario)

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM//200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL

                }else if(result.status_code == 404){
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

//Função para buscar um usuario pelo id
const buscarUsuario = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosUsuarios = {}
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id)) //se caso chegar um numero decimal, o parse int pega só a parte inteira
           
            if (resultUsuario != false){

                if (resultUsuario.length > 0 || typeof(resultUsuario) == 'object'){

                    //cria um objeto do tipo json para retornar a lista de jogos
                    dadosUsuarios.status = true
                    dadosUsuarios.status_code = 200
                    dadosUsuarios.usuario = resultUsuario
                    return dadosUsuarios
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

//Função para listar todos os usuários
const listarUsuarios = async function(){
    try {
        let dadosUsuarios = {}
        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false){
            if(resultUsuario.length > 0 || typeof(resultUsuario) == 'object'){
                dadosUsuarios.status = true
                dadosUsuarios.status_code = 200
                dadosUsuarios.items = resultUsuario.length
                dadosUsuarios.usuarios = resultUsuario
                // console.log(dadosPlataformas)
                return dadosUsuarios
               
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

//Função para excluir um usuario
const excluirUsuario = async function (id) {
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if(resultUsuario != false || typeof resultUsuario == 'object'){
                if(resultUsuario.length > 0){
                    let result = await usuarioDAO.deleteUsuario(id)

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
    insertUsuario,
    buscarUsuario,
    atualizarUsuario,
    listarUsuarios,
    excluirUsuario
}