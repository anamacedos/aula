/*****************************************************************************************************
 * Objetivo: API referente ao projeto de controle de jogos 
 * Data: 1302/2025
 * Autor: Ana Julia Macedo
 * Versao: 1.0
 * Observacao: 
 ****** Para configurar e instalar a API precisamos das seguintes bibliotecas:
        Express             npm install express --save
        Cors                npm install cors --save
        body-parser         npm install body-parser --save
****** Para configurar e instalar o acesso ao banco de dados precisamos:
        prisma              npm install prisma --save -> faz a conexao com o banco
        prisma/client       npm install @prisma/cliente --save -> Executa Scripts no Banco
****** Após a instalação do prisma e prisma client, devemos:
        npx prisma init (inicializar o prisma no projeto  )
****** Para realizar o sincronismo do prisma com o banco de dados, devemos executar o seguinte comando:
        npx prisma migrate dev        
 ******************************************************************************************************/
//import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require ('body-parser')
const controllerJgo = require("./controller/jogo/controllerJogo.js")
const controllerSexo = require('./controller/sexo/controllerSexo.js')
const controllerCategoria = require('./controller/categoria/controllerCategoria.js')
const controllerPlataforma = require('./controller/plataforma/controllerplataforma.js')
const controllerIdioma = require('./controller/idioma/controllerIdioma.js')
const controllerClassificacaoEtaria = require('./controller/classificacaoEtaria/controllerClassificacaoEtaria.js')

//estaelecendo o formato de dados que deverá chegar no body da requisição (post ou put)
const bodyParserJSON = bodyParser.json()

//cria o objeto app para criar a API
const app = express()

//configurações do cors
app.use((request, response, next) => {
        response.header('Acess-Control_Alow-Origin', '*')
        response.header('Acess-Control_Alow-Origin', 'GET, POST, PUT, DELETE, OPITIONS')

        app.use(cors())
        next()
})




//end ponit para inserir um jogo no banco de dados
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function(request, response){

        //console.log(request.headers) //printa o cabeçalho (header), com as informações da requisição, como quem pediu e também o formato da requisição (content-type)

        //recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //recebe o conteudos do body da requisição
        let dadosBody = request.body

        //Ecaminhando os dados da requisição para controller inserir no BD
        let resultJogo = await controllerJgo.insertJogo(dadosBody, contentType)

        response.status(resultJogo.status_code)
        response.json(resultJogo)


})




//endpoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function(request, response){
        //chama a função para listar os jogos
        let resultJogo = await controllerJgo.listarJogo()

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})




//endponit para retornar um jogo com base no seu id
app.get('/v1/controle-jogos/jogo/:id', cors(), async function(request, response){
        //recebe o id do jogo na requisição
        let idJogo = request.params.id
        let resultJogo = await controllerJgo.buscarJogo(idJogo)

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})





//endpoint para ecluir um jogo com base no seu id
app.delete('/v1/controle-jogos/deletjogo/:id', cors(), async function(request, response){
        let idJogo = request.params.id
        let resultJogo = await controllerJgo.excluirJogo(idJogo)

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})

//endponit para excluir um idioma pelo id
app.delete('/v1/controle-jogos/deletidioma/:id', cors(), async function(request, response){
        let idIdioma = request.params.id
        let resultIdioma = await controllerIdioma.excluirIdioma(idIdioma)

        response.status(resultIdioma.status_code)
        response.json(resultIdioma)
})



//end point para atualizar o jogo
app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function(request, response){ //post e put é necessario o bodyparserJson, pois sao os 2 verbos que chegam dados pelo corpo

        //recebe o content type da requisição
        let contentType = request.headers['content-type']
        //recebe o id do jogo
        let idJogo = request.params.id
        //recebe os dados do jogo encaminhado do body da requisição
        let dadosBody = request.body 

        let resultJogo = await controllerJgo.atualizarJogo(dadosBody, idJogo, contentType)

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})






/*****************************************************************
 * Tabela de sexo
*****************************************************************/

//end point para inserir um novo sexo no banco de dados
app.post('/v1/controle-jogos/sexo', cors(), bodyParserJSON, async function(request, response){
        //recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']
        //recebe os conteudos do body da requisição
        let dadosBody = request.body
        //Encaminhando os dados da requisição para controller inserir no BD
        let resultSexo = await controllerSexo.insertSexo(dadosBody, contentType)

        response.status(resultSexo.status_code)
        response.json(resultSexo)
})

//end point para listar todos os sexos
app.get('/v1/controle-jogos/sexos', cors(), async function(request, response){
        //chama a função para listar os sexos

        let resultSexo = await controllerSexo.listarSexo()
        response.status(resultSexo.status_code)
        response.json(resultSexo)
})

//endpoint parar retornar um sexo com base no seu id
app.get('/v1/controle-jogos/sexo/:id', cors(), async function(request, response){
        //recebe o id do sexo na requisição
        let idSexo = request.params.id
        let resultSexo = await controllerSexo.buscarSexo(idSexo)

        response.status(resultSexo.status_code)
        response.json(resultSexo)
})

//end point para deletar um sexo com base no seu id
app.delete('/v1/controle-jogos/deletsexo/:id', cors(), async function(request, response){
        let idSexo = request.params.id
        let resultSexo = await controllerSexo.deleteSexo(idSexo)

        response.status(resultSexo.status_code)
        response.json(resultSexo)
})


//endpoint para atualizar um sexo
app.put('/v1/controle-jogos/sexo/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let idSexo = request.params.id
        let dadosBody = request.body

        let resultSexo = await controllerSexo.updateSexo(dadosBody, idSexo, contentType)

        response.status(resultSexo.status_code)
        response.json(resultSexo)
})



/*****************************************************************
 * Tabela de categoria
*****************************************************************/

//end point para inserir uma nova categoria no banco de dados
app.post('/v1/controle-jogos/categoria', cors(), bodyParserJSON, async function(request, response){

        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let resultCategoria = await controllerCategoria.insertCategoria(dadosBody, contentType)
        response.status(resultCategoria.status_code)
        response.json(resultCategoria)
})




//endpoint para retornar uma lista de categorias
app.get('/v1/controle-jogos/categorias', cors(), async function(request, response){
        let resultCategorias = await controllerCategoria.listarCategorias()

        response.status(resultCategorias.status_code)
        response.json(resultCategorias)
})

//endponit para retornar uma categoria com base no seu id

app.get('/v1/controle-jogos/categoria/:id', cors(), async function(request, response){
        let idCategoria = request.params.id
        let resultCategoria = await controllerCategoria.bucarCategoria(idCategoria)

        response.status(resultCategoria.status_code)
        response.json(resultCategoria)
})

//endpoint para atualizar uma categoria
app.put('/v1/controle-jogos/categoria/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let idCategoria = request.params.id
        let dadosBody = request.body

        let resultCategoria = await controllerCategoria.atualizarCategoria(dadosBody, idCategoria, contentType)

        response.status(resultCategoria.status_code)
        response.json(resultCategoria)
})

//endpoint para excluir uma categoria com base no seu id
app.delete('/v1/controle-jogos/deletecategoria/:id', cors(), async function(request, response){
        let idCategoria = request.params.id
        let resultCategoria = await controllerCategoria.excluirCategoria(idCategoria)

        response.status(resultCategoria.status_code)
        response.json(resultCategoria)
})




/*****************************************************************
 * Tabela de plataforma
*****************************************************************/


//endpoint para retornar uma lista de plataformas


//endpoint para inserir uma plataforma no banco
app.post('/v1/controle-jogos/plataforma', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let resulPlataforma = await controllerPlataforma.insertPlataforma(dadosBody, contentType)
        response.status(resulPlataforma.status_code)
        response.json(resulPlataforma)
})

//endpoint para listar todas as plataformas
app.get('/v1/controle-jogos/plataforma', cors(), async function(request, response){
        let resultPlataforma = await controllerPlataforma.listarPlataformas()
        response.status(resultPlataforma.status_code)
        response.json(resultPlataforma)
})

//ENDPOINT PARAR LISTAR UMA PLATAFORMA COM BASE NO SEU ID
app.get('/v1/controle-jogos/plataforma/:id', cors(), async function(request, response){
        let idPlataforma = request.params.id
        let resultPlataforma = await controllerPlataforma.buscarPlataforma(idPlataforma)

        response.status(resultPlataforma.status_code)
        response.json(resultPlataforma)
})


//endpoint para atualizar uma plataforma
app.put('/v1/controle-jogos/plataforma/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let idPlataforma = request.params.id
        let dadosBody = request.body

        let resulPlataforma = await controllerPlataforma.atualizarPlataforma(dadosBody, idPlataforma, contentType)

        response.status(resulPlataforma.status_code)
        response.json(resulPlataforma)
})



//endpoint para excluir uma plataforma com base no seu id
app.delete('/v1/controle-jogos/deletplataforma/:id', cors(), async function(request, response){
        let idPlataforma = request.params.id
        let resultPlataforma = await controllerPlataforma.excluirPlataforma(idPlataforma)

        response.status(resultPlataforma.status_code)
        response.json(resultPlataforma)
})


/*****************************************************************
 * Tabela de idioma
*****************************************************************/


//endpoint para inserir um idioma no banco
app.post('/v1/controle-jogos/idioma', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let resultIdioma = await controllerIdioma.insertIdioma(dadosBody, contentType)

        response.status(resultIdioma.status_code)
        response.json(resultIdioma)
})

//Endpoint para retornar uma lista de idiomas

app.get('/v1/controle-jogos/idioma', cors(), async function(request, response){
        let resultIdioma = await controllerIdioma.listarIdioma()

        response.status(resultIdioma.status_code)
        response.json(resultIdioma)
})

//endpoint para retornar um idioma com base no seu id
app.get('/v1/controle-jogos/idioma/:id', cors(), async function(request, response){
        //recebe o id do jogo na requisição
        let idIdioma = request.params.id
        let resultIdioma = await controllerIdioma.buscarIdioma(idIdioma)

        response.status(resultIdioma.status_code)
        response.json(resultIdioma)
})

//endpoint para atualizar um idioma
app.put('/v1/controle-jogos/idioma/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        //recebe o id do jogo
        let idIdioma = request.params.id

        let dadosBody = request.body 

        let resultIdioma = await controllerIdioma.atualizarIdioma(dadosBody, idIdioma, contentType)

        response.status(resultIdioma.status_code)
        response.json(resultIdioma)
})

/*****************************************************************
 * Tabela de classificação etária
*****************************************************************/

//endpoint para inserir uma classificação etária
app.post('/v1/controle-jogos/classificacaoetaria', cors(), bodyParserJSON, async function(request, response){

        let contentType = request.headers['content-type']
        let dadosBody = request.body
        let resultClassificacaoEtaria = await controllerClassificacaoEtaria.insertClassificacaoEtaria(dadosBody, contentType)
        response.status(resultClassificacaoEtaria.status_code)
        response.json(resultClassificacaoEtaria)
})

//endpoint para retornar uma lista de classificacoes etarias
app.get('/v1/controle-jogos/classificacaoetaria', cors(), async function(request, response){
        //chama a função para listar os jogos
        let resultClassificacaoEtaria = await controllerClassificacaoEtaria.listarClassificacaoEtaria()

        response.status(resultClassificacaoEtaria.status_code)
        response.json(resultClassificacaoEtaria)

})

//endpoint para retornar uma classificacao com base no seu id
app.get('/v1/controle-jogos/classificacaoetaria/:id', cors(), async function(request, response){
        //recebe o id do jogo na requisição
        let idClassificacao = request.params.id
        let resultClassificacaoEtaria = await controllerClassificacaoEtaria.buscarClassificacaoEtaria(idClassificacao)

        response.status(resultClassificacaoEtaria.status_code)
        response.json(resultClassificacaoEtaria)
})

//end point para atualizar uma classificação etaria
app.put('/v1/controle-jogos/classificacaoetaria/:id', cors(), bodyParserJSON, async function(request, response){
        let contentType = request.headers['content-type']
        let idClassificacao = request.params.id
        let dadosBody = request.body

        let resultClassificacaoEtaria= await controllerClassificacaoEtaria.atualizarClassificacaoEtaria(dadosBody, idClassificacao, contentType)

        response.status(resultClassificacaoEtaria.status_code)
        response.json(resultClassificacaoEtaria)
})

//endpoint para excluir uma classificacao etaria pelo id
app.delete('/v1/controle-jogos/deletclassificacaoetaria/:id', cors(), async function(request, response){
        let idClassificacao = request.params.id
        let resultClassificacaoEtaria = await controllerClassificacaoEtaria.excluirClassificacaoEtaria(idClassificacao)

        response.status(resultClassificacaoEtaria.status_code)
        response.json(resultClassificacaoEtaria)
})

app.listen(8080, function(){
        console.log('API aguardando requisições')
})