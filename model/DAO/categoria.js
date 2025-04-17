/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a categoria no Banco de Dados
 * Data: 17/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir uma categoria no banco de dados
const insertCategoria = async function(categoria){
    try {
        let sql = `insert into tbl_categoria(
                                            categoria
                    )values(
                            '${categoria.categoria}'
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


const selectAllCategoria = async function() {
    try {
        let sql = `select * from tbl_categoria order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar no banco uma categoria baseada no seu id
const selectByIdCategoria = async function(id) {
    try {
        let sql = `select * from tbl_categoria where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const updateCategoria = async function(categoria){
    try {
        let sql = `update tbl_categoria set categoria = '${categoria.categoria}' where id = '${categoria.id}'`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteCategoria = async function(id) {
    try {
        let sql = `delete from tbl_categoria where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertCategoria,
    selectAllCategoria, 
    selectByIdCategoria,
    updateCategoria,
    deleteCategoria
}