var username = 'fmanirambona@bije.bi';
var password = 'Ecirbaf@8891*';
var domain = "bije.bi";
var searchBase = 'dc=bije,dc=bi';
// const ldap = require('ldapjs');

// var client = ldap.createClient({
//     url: 'ldap://10.250.30.100',
//     bindDN: "dc=bije,dc=bi",
//     timeout: 5000,
//     connectTimeout: 10000
// });

module.exports = {
  username:username,
  password:password,
  domain:domain,
  searchBase:searchBase,
  client:''
}