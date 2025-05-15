/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a empresa no Banco de Dados
 * Data: 08/05/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/

//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

//Fucao para inserir no Banco de Dados uma nova empresa
const insertEmpresa = async function(empresa){ 
    try {
        
    

    let sql = `insert into tbl_empresa(
                                    nome,
                                    email,
                                    cnpj,
                                    senha,
                                    telefone,
                                    bio,
                                    ano_fundacao,
                                    ceo,
                                    logo
    )values(
        '${empresa.nome}',
        '${empresa.email}',
        '${empresa.cnpj}',
        '${empresa.senha}',
        '${empresa.telefone}',
        '${empresa.bio}',
        '${empresa.ano_fundacao}',
        '${empresa.ceo}',
        '${empresa.logo}'
    )`
    //executa o script sql no banco de dados e aguarda o retorno do banco
    //so pode ter await em uma funcao se ela for async, e ela so pode ser async se ela precisa fazer uma requisicao que esta em outro servidor
    let result = await prisma.$executeRawUnsafe(sql) //enquanto o banco nao da uma devolutiva, nao passa para a proxima linha

    if (result)
        return true
    else
        return false
    } catch (error) {
        console.log(error)
    }
}

//Função para retornar do banco uma lista de empresas

const selectAllEmpresa = async function(params) {
    try {
        let sql = `select * from tbl_empresa order by id desc`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result //no select nao é return true pq tem que retornar os dados, por isso o result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar no banco de dados uma empresa pelo id
const selectByIdEmpresa = async function(id){
    try {
        let sql = `select * from tbl_empresa where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Fução para atualizar no banco de dados uma empresa existente
const updateEmpresa = async function(empresa) {
    try {
        let sql = `update tbl_empresa set nome = '${empresa.nome}',
                                                email = '${empresa.email}',
                                                cnpj = '${empresa.cnpj}',
                                                senha = '${empresa.senha}',
                                                telefone = '${empresa.telefone}',
                                                bio = '${empresa.bio}',
                                                ano_fundacao = '${empresa.ano_fundacao}',
                                                ceo = '${empresa.ceo}',
                                                logo = '${empresa.logo}'`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    
    }
}

//Função para excluir uma no banco de dados empresa existente
const deleteEmpresa = async function(id) {
    try {
        let sql = `delete from tbl_empresa where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)  //query é para select com retornos de dados, e execute quando não tem retorno, no max dizendo se deu certo ou errado

        if (result)
            return true
        else
            return false
    } catch (error) {
        
    }
    
}

module.exports = {
    insertEmpresa,
    selectAllEmpresa,
    selectByIdEmpresa,
    updateEmpresa,
    deleteEmpresa
}