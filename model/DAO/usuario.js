/********************************************************************************
 * Objetivo: Model responsavel pelo CRUD de dados referente a usuarios no Banco de Dados
 * Data: 15/05/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 ********************************************************************************/
//Import da biblioteca do prisma client para executar scripts no banco de dados
const {PrismaClient} = require ('@prisma/client')

//instancia da classe do prisma client para gerar um objeto
const prisma = new PrismaClient()


//Fucao para inserir no Banco de Dados uma nova empresa
const insertUsuario = async function(usuario){ 
    try {
        
    

    let sql = `insert into tbl_usuario(
                                    nome,
                                    email,
                                    telefone,
                                    data_nascimento,
                                    telefone,
                                    senha,
                                    bio,
                                    foto_perfil,
                                    id_sexo,
    )values(
        '${usuario.nome}',
        '${usuario.email}',
        '${usuario.telefone}',
        '${usuario.data_nascimento}',
        '${usuario.telefone}',
        '${usuario.senha}',
        '${usuario.bio}',
        '${usuario.foto_perfil}',
        '${usuario.id_sexo}'
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

module.exports = {
    insertUsuario
}