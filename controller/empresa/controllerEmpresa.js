/********************************************************************************
 * Objetivo: controller responsavel pela rega de negocio do CRUD de empresa
 * Data: 08/05/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
const MESSAGE = require('../../modulo/config.js')
const empresaDAO = require('../../model/DAO/empresa.js')

//Funcao para inserir um novo jogo
try {
    if (contentType == 'application/json'){
        if(empresa.nome == undefined || empresa.nome == "" || empresa.nome == null || empresa.nome.lenght > 100 ||
            empresa.email == undefined || empresa.email == "" || empresa.email == null || empresa.email.lenght > 50 ||
            empresa.cnpj == undefined || empresa.cnpj == "" || empresa.cnpj == null || empresa.cnpj.lenght > 20 ||
            empresa.senha == undefined || empresa.senha == "" || empresa.senha == null || empresa.senha.lenght > 20 ||
            empresa.telefone == undefined || empresa.telefone == "" || empresa.telefone == null || empresa.telefone.lenght > 20 ||
            empresa.bio == undefined || empresa.bio == "" || empresa.bio == null || empresa.bio.lenght > 300 ||
            empresa.bio == undefined || empresa.bio == "" || empresa.bio == null || empresa.bio.lenght > 300 ||


            jogo.tamanho == undefined ||  jogo.tamanho.lenght > 10 ||
            jogo.descricao == undefined ||
            jogo.foto_capa == undefined || jogo.foto_capa.lenght > 200 ||
            jogo.link == undefined || jogo.nome.link > 200){

        }
    }
} catch (error) {
    
}