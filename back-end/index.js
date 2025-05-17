const http = require('http');
const app = require('./app');

online_url="http://localhost:4201/#/"


const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '82');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // const address = server.address();
  const address = 'localhost';
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};



const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const Model = require("./models/model");
  
// app = express();
// async function cron_job() {
//   try {

//   const query={query:"SELECT * from conge_validation cv join utilisateur ut on cv.ID_POST=ut.ID_POSTE join conge_demande cd on cv.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE where cd.STATUT=0"}
//   var result = await Model.getRequest(query)
//   // console.log(result)
//   await Promise.all(result.map(async vl => {
  
//     var poste=await Model.getOne({table:"poste",culomn:{"ID_POSTE":vl['ID_POST']}})
//     var conge=await Model.getOne({table:"conge_demande",culomn:{"ID_CONGE_DEMAMDE":vl['ID_CONGE_DEMAMDE']}})
//     var user=await Model.getOne({table:"utilisateur",culomn:{"ID":conge[0].USER_ID}})

    
//     if (user[0].GENRE=='2') {
//       var sujet="elle "
//   }else  var sujet="il "
//   // console.log(sujet)
//       // ---------------EMAIL---------------------------------------
      
//       var transporter = require("./config/email.config");

//       var mailOptions = {
//       from: 'rh@bije.bi',
//       to: vl['EMAIL'],
//       subject: 'DEMENDE DE CONGE',
//       text: " ",
//       html:"Monsieur/Madame "+poste[0].DESCRIPTION_POSTE+", Veuillez réagir sur la demande de congé de l'employé "+user[0].NOM+" "+user[0].PRENOM+" ("+user[0].MATRICULE+") qu'"+sujet+" a soumis.\n\n <a href='"+online_url+"notifications/traiter_conge/"+vl['ID_CONGE_DEMAMDE']+"'>Prière de Cliquer ici pour plus d'information</a>"
//   };

//       transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//           console.log(error);
//       } else {
//           // console.log('Email sent: ' + vl['EMAIL']);
//       }
//       });
//   }))

//   const query1={query:"SELECT * from conge_iterim_user ciu join conge_validation cv on ciu.ID_CONGE_DEMAMDE=cv.ID_CONGE_DEMAMDE  join conge_demande cd on cv.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE where cd.STATUT=0"}
//   var result1 = await Model.getRequest(query)

  
//   await Promise.all(result1.map(async vl1 => {
  
//     var poste1=await Model.getOne({table:"poste",culomn:{"ID_POSTE":vl1['ID_POST']}})
//     var conge1=await Model.getOne({table:"conge_demande",culomn:{"ID_CONGE_DEMAMDE":vl1['ID_CONGE_DEMAMDE']}})
//     var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":conge1[0].USER_ID}})
    
    
//     if (user1[0].GENRE=='2') {
//       var sujet="elle "
//   }else  var sujet="il "
//   // console.log(sujet)
//       // ---------------EMAIL---------------------------------------
      
//       var transporter = require("./config/email.config");

//       var mailOptions = {
//       from: 'rh@bije.bi',
//       to: vl1['EMAIL'],
//       subject: 'DEMENDE DE CONGE',
//       text: " ",
//       html:"Monsieur/Madame "+poste1[0].DESCRIPTION_POSTE+" A.I, Veuillez réagir sur la demande de congé de l'employé "+user1[0].NOM+" "+user1[0].PRENOM+" ("+user1[0].MATRICULE+") qu'"+sujet+" a soumis.\n\n <a href='"+online_url+"notifications/traiter_conge/"+vl1['ID_CONGE_DEMAMDE']+"'>Prière de Cliquer ici pour plus d'information</a>"
//   };

//       transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//           console.log(error);
//       } else {
//           console.log('Email sent: ' + vl['EMAIL']);
//       }
//       });
    
//   }))


// } catch (e) {

//   console.log(e.message)
// }
// }
  
// //--------- Setting a cron job
// cron.schedule("0 0 */3 * * *",async function() {
//   // cron.schedule("* * * * *",async function() {
//                 cron_job()
//                 // console.log("yes")
// });



server.listen(port);


