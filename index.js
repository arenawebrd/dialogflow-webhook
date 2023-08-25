const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

var connection = mysql.createConnection({
 host: process.env.MYSQL_HOST,
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASS,
 database: process.env.MYSQL_DB
 });
 connection.connect();

  function welcome(agent) {
    agent.add("¡Hola! ¿En qué puedo ayudarte?");
  }

  function fallback(agent) {
    agent.add("Lo siento, no puedo responder a eso en este momento.");
  }

  
if(intentName == 'writeDataIntoMysql'){
 console.log('Agregar Contacto')
 
 var nombre = request.body.queryResult.parameters['nombre'];
 var telefono = request.body.queryResult.parameters['telefono'];
 var cedula = request.body.queryResult.parameters['cedula'];
 var query = 'insert into Registro values ("'+nombre+'","'+telefono+'","'+cedula+'")';
 
 connection.query(query, function (error, results, fields) {
 if (error) throw error;
 connection.end();
 response.json({"fulfillmentText" :"El contacto se ha agregado con exito!" })
 }); 
}


  let intentMap = new Map();
  intentMap.set("Welcome", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set('getDataFromMySQL', handleReadFromMySQL);
  intentMap.set('writeDataIntoMysql', handleWriteIntoMysql);
  intentMap.set('updateMysql', handleUpdateMysql);
  intentMap.set('deleteFromMysql', handleDeleteFromMysql);

  agent.handleRequest(intentMap);
});

app.listen(3300, () => {
  console.log("Servidor en ejecución en el puerto 3300");
});
