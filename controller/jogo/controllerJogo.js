/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const jogoDAO = require('../../model/DAO/jogo.js')
const controllerClassificacao = require('../classificacaoEtaria/controllerClassificacaoEtaria.js')

//Funcao para inserir um novo jogo
const insertJogo = async function (jogo, contentType) {
    try {
        if (contentType == 'application/json'){
        
    
            if(jogo.nome == undefined || jogo.nome == "" || jogo.nome == null || jogo.nome.lenght > 80 ||
                jogo.data_lancamento == undefined || jogo.data_lancamento == "" || jogo.data_lancamento == null || jogo.data_lancamento.lenght > 10 ||
                jogo.versao == undefined || jogo.versao == "" || jogo.versao == null || jogo.versao.lenght > 10 ||
                jogo.tamanho == undefined ||  jogo.tamanho.lenght > 10 ||
                jogo.descricao == undefined ||
                jogo.foto_capa == undefined || jogo.foto_capa.lenght > 200 ||
                jogo.id_classificacao_etaria == undefined || jogo.id_classificacao_etaria == "" || jogo.id_classificacao_etaria < 0 ||
                jogo.link == undefined || jogo.nome.link > 200

            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            }else{
                //encaminha os dados do novo jogo para ser inserido no banco de dados
                let resultJogo = await jogoDAO.insertJogo(jogo)
                if(resultJogo)
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


//Funcao para atualizar um jogo
const atualizarJogo = async function (jogo, id, contentType) {
    try {
        if (contentType == 'application/json'){

            if(jogo.nome == undefined || jogo.nome == "" || jogo.nome == null || jogo.nome.lenght > 80 ||
                jogo.data_lancamento == undefined || jogo.data_lancamento == "" || jogo.data_lancamento == null || jogo.data_lancamento.lenght > 10 ||
                jogo.versao == undefined || jogo.versao == "" || jogo.versao == null || jogo.versao.lenght > 10 ||
                jogo.tamanho == undefined ||  jogo.tamanho.lenght > 10 ||
                jogo.descricao == undefined ||
                jogo.foto_capa == undefined || jogo.foto_capa.lenght > 200 ||
                jogo.link == undefined || jogo.nome.link > 200 ||
                jogo.id_classificacao_etaria == undefined || jogo.id_classificacao_etaria == "" || jogo.id_classificacao_etaria < 0 ||
                id == undefined || id == "" || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //validar se o id existe no banco de dados
                let resultJogo = await jogoDAO.updateJogo(parseInt(id))
                console.log(resultJogo.status_code);
                
                if(resultJogo.status_code == 200){
                    //adiciona um atributo id no json para encaminhar o id da requisição
                    jogo.id = parseInt(id)
                    let result = await jogoDAO.updateJogo(jogo)

                    if(result)
                        return MESSAGE.SUCESS_UPDATED_ITEM//200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL

                }else if(resultJogo.status_code == 404){
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

//Funcao para excluir um jogo
const excluirJogo = async function (id) {
    try { 
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))

            if(resultJogo != false || typeof resultJogo == 'object'){
                if(resultJogo.length > 0){
                    let result = await jogoDAO.deleteJogo(id)

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

//Funcao para retornar todos os jogos
const listarJogo = async function () {

try {
    //Objeto do tipo array para utilizar no foreach (for of)
    //  para carregar os dado do filme e da classificação
    const arrayJogos = []

    let dadosJogos = {}
        //chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if (resultJogo != false){

            if (resultJogo.length > 0 || typeof(resultJogo) == 'object'){

                //cria um objeto do tipo json para retornar a lista de jogos
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.items = resultJogo.length
                // dadosJogos.games = resultJogo


                //resultFilme.forEach(async function(itemFilme){
                //foi necessário substituir o foreach pelo for of, pois
                //o foreach não consegue trabalhar com requisições async e await
                for(itemJogo of resultJogo){
                    //Busca os dados da classificação na controller de classificação
                    //Utilizando o ID da classificação (Chave estrangeira)
                    let dadosClassificacao = await controllerClassificacao.buscarClassificacaoEtaria(itemJogo.id_classificacao_etaria)


                    //Adicona um novo atributo "classificação" no json de cada jogo, cada item(itemjogo) criado no for of)
                    itemJogo.clasificacao = dadosClassificacao.classificacao

                    
                    //Remove o atributo id_classificação do json de filmes, pois ja temos
                    //o ID da classificação dentro do array de classificações
                    delete itemJogo.id_classificacao_etaria

                    //Adiciona o json de jogo, agora com os dados da classificação em um array
                    arrayJogos.push(itemJogo)
                }
                //Adiciona o novo arra de filmes no json para retornar ao ap
                dadosJogos.jogos = arrayJogos


                return dadosJogos
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

//Funcao para buscar um jogo pelo id
const buscarJogo = async function(id){
    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id<=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let dadosJogos = {}
            let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id)) //se caso chegar um numero decimal, o parse int pega só a parte inteira
            
            if (resultJogo != false){

                if (resultJogo.length > 0 || typeof(resultJogo) == 'object'){

                    //cria um objeto do tipo json para retornar a lista de jogos
                    dadosJogos.status = true
                    dadosJogos.status_code = 200
                    dadosJogos.games = resultJogo
                    return dadosJogos
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
    insertJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}
