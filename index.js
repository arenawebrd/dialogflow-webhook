const express = require("express");
const axios = require ("axios");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add("¡Hola! ¿En qué puedo ayudarte?");
  }

 if(intentName == 'Consultar'){
 var Consulta = request.body.queryResult.parameters['Consulta'];
 
 return axios.get("https://api.steinhq.com/v1/storages/634366c5d27cdd09f0c3c8a6/Citas").then(res => {
 res.data.map(person => {
 if (person.Cedula === Cedula)
 response.json({"fulfillmentText" :"Detalles de la cedula "+Cedula+":"+"\n"+
 "Nombre: "+person.Nombre+"\n"+ 
 "Fecha: "+person.Fecha});
 });
 }); 
 }

  function fallback(agent) {
    agent.add("Lo siento, no puedo responder a eso en este momento.");
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
   intentMap.set("Consultar", consultar);
  intentMap.set("Default Fallback Intent", fallback);

  agent.handleRequest(intentMap);
});

app.listen(3300, () => {
  console.log("Servidor en ejecución en el puerto 3300");
});
