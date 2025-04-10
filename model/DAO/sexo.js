/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a sexo no Banco de Dados
 * Data: 03/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')
const { selectAllJogo } = require('./jogo')

//Fucao para inserir no Banco de Dados um novo jogo

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()


//Função para inserir no banco de dados um novo sexo
const insertSexo = async function(sexo){
    try {
        let sql = `insert into tbl_sexo(
                                        sexo
        )values(
                '${sexo.sexo}'
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

//Função para listar todos os sexos ja existentes
const selectAllSexo = async function (sexo){
    try {
        let sql = `select * from tbl_sexo order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar um sexo no banco de dados com base no seu id
const selectByIdsexo = async function(id){
    try {
        let sql = `select * from tbl_sexo where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para deletar no banco um sexo
const deleteSexo = async function(id){
    try {
        let sql = `delete from tbl_sexo where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

//Função para atualizar no banco um sexo
const updateSexo = async function(jogo){
    try {
        let sql = `update tbl_sexo set sexo = ${sexo.sexo}`
        let result = prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else 
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertSexo,
    selectAllSexo,
    selectByIdsexo,
    deleteSexo,
    updateSexo
}