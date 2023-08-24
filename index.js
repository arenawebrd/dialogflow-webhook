const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "arenaweb_bot-dialogflow",
  user: "mysql",
  password: "Titan120486",
  database: "arenaweb",
});

connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos: ", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

app.post("/webhook", (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add("¡Hola! ¿En qué puedo ayudarte?");
  }

  function fallback(agent) {
    agent.add("Lo siento, no puedo responder a eso en este momento.");
  }

  function insertData(agent) {
    const nombre = agent.parameters.nombre;
    const telefono = agent.parameters.telefono;
    const cedula = agent.parameters.cedula;

    const query =
      "INSERT INTO Registro (nombre, telefono, cedula) VALUES (?, ?, ?)";
    connection.query(
      query,
      [nombre, telefono, cedula],
      (error, results) => {
        if (error) {
          console.error("Error al insertar datos: ", error);
          agent.add("Hubo un error al insertar los datos.");
        } else {
          console.log("Datos insertados correctamente");
          agent.add(
            "Los datos se han insertado correctamente en la base de datos."
          );
        }
      }
    );
  }

  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("InsertData", insertData);

  agent.handleRequest(intentMap);
});

app.listen(3300, () => {
  console.log("Servidor en ejecución en el puerto 3300");
});
