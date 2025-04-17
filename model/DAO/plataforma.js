/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a plataforma no Banco de Dados
 * Data: 17/02/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir uma nova plataforma no banco de dados

const insertPlataforma = async function(plataforma) {
    try {
        let sql = `insert into tbl_plataforma(
                                            plataforma
        )values(
                '${plataforma.plataforma}'
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

//Função para retornar uma lista de plataformas
const selectAllPlataforma = async function(){
    try {
        let sql = `select * from tbl_plataforma by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else 
            return false
    } catch (error) {
        
    }
}

//Função para buscar no banco uma plataforma através de seu id
const selectByIdPlataforma = async function(id){
    try {
        let sql = `select * from tbl_plataforma where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para atualizar uma plataforma
const updatePlataforma = async function(plataforma){
    try {
        let sql = `update tbl_plataforma set plataforma = '${plataforma}' where id = '${id}'`
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

module.exports = {
    insertPlataforma,
    selectAllPlataforma,
    selectByIdPlataforma,
    updatePlataforma
}