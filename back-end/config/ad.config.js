const ActiveDirectory = require('activedirectory');
// var username = 'fmanirambona@bije.bi';
var username = 'econtroller@bije.bi';
var url= 'ldap://10.250.30.100';
var password = 'Bije2020*';
var domain = "bije.bi";
var searchBase = 'dc=bije,dc=bi';
const ldap = require('ldapjs');

var client = ldap.createClient({
    url: url,
    bindDN: searchBase,
    timeout: 5000,
    connectTimeout: 10000,
    reconnect: true
});
client.on('error', function(){
    client.unbind(function(){
        client.destroy();
     });
});



const config = { url: url,
               baseDN: searchBase,
               username: username,
               password: password,
               timeLimit:3 
            }
const ad = new ActiveDirectory(config);

// module.exports = ad;

module.exports = {
    username:username,
    password:password,
    domain:domain,
    searchBase:searchBase,
    client:client,
    ad:ad
  }