/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a jogos no Banco de Dados
 * Data: 13/02/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//Fucao para inserir no Banco de Dados um novo jogo
const insertJogo = async function(jogo){ 
    //instancia da classe do prisma client para gerar um objeto
    const prisma = new PrismaClient()

    let sql = `insert into tbl_jogo(
                                    nome,
                                    data_lancamento,
                                    versao,
                                    tamanho,
                                    descricao,
                                    foto_capa,
                                    link
    )values(
        '${jogo.nome}',
        '${jogo.data_lancamento}',
        '${jogo.versao}',
        '${jogo.tamanho}',
        '${jogo.descricao}',
        '${jogo.foto_capa}',
        '${jogo.link}'
    )`
    //executa o script sql no banco de dados e aguarda o retorno do banco
    //so pode ter await em uma funcao se ela for async, e ela so pode ser async se ela precisa fazer uma requisicao que esta em outro servidor
    let result = await prisma.$executeRawUnsafe(sql) //enquanto o banco nao da uma devolutiva, nao passa para a proxima linha

    if (result)
        return true
    else
        return false
}

//Funcao para atualizar no Bnac de Dados um jogo existente
const updateJogo = async function () {
    
}

//Funcao para excluir no banco de dados um jogo existente
const deleteJogo = async function () {
    
}

//Funcao para retornar do banco de dados uma lista jogos
const selectAllJogo = async function () {
    
}

//Funcao para buscar no banco de dados um jogo pelo id
const selectByIdJogo = async function () {
    
}


module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}

