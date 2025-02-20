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

        //recebe o conteudos do body da requisição
        let dadosBody = request.body

        //Ecaminhando os dados da requisição para controller inserir no BD
        let resultJogo = await controllerJgo.insertJogo(dadosBody)

        response.status(resultJogo.status_code)
        response.json(resultJogo)


})

app.listen(8080, function(){
        console.log('API aguardando requisições')
})