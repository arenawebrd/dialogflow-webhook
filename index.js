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
