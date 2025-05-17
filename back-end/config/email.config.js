var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
host: 'www.bije.bi',
port: 465,
secure: true,
auth: {
    user: "rh@bije.bi",
    pass: "RHbije@2020"
},
});
module.exports = transporter