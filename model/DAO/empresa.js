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

//Fucao para inserir no Banco de Dados um novo usuário
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