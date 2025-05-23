/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a jogos no Banco de Dados
 * Data: 13/02/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()

//Fucao para inserir no Banco de Dados um novo jogo
const insertJogo = async function(jogo){ 
    try {
        
    

    let sql = `insert into tbl_jogo(
                                    nome,
                                    data_lancamento,
                                    versao,
                                    tamanho,
                                    descricao,
                                    foto_capa,
                                    link,
                                    id_classificacao_etaria

    )values(
        '${jogo.nome}',
        '${jogo.data_lancamento}',
        '${jogo.versao}',
        '${jogo.tamanho}',
        '${jogo.descricao}',
        '${jogo.foto_capa}',
        '${jogo.link}',
        '${jogo.id_classificacao_etaria}'
    )`
    // console.log(sql)
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

//Funcao para atualizar no Banco de Dados um jogo existente
const updateJogo = async function (jogo) {
    try {
        let sql = `update tbl_jogo set nome = '${jogo.nome}',
                                    data_lancamento = "${jogo.data_lancamento}",
                                    versao = "${jogo.versao}",
                                    tamanho = "${jogo.tamanho}",
                                    descricao = "${jogo.descricao}",
                                    foto_capa = "${jogo.foto_capa}",
                                    link = "${jogo.link}",
                                    id_classificacao_etaria = "${id_classificacao_etaria}"
                                    where id = ${jogo.id}`
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

//Funcao para excluir no banco de dados um jogo existente
const deleteJogo = async function (id) {
    try {
        let sql = `delete from tbl_jogo where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)  //query é para select com retornos de dados, e execute quando não tem retorno, no max dixendo se deu certo ou errado

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
    
    
}

//Funcao para retornar do banco de dados uma lista jogos
const selectAllJogo = async function () {
    try {

        //script sql para retornar os dados do BD
        let sql = `select * from tbl_jogo order by id desc`
        //para fazer select é o query, para insert, update ou delete é o execute

        //Executa o script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result //no select nao é return true pq tem que retornar os dados, por isso o result
        else
            return false

        
    } catch (error) {
        return false
    }
}

//Funcao para buscar no banco de dados um jogo pelo id
const selectByIdJogo = async function(id){
    try {
        let sql = `select * from tbl_jogo where id = ${id}`


        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        
    } catch (error) {
        return false
    }
    
}


module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}

