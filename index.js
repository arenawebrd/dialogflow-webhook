const axios = require ("axios");
const express = require("express");
const app = express();
const { WebhookClient } = require("dialogflow-fulfillment");

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", express.json(), function (req, res) {
  const agent = new WebhookClient({ request: req, response: res });
  console.log("Dialogflow Request headers: " + JSON.stringify(req.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(req.body));

  // FUNCION PARA SACAR TIEMPO
  let date = new Date();
  let data = date.toLocaleString('es', {timeZone: "America/Santo_Domingo", hour: 'numeric', hour12: false });
   
      // FUNCIÓN SALUDOS AVANZADA
    function welcome(agent) {
    if(data >=5 && data <=11)
    agent.add('Hola 👩🏽‍🎤 Buen dia! ' +'\n'+'\n'+
             'Bienvenido(a) soy *Ana Bot*, escoja una opcion de abajo!' +'\n'+'\n'+
             '[1] Quiero saber mas'+'\n'+
             '[2] Asistir a un Curso Gratis'+'\n'+
             '[3] Entrar al Grupo Vip'+'\n'+
             '[4] Regalo Sorpresa');
    
    else if(data >=12 && data <=17)
      agent.add('Hola 👩🏽‍🎤 Buenas tardes!' +'\n'+'\n'+
            'Bienvenido(a) soy *Ana Bot*, escoja una opcion de abajo!' +'\n'+'\n'+
            '[1] Quiero saber mas'+'\n'+
            '[2] Asistir a un Curso Gratis'+'\n'+
            '[3] Entrar al Grupo Vip'+'\n'+
            '[4] Regalo Sorpresa');
    else 
      agent.add('Hola 👩🏽‍🎤 Buenas noche!' +'\n'+'\n'+
            'Bienvenido(a) soy *Ana Bot*, escoja una opcion de abajo!' +'\n'+'\n'+
            '[1] Quiero saber mas'+'\n'+
            '[2] Asistir a un Curso Gratis'+'\n'+
            '[3] Entrar al Grupo Vip'+'\n'+
            '[4] Regalo Sorpresa');
  }  

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function ProbandoWebhook(agent) {
    for (let i = 1; i <= 5; i++) {
      agent.add(`Esta es la respuesta: ` + i);
    }
  }

  if(intentName == 'Consultar'){
 var Cedula = request.body.queryResult.parameters['Cedula'];
 
 return axios.get("https://api.steinhq.com/v1/storages/634366c5d27cdd09f0c3c8a6/Citas").then(res => {
 res.data.map(person => {
 if (person.Cedula === Cedula)
 response.json({"fulfillmentText" :"Detalles de la consulta "+Cedula+":"+"\n"+
 "Nombre: "+person.Nombre+"\n"+ 
 "Fecha: "+person.Fecha});
 });
 }); 
 }
  
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("Consultar", Consultar);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

let port = 3300;
app.listen(port, () => {
  console.log("Estamos ejecutando el servidor en el puerto " + port);
});
