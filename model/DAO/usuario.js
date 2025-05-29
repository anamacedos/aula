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
                                    senha,
                                    bio,
                                    foto_perfil,
                                    id_sexo,
                                    id_idioma
    )values(
        '${usuario.nome}',
        '${usuario.email}',
        '${usuario.telefone}',
        '${usuario.data_nascimento}',
        '${usuario.senha}',
        '${usuario.bio}',
        '${usuario.foto_perfil}',
        '${usuario.id_sexo}',
        '${usuario.id_idioma}'
    )`
    //executa o script sql no banco de dados e aguarda o retorno do banco
    //so pode ter await em uma funcao se ela for async, e ela so pode ser async se ela precisa fazer uma requisicao que esta em outro servidor
    let result = await prisma.$executeRawUnsafe(sql) //enquanto o banco nao da uma devolutiva, nao passa para a proxima linha

    console.log(result);
    if (result)
        return true
    else
        return false
    } catch (error) {
        console.log(error)
    }
}

//Função para atualizar no Banco de Dados um usuario existente
const updateUsuario = async function (usuario) {
    try {
        let sql = `update tbl_usuario set nome = '${usuario.nome}',
                                    email = "${usuario.email}",
                                    telefone = "${usuario.telefone}",
                                    data_nascimento = "${usuario.data_nascimento}",
                                    senha = "${usuario.senha}",
                                    bio = "${usuario.bio}",
                                    foto_perfil = "${usuario.foto_perfil}",
                                    id_sexo = "${usuario.id_sexo}",
                                    id_idioma = "${usuario.id_idioma}"
                                    where id = ${usuario.id}`
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

//Funcao para buscar no banco de dados um usuario pelo id
const selectByIdUsuario = async function(id){
    try {
        let sql = `select * from tbl_usuario where id = ${id}`


        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
       
    } catch (error) {
        return false
    }
   
}

//Funcao para retornar do banco de dados uma lista usuarios
const selectAllUsuario = async function () {
    try {

        //script sql para retornar os dados do BD
        let sql = `select * from tbl_usuario order by id desc`
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

//Funcao para excluir no banco de dados um usuario existente
const deleteUsuario = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id = ${id}`
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
    insertUsuario,
    updateUsuario,
    selectByIdUsuario,
    selectAllUsuario,
    deleteUsuario
}