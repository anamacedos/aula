/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a classificação etária no Banco de Dados
 * Data: 24/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

//add uma nova classificacao no banco
const insertClassificacaoEtaria = async function(classificacao_etaria){
    try {
        let sql = `insert into tbl_classificacao_etaria(
                                            classificacao_etaria
                    )values(
                            '${classificacao_etaria.classificacao_etaria}'
                            )`

        let result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)  
    }
}

//litar todas as classificacoes
const selectAllClassificacaoEtaria = async function () {
    try {
        let sql = `select * from tbl_classificacao_etaria order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result 
        else
            return false
        
    } catch (error) {
        return false
    }
}

//Funcao para buscar no banco de dados um jogo pelo id
const selectByClassificacaoEtaria = async function(id){
    try {
        let sql = `select * from tbl_classificacao_etaria where id = ${id}`


        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
    
}

//atualizar classificacao etaria
const updateClassificacaoEtaria = async function(classificacao_etaria){
    try {
        let sql = `update tbl_classificacao_etaria set classificacao_etaria = '${classificacao_etaria.classificacao_etaria}' where id = '${classificacao_etaria.id}'`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
        
    }
}

//Deletar uma classificacao etaria
const deleteClassificacaoEtaria = async function (id) {
    try {
        let sql = `delete from tbl_classificacao_etaria where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)  //query é para select com retornos de dados, e execute quando não tem retorno, no max dixendo se deu certo ou errado

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
    
    
}


module.exports = {
    insertClassificacaoEtaria,
    selectAllClassificacaoEtaria,
    selectByClassificacaoEtaria,
    updateClassificacaoEtaria,
    deleteClassificacaoEtaria
}