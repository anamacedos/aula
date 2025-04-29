/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a idioma no Banco de Dados
 * Data: 24/04/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()


//Função para inserir um idioma no banco
const insertIdioma = async function(idioma) {
    try {
        let sql = `insert into tbl_idioma(
                                        idioma
                    )values(
                                '${idioma.idioma}'
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

//Função para listar todos os idiomas

const selectAllIdioma = async function() {
    try {
        let sql = `select * from tbl_idioma order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result 
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para listar um idioma pelo id
const selectByIdIdioma = async function(id){
    try {
        let sql = `select * from tbl_idioma where id = ${id}`


        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
    
}

//Função para atualizar no banco um idioma existente
const updateIdioma = async function(idioma){
    try {
        let sql = `update tbl_idioma set idioma = '${idioma.idioma}' where id = '${idioma.id}'`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//função para deletar um idioma
const deleteIdioma = async function (id) {
    try {
        let sql = `delete from tbl_idioma where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)  

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
    
    
}


module.exports = {
    insertIdioma,
    selectAllIdioma,
    selectByIdIdioma,
    updateIdioma,
    deleteIdioma
}