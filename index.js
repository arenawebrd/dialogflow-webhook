const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add("¡Hola! ¿En qué puedo ayudarte?");
  }

  function fallback(agent) {
    agent.add("Lo siento, no puedo responder a eso en este momento.");
  }

  function connectToDatabase(){
    const connection = mysql.createConnection({
      host     : 'arenaweb_bot-dialogflow',
      user     : 'mysql',
      password : 'Titan120486',
      database : 'arenaweb'
    });
    return new Promise((resolve,reject) => {
       connection.connect();
       resolve(connection);
    });
  }
  
  function queryDatabase(connection){
    return new Promise((resolve, reject) => {
      connection.query('YOUR_SQL_QUERY', (error, results, fields) => {
        resolve(results);
      });
    });
  }

   function insertIntoDatabase(connection, data){
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Registro SET ?', data, (error, results, fields) => {
        resolve(results);
      });
    });
  }
  
  function updateDatabase(connection, data){
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET ? WHERE email = ?`, [data, data.email], (error, results, fields) => {
        resolve(results);
      });
    });
  }

  function deleteFromDatabase(connection, email){
    return new Promise((resolve, reject) => {
      connection.query(`DELETE from users WHERE email = ?`, email, (error, results, fields) => {
        resolve(results);
      });
    });
  }
  
  function handleReadFromMySQL(agent){
    const user_email = agent.parameters.email;
    return connectToDatabase()
    .then(connection => {
      return queryDatabase(connection)
      .then(result => {
        console.log(result);
        result.map(user => {
          if(user_email === user.email){
            agent.add(`First Name: ${user.first_name} and Last Name: ${user.last_name}`);
          }
        });        
        connection.end();
      });
    });
  }

  function handleWriteIntoMysql(agent){
    const data = {
      Nombre: "agent.parameter.nombre",
      Telefono: "agent.parameter.telefono",
      Cedula: "agent.parameter.cedula"
    };
    return connectToDatabase()
    .then(connection => {
      return insertIntoDatabase(connection, data)
      .then(result => {
 		agent.add(`La informacin se ha agregado con exito`);       
        connection.end();
      });
    });
  }
  
  function handleUpdateMysql(agent){
    const data = {
      first_name: "Anshul",
      last_name: "Random",
      email: "sample@email.com"
    };
    return connectToDatabase()
    .then(connection => {
      return updateDatabase(connection, data)
      .then(result => {
 		agent.add(`Data updated`);       
        connection.end();
      });
    });
  }
  
  function handleDeleteFromMysql(agent){
    const email = "sample@email.com";
    return connectToDatabase()
    .then(connection => {
      return deleteFromDatabase(connection, email)
      .then(result => {
 		agent.add(`Data deleted`);       
        connection.end();
      });
    });
  }


  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
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
