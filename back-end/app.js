const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Routes = require('./routes/routes');
const Routes_transport = require('./routes/routes.transport');
const Routes_mobile = require('./routes/route.mobile');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });
 var onFinished = require('on-finished')

 app.use(express.static("uploads"));
app.use('/routes', Routes);
app.use('/routes.transport', Routes_transport);
app.use('/routes.mobile', Routes_mobile);



module.exports = app;

