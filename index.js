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

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);

  agent.handleRequest(intentMap);
});

app.listen(3300, () => {
  console.log("Servidor en ejecución en el puerto 3300");
});
