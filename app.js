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
const controllerSexo = require('./controller/jogo/controllerSexo.js')

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


//controle para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function(request, response){
        //chama a função para listar os jogos
        let resultJogo = await controllerJgo.listarJogo()

        response.status(resultJogo.status_code)
        response.json(resultJogo)

})

//end point para listar todos os sexos
app.get('/v1/controle-jogos/sexos', cors(), async function(request, response){
        //chama a função para listar os sexos

        let resultSexo = await controllerSexo.listarSexo()
        response.status(resultSexo.status_code)
        response.json(resultSexo)
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
app.post('v1/controle-jogos/sexo', cors(), bodyParserJSON, async function(request, response){
        //recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']
        //recebe os conteudos do body da requisição
        let dadosBody = request.body
        //Encaminhando os dados da requisição para controller inserir no BD
        let resultSexo = await controllerSexo.insertSexo(dadosBody, contentType)

        response.status(resultSexo.status_code)
        response.json(resultSexo)
})





app.listen(8080, function(){
        console.log('API aguardando requisições')
})