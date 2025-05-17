require('events').EventEmitter.prototype._maxListeners = 100;
const Model = require("../models/model");
const AD = require("../config/ad.config");
const e = require("express");
const { Console } = require('console');
var user_authentificated=[]





function encryptXor(text, key) {
    var result = '';

    for (var i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
}



var cript = function (pwd, key) {
    
        var pwd1= pwd.length;
        var key1 = key.length;

        if(key1>pwd1){

        // var key = substr(key,0,pwd1);
        var key =key.substring(0,pwd1)

        }else if (key1<pwd1){

        // var key = str_pad(key,pwd1,key,STR_PAD_RIGHT);
        var key =key.padEnd(pwd1,key)
        }
        // return pwd;
        var result=encryptXor(pwd,key);
        return result;
}

exports.authentification = async function (req, res) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var date = today.getDate();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    var fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date ).slice(-2)+" "+("0" + hour ).slice(-2)+":"+("0" + min ).slice(-2)+":"+("0" + sec ).slice(-2)
    
try {
    var username=req.body.username
    var pwd=req.body.pwd



    //LDAP
// var usrnm = AD.username;
// var password = AD.password;
// var domain = AD.domain;
// var searchBase = AD.searchBase;

// var client = AD.client



// client.bind(usrnm, password, function (err) {
//     if (err) {
//         client.on('error', function(){
        
//         });
//         // console.log(err);
//         client.unbind(function (err) {
            
//                 client.destroy();
             

//             if (!err) {
//                 // console.log('successfully unbind');
//             }
//             else {
//                 // console.log(err);
//             }
//         });
//     } else {
//         // console.log('authenticated');
//         // var searchResult = search();
//         var opts = {
//             filter:'(userPrincipalName='+username+')',
//             scope: 'sub',
//             attributes: ['sAMAccountName','userPrincipalName','name','givenName','distinguishedName','displayName','cn','sn',
//             'mail','title','description','department','company','manager',
//             'telephoneNumber','mobile','co','c','l','st','postalCode'],
//         };
//         // console.log(opts)
    
//         client.search(searchBase, opts, function(err, res) {
//             // assert.ifError(err);
//             if(err)console.log("erreur"+err)
          
//             res.on('searchEntry', function(entry) {
//                 // console.log('searchEntry');
//                 var user = entry.object;
//                 if(entry.object){
//                     // console.log('entry: %j ' + JSON.stringify(entry.object))
//                     user_authentificated=user
//                 }
//             });


//         });
//     }

// });
// client.on('error', function(){
//     client.unbind(function(){
//         client.destroy();
//      });
// });
//LDAP




        // console.log(req.body)


        if(username&&pwd){

        // Authenticate
        // AD.ad.authenticate(username, pwd,async function(err, auth) {

            // console.log(user_authentificated.userPrincipalName)
              // console.log('Authentication failed!');
              var psw=(cript(pwd, username))
                
              var user=await Model.getOne({table:"utilisateur",culomn:{"USERNAME":username,"PWD":psw}})
              var n1= Object.keys(user_authentificated).length
//               if (auth&&n1>0) {
// // console.log(user_authentificated)
//                 var user=await Model.getOne({table:"utilisateur",culomn:{"EMAIL":user_authentificated.userPrincipalName}})
//                 var n= Object.keys(user).length
//                 // console.log(user_authentificated)
//                 // if(user[0].STATUT==1){

//                         var tel=''

//                         if(user_authentificated.hasOwnProperty("telephoneNumber")) tel=user_authentificated.telephoneNumber
//                         if(user_authentificated.hasOwnProperty("mobile")) tel=user_authentificated.mobile
//                         var psw=(cript(pwd, user_authentificated.userPrincipalName))

//                         var infos={"NOM":user_authentificated.givenName,
//                         "PRENOM":user_authentificated.sn,
//                         "TELEPHONE":tel,
//                         "EMAIL":user_authentificated.userPrincipalName,
//                         "USERNAME":user_authentificated.userPrincipalName,
//                         "PWD":psw,
//                         "DATE_CONNECT":fullDate,
//                         "INTERNE_EXTERNE":"EXTERNE",
//                         }

//                         if(n==0){
        
//                             await Model.insert({table:"utilisateur",culomn:infos})
//                         }else{

//                             var condition={ID:user[0].ID}
//                             await Model.update({table:"utilisateur",culomn:infos,conditions:condition})
//                         }



//                         // console.log(username);
//                         user=await Model.getOne({table:"utilisateur",culomn:{"EMAIL":username}})
//                         var roles=await Model.getList({table:"utilisateurs_role",culomn:{"ID_UT":user[0].ID}})
//                         var r=[]
//                         var paths=[]
//                         // roles.forEach(val => {
//                         //     r.push(val['ID_ROLE'])
//                         // });
//                         await Promise.all(roles.map(async val => {
//                             //  roles.forEach(async val => {
//                                   r.push(val['ID_ROLE'])
                                  
//                                   const query={query:"SELECT* FROM role_url ru join url u on ru.ID_URL=u.ID_URL WHERE ru.ID_ROLE="+val['ID_ROLE']}
        
//                                     var result = await Model.getRequest(query)
                                    
//                                     result.forEach( val1 => {
//                                         paths.push(val1['LINK_URL'])
                                        
//                                     })                           
//                               }));
                    
                        
//                         return res.status(200).json({ status: 200, data: {ID:user[0].ID,NOM:user_authentificated.givenName,PRENOM:user_authentificated.sn,USERNAME:user_authentificated.userPrincipalName,TELEPHONE:user_authentificated.telephoneNumber,EMAIL:user_authentificated.userPrincipalName,PWD:pwd,PROFIL:r,paths:paths,TYPE_USER:'EXTERNE',FOTO:''}, message: "Succesfully Retrieved",response:"ok" });
                    
//                     // }else return res.status(200).json({ status: 200, message: "bloqué",response:"non" });
//             }
//               else  
              // console.log(user);
              if(user.length>0){
                    var user_role=await Model.getOne({table:"utilisateurs_role",culomn:{"ID_UT":user[0].ID,"ID_ROLE":1}})
                    var nr= Object.keys(user_role).length
                
                  if(user[0].STATUT==1||nr>0){

                      var roles=await Model.getList({table:"utilisateurs_role",culomn:{"ID_UT":user[0].ID}})
                      var r=[]
                      var paths=[]
                      
                      await Promise.all(roles.map(async val => {
                    //  roles.forEach(async val => {
                          r.push(val['ID_ROLE'])
                          
                          const query={query:"SELECT* FROM role_url ru  join url u on ru.ID_URL=u.ID_URL WHERE ru.ID_ROLE="+val['ID_ROLE']}

                            var result = await Model.getRequest(query)
                            
                            result.forEach( val1 => {
                                paths.push(val1['LINK_URL'])
                                
                            })                           
                      }));

              
                      return res.status(200).json({ status: 200, data: {ID:user[0].ID,NOM:user[0].NOM,PRENOM:user[0].PRENOM,USERNAME:username,TELEPHONE:user[0].TELEPHONE,EMAIL:user[0].EMAIL,PWD:pwd,PROFIL:r,paths:paths,TYPE_USER:user[0].INTERNE_EXTERNE,FOTO:user[0].FOTO}, message: "Succesfully Retrieved",response:"ok" });
                      
                  }else return res.status(200).json({ status: 200, message: "bloqué",FOTO:"",response:"non" });
              }


            else {
              
                return res.status(200).json({ status: 200, message: "no correct",response:"non" });
            }
        // });

        }else
        return res.status(200).json({ status: 200, message: "Veuiller verifier les champs obligatoire"});
    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message });
    }
  
}
exports.list_users_conge = async function (req, res) {

    const query={query:"SELECT u.ID as ID,u.NOM as NOM,PRENOM,MATRICULE,DATE_EMBAUCHE,USERNAME,SOLDE_CONGE_INITIAL,DATE_SOLDE_CONGE FROM utilisateur u WHERE u.STATUT=1"}

    try {
      // var users = await Model.getOne(table)
      var result = await Model.getRequest(query)
      var r={"data":[]}
      await Promise.all(result.map(async val => {

                        // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                        var action='<button id="'+val['ID']+'" class="btn btn-primary getModif" style="margin-right:10px">Changer</buton>'
                     
                        if(val['DATE_EMBAUCHE']){
                            var embauche = new Date(val['DATE_EMBAUCHE']);
                            var embauche_d = String(embauche.getDate()).padStart(2, '0')+"/"+String(embauche.getMonth() + 1).padStart(2, '0')+"/"+embauche.getFullYear();
    
                        }else var embauche_d =""
                        

                        if(val['DATE_SOLDE_CONGE']){
                            var date_solde = new Date(val['DATE_SOLDE_CONGE']);
                            var date_Solde1 = String(date_solde.getDate()).padStart(2, '0')+"/"+String(date_solde.getMonth() + 1).padStart(2, '0')+"/"+date_solde.getFullYear();
                        }else   var date_Solde1 = ""
 
                        r.data.push({UD:val['OU'],NAME:val['NOM']+" "+val['PRENOM'],USERNAME:val['USERNAME'],MATRICULE:val['MATRICULE'],DATE_EMBAUCHE:embauche_d,SOLDE:val['SOLDE_CONGE_INITIAL'],DATE_SOLDE:date_Solde1,ACTION:action})
                        
                    }));
                    
      return  res.status(200).json(r);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
    }


    exports.historique_de_mes_conges = async function (req, res) {

        const query={query:"SELECT* FROM conge_demande cd JOIN type_conges tc on cd.ID_TYPE_CONGE=tc.ID_TYPE_CONGE  WHERE USER_ID="+req.params.id+" ORDER BY cd.DATE_CREATION DESC"}
    // console.log(req.params.id)
        try {
            
          // var users = await Model.getOne(table)
          var result = await Model.getRequest(query)
        //   var conge_demande=await Model.getList({table:"conge_demande",culomn:{"USER_ID":req.params.id}})


        // console.log(result)
          var r={"data":[]}
          await Promise.all(result.map(async val => {
    
                            // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                            var action='<button id="'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-primary getModif" style="margin-right:10px">Détail</buton>'
                         
                           if (val['STATUT']==0) {
                              var statut="<span style='color:blue'>CREE</span>" 
                              var date="<span style='color:blue'>"+val['DATE_CREATION']+"</span>" 
                               action+='<button id="mod|'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-success getModif1" style="margin-right:10px">Modifier</buton><button id="supp|'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-danger getModif1" style="margin-right:10px">Supprimer</buton> '
                           }else  if (val['STATUT']==1) {
                            var statut="<span style='color:Green'>VALIDE</span>" 
                            var date="<span style='color:Green'>"+val['DATE_CREATION']+"</span>" 
                         }else  if (val['STATUT']==2) {
                            var statut="<span style='color:red'>REFUSE</span>" 
                            var date="<span style='color:red'>"+val['DATE_CREATION']+"</span>" 
                         }
                            
                           
                            r.data.push({ID_CONGE_DEMAMDE:val['ID_CONGE_DEMAMDE'],DATE_CREATION:date,MOTIF:val['MOTIF'],EXERCICES:val['EXERCICES'],ADRESSE_CONGE:val['ADRESSE_CONGE'],DATE_DEBUT:val['DATE_DEBUT'],DATE_FIN:val['DATE_FIN'],DATE_RETOUR:val['DATE_RETOUR'],STATUT:statut,NOMBRE:val['DUREE'],TYPE_CONGE:val['DESCRIPTION_CONGE'],ACTION:action})
                            
                        }));
                        
          return  res.status(200).json(r);
        } catch (e) {
          return res.status(400).json({ status: 400, message: e.message });
        }
        }

exports.list_users = async function (req, res) {

    const query={query:"SELECT u.ID as ID,u.NOM as NOM,PRENOM,TELEPHONE,EMAIL,USERNAME,MATRICULE,DATE_EMBAUCHE,u.ID_OU as ID_OU,u.INTERNE_EXTERNE as IEXT,serv.DESCRIPTION as OU,DESCRIPTION_POSTE FROM utilisateur u left join poste p on u.ID_POSTE=p.ID_POSTE left join services_ou serv on u.ID_SERVICE=serv.ID_SERVICE WHERE u.STATUT=1"}

    try {
      // var users = await Model.getOne(table)
      var result = await Model.getRequest(query)
      var r={"data":[]}
      await Promise.all(result.map(async val => {
                        const query1={query:"SELECT * from utilisateurs_role ur left join role r on ur.ID_ROLE=r.ID_ROLE where ID_UT="+val['ID']}
                        var result1 =await Model.getRequest(query1)
                        
                        var r1="";
                        result1.forEach(val1 => {
                            r1+="<br> -"+val1['DESCRIPTION_ROLE']
                        })
                        var type=val['IEXT']

                        // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                        var action='<button id="detail-'+val['ID']+'" class="btn btn-primary getDetails" style="margin-right:10px">Detail</buton>'
                        var action1='<button id="bloque-'+val['ID']+'" class="btn btn-danger getDetails" >Bloquer</buton>'
                        var action2='<button id="debloque-'+val['ID']+'" class="btn btn-info getDetails" >Débloquer</buton>'
                       
                        if(type=='EXTERNE'){type="<span style='color:blue'>ACTIVE DIRECTORY</span>"}else type="FROM DATABASE"
                        r.data.push({UD:val['OU'],TYPE:type,NAME:val['NOM']+" "+val['PRENOM'],MATRICULE:val['MATRICULE'],DATE_EMBAUCHE:val['DATE_EMBAUCHE'],TEL:val['TELEPHONE'],EMAIL:val['EMAIL'],USERNAME:val['USERNAME'],ROLES:r1,POSTE:val['DESCRIPTION_POSTE'],ACTION:action+" "+action1})
                        
                    }));
                    
      return  res.status(200).json(r);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
    }

exports.list_users_bloques = async function (req, res) {

        const query={query:"SELECT u.ID as ID,u.NOM as NOM,PRENOM,TELEPHONE,EMAIL,USERNAME,MATRICULE,DATE_EMBAUCHE,u.ID_OU as ID_OU,u.INTERNE_EXTERNE as IEXT,serv.DESCRIPTION as OU,DESCRIPTION_POSTE FROM utilisateur u left join poste p on u.ID_POSTE=p.ID_POSTE left join services_ou serv on u.ID_SERVICE=serv.ID_SERVICE WHERE u.STATUT=0"}
    
        try {
          // var users = await Model.getOne(table)
          var result = await Model.getRequest(query)
          var r={"data":[]}
          await Promise.all(result.map(async val => {
                            const query1={query:"SELECT * from utilisateurs_role ur left join role r on ur.ID_ROLE=r.ID_ROLE where ID_UT="+val['ID']}
                            var result1 =await Model.getRequest(query1)
                            
                            var r1="";
                            result1.forEach(val1 => {
                                r1+="<br> -"+val1['DESCRIPTION_ROLE']
                            })
                            var type=val['IEXT']
    
                            // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                            var action='<button id="detail-'+val['ID']+'" class="btn btn-primary getDetails" style="margin-right:10px">Detail</buton>'
                            var action1='<button id="bloque-'+val['ID']+'" class="btn btn-danger getDetails" >Bloquer</buton>'
                            var action2='<button id="debloque-'+val['ID']+'" class="btn btn-success getDetails" >Débloquer</buton>'
                           
                            if(type=='EXTERNE'){type="<span style='color:blue'>ACTIVE DIRECTORY</span>"}else type="FROM DATABASE"
                            r.data.push({UD:val['OU'],TYPE:type,NAME:val['NOM']+" "+val['PRENOM'],MATRICULE:val['MATRICULE'],DATE_EMBAUCHE:val['DATE_EMBAUCHE'],TEL:val['TELEPHONE'],EMAIL:val['EMAIL'],USERNAME:val['USERNAME'],ROLES:r1,POSTE:val['DESCRIPTION_POSTE'],ACTION:action+" "+action2})
                            
                        }));
                        
          return  res.status(200).json(r);
        } catch (e) {
          return res.status(400).json({ status: 400, message: e.message });
        }
}

    exports.chargeAD = async function (req, res) {
        // const table={table:"defaut_parametre_couleur",culomn:{id:1}}
        
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var date = today.getDate();
        var hour = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
    
        var fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date ).slice(-2)+" "+("0" + hour ).slice(-2)+":"+("0" + min ).slice(-2)+":"+("0" + sec ).slice(-2)
        
    try {
        
   //LDAP
   var usrnm = AD.username;
   var password = AD.password;
   var domain = AD.domain;
   var searchBase = AD.searchBase;
   
   var client = AD.client
   client.on('error', function(){
        
    });

   client.bind(usrnm, password, function (err) {
       if (err) {
        client.on('error', function(){
            
                client.destroy();
            
        });
        //    console.log(err);
           client.unbind(function (err) {
            
                client.destroy();
            
               if (!err) {
                //    console.log('successfully unbind');
               }
               else {
                //    console.log(err);
               }
           });
        //    console.log(err);
           return res.status(200).json({ status: 200, data: {},response:"non" });
       } else {
           // console.log('authenticated');
           // var searchResult = search();
           var opts = {
               filter:'(&(objectClass=organizationalPerson))',
               scope: 'sub',
               attributes: ['sAMAccountName','userPrincipalName','name','givenName','distinguishedName','displayName','cn','sn',
               'mail','title','description','department','company','manager',
               'telephoneNumber','mobile','co','c','l','st','postalCode','objectClass','objectCategory','objectSid','primaryGroupID'],
               
            //    attributes: ['*'],
           };
           // console.log(opts)
       
           client.search(searchBase, opts,async function(err, res) {
               // assert.ifError(err);
            //    if(err)console.log("erreur"+err)
             
               res.on('searchEntry',async function(entry) {
                   // console.log('searchEntry');
                   var user = entry.object;
                   if(entry.object){
                    if(user.hasOwnProperty("userPrincipalName")){
                    //    console.log(JSON.stringify(user))
                    var user1=await Model.getOne({table:"utilisateur",culomn:{"EMAIL":user.userPrincipalName}})
                    var n= Object.keys(user1).length
                    // console.log(n)
    
    
                    var tel=''
    
                    if(user.hasOwnProperty("telephoneNumber")) tel=user.telephoneNumber
                    if(user.hasOwnProperty("mobile")) tel=user.mobile
                    // var psw=(cript(pwd, user_authentificated.userPrincipalName))
    
                    var infos={"NOM":user.givenName,
                    "PRENOM":user.sn,
                    "TELEPHONE":tel,
                    "EMAIL":user.userPrincipalName,
                    "USERNAME":user.userPrincipalName,
                    "PWD":'',
                    "DATE_CONNECT":fullDate,
                    "INTERNE_EXTERNE":"EXTERNE",
                  
                }
                    if(n==0){
     
                        await Model.insert({table:"utilisateur",culomn:infos})
                    }else{
    
                        var condition={ID:user1[0].ID}
                        await Model.update({table:"utilisateur",culomn:infos,conditions:condition})
                    }
    
    
                        }
                    }
               });
   
   
           });
           return res.status(200).json({ status: 200, data: {},response:"ok" });
       }
   
   });
   client.on('error', function(){
    client.unbind(function(){
        client.destroy();
     });
});
   //LDAP
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.addUser = async function (req, res) {

    try {
        
        object_prof = JSON.parse(req.body.profil);
        // console.log(req.body)
        var base64Data = req.body.blob.replace(/^data:image\/png;base64,/, "");
        var foto="uploads/profiles/"+new Date().getTime()+".png"

        require("fs").writeFile(foto, base64Data, 'base64', function(req,err) {
        // console.log(err);
        });
        var psw=(cript(req.body.pwd, req.body.username))
        // console.log(req.body.service1)
        if(req.body.service1){
            var serv=req.body.service1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
            var infos_service={"DESCRIPTION":serv}
            var check_servi=await Model.getOne({table:"services_ou",culomn:infos_service})
            
                var n= Object.keys(check_servi).length
                if(n>0){
                    
                    id_service=check_servi[0].ID_SERVICE
                }else
            id_service=await Model.insert({table:"services_ou",culomn:infos_service})

        }else id_service=req.body.service

        if(req.body.poste1){
            var post=req.body.poste1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
            var infos_post={"DESCRIPTION_POSTE":post,"ID_SERVICE":req.body.service}
            var check_post=await Model.getOne({table:"poste",culomn:infos_post})
            
            var n= Object.keys(check_post).length
            if(n>0){
                id_post=check_post[0].ID_POSTE
            }else
            id_post=await Model.insert({table:"poste",culomn:infos_post})

        }else id_post=req.body.poste

            var infos={"NOM":req.body.nom,
            "PRENOM":req.body.prenom,
            "TELEPHONE":req.body.tel,
            "EMAIL":req.body.email,
            "USERNAME":req.body.username,
            "PWD":psw,
            "ID_SERVICE":id_service,
            "ID_POSTE":id_post,
            "DATE_EMBAUCHE":req.body.date,
            "MATRICULE":req.body.matricule,
            "FOTO":foto
            }


        var check_user=await Model.getOne({table:"utilisateur",culomn:{"USERNAME":req.body.username}})
                var n= Object.keys(check_user).length
            
            if(n>0){
                return res.status(200).json({ status: 200, response:"non",message:"exist" });
            }else{

            var id_user=await Model.insert({table:"utilisateur",culomn:infos})

            object_prof.forEach(async val =>  {
                if(val)
                await Model.insert({table:"utilisateurs_role",culomn:{"ID_UT":id_user,"ID_ROLE":val}})
            });

            return res.status(200).json({ status: 200, response:"ok" });
        }

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.insert_first_user = async function (req, res) {

    try {
        
      
        var psw=(cript(req.body.pwd, req.body.username))


            var infos={"NOM":req.body.nom,
            "PRENOM":req.body.prenom,
            "TELEPHONE":req.body.tel,
            "EMAIL":req.body.email,
            "USERNAME":req.body.username,
            "PWD":psw,
            }



            var id_user=await Model.insert({table:"utilisateur",culomn:infos})


                await Model.insert({table:"utilisateurs_role",culomn:{"ID_UT":id_user,"ID_ROLE":1}})

                var user=await Model.getOne({table:"utilisateur",culomn:{"USERNAME":req.body.username,"PWD":psw}})

                var roles=await Model.getList({table:"utilisateurs_role",culomn:{"ID_UT":user[0].ID}})
                var r=[]
                var r=[]
                var paths=[]
                // roles.forEach(val => {
                //     r.push(val['ID_ROLE'])
                // });
                await Promise.all(roles.map(async val => {
                    //  roles.forEach(async val => {
                          r.push(val['ID_ROLE'])
                          
                          const query={query:"SELECT* FROM role_url ru join url u on ru.ID_URL=u.ID_URL WHERE ru.ID_ROLE="+val['ID_ROLE']}

                            var result = await Model.getRequest(query)
                            
                            result.forEach( val1 => {
                                paths.push(val1['LINK_URL'])
                                
                            })                           
                      }));
                // roles.forEach(val => {
                //     r.push(val['ID_ROLE'])
                // });
            
                                                                //  {ID:user[0].ID,NOM:user[0].NOM,PRENOM:user[0].PRENOM,USERNAME:username,TELEPHONE:user[0].TELEPHONE,EMAIL:user[0].EMAIL,PWD:pwd,PROFIL:r,paths:paths,TYPE_USER:user[0].INTERNE_EXTERNE,FOTO:user[0].FOTO}
                return res.status(200).json({ status: 200, data: {ID:user[0].ID,NOM:user[0].NOM,PRENOM:user[0].PRENOM,USERNAME:req.body.username,TELEPHONE:user[0].TELEPHONE,EMAIL:user[0].EMAIL,PWD:req.body.pwd,PROFIL:r,paths:paths,TYPE_USER:user[0].INTERNE_EXTERNE,FOTO:user[0].FOTO}, message: "Succesfully Retrieved",response:"ok" });

        

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.updateUser = async function (req, res) {
    

    try {
        var user=await Model.getOne({table:"utilisateur",culomn:{ID:req.body.id}})
        object_prof = JSON.parse(req.body.profil);
        // console.log(req.body)'
        const Jimp = require("jimp");
  

        var foto=""
        var signature=""
       if(req.body.blob.includes("data:image")) 
       {

            var base64Data = req.body.blob.replace(/^data:image\/png;base64,/, "");
            var foto="uploads/profiles/"+new Date().getTime()+".png"
            

            require("fs").writeFile(foto, base64Data, 'base64', function(req,err) {
            // console.log(err);
            });

            // Read the PNG file and convert it to editable format
            var jpg_foto=foto.replace("png","jpg")
Jimp.read(foto, function (err, image) {
    if (err) {

        console.log(err);
        return;
    }
    image.background(0xFFFFFFFF);
    image.write(jpg_foto);
});
foto=jpg_foto

var new_foto=user[0].FOTO.replace("jpg","png")
            if (user[0].FOTO) {
                
                require("fs").unlink(user[0].FOTO, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                  
                    //file removed
                  })
                  require("fs").unlink(new_foto, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                  
                    //file removed
                  })
            }
        }

        if(req.body.signature.includes("data:image")) 
        {
 
            
             var base64Data_sign = req.body.signature.replace(/^data:image\/png;base64,/, "");
             var signature="uploads/signatures/s"+new Date().getTime()+".png"
             
 
             require("fs").writeFile(signature, base64Data_sign, 'base64', function(req,err) {
             // console.log(err);
             });
 var jpg_signature=signature.replace("png","jpg")
Jimp.read(signature, function (err, image) {
    if (err) {

        console.log(err);
        return;
    }
    image.background(0xFFFFFFFF);
    image.write(jpg_signature);
});
signature=jpg_signature

                var new_signature=user[0].SIGNATURE.replace("jpg","png")
             if (user[0].SIGNATURE) {
                // require("fs").unlink(user[0].SIGNATURE)
                require("fs").unlink(user[0].SIGNATURE, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                  
                    //file removed
                  })
                  require("fs").unlink(new_signature, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                  
                    //file removed
                  })
            }
         }

        var psw=(cript(req.body.pwd, req.body.username))
        // console.log(req.body.date)
        if(req.body.date==null)req.body.date=NULL
        id_service=req.body.service

        id_post=req.body.poste
        // console.log(req.body)
        if(foto&&signature){

            var infos={"NOM":req.body.nom,
            "PRENOM":req.body.prenom,
            "TELEPHONE":req.body.tel,
            "EMAIL":req.body.email,
            "USERNAME":req.body.username,
            "PWD":psw,
            "ID_SERVICE":id_service,
            "ID_POSTE":id_post,
            "DATE_EMBAUCHE":req.body.date,
            "MATRICULE":req.body.matricule,
            "GENRE":req.body.genre,
            "FOTO":foto,
            "SIGNATURE":signature
            }
        }else if(foto&&!signature){

            var infos={"NOM":req.body.nom,
            "PRENOM":req.body.prenom,
            "TELEPHONE":req.body.tel,
            "EMAIL":req.body.email,
            "USERNAME":req.body.username,
            "PWD":psw,
            "ID_SERVICE":id_service,
            "ID_POSTE":id_post,
            "DATE_EMBAUCHE":req.body.date,
            "MATRICULE":req.body.matricule,
            "GENRE":req.body.genre,
            "FOTO":foto
            }
        }else if(!foto&&signature){

            var infos={"NOM":req.body.nom,
            "PRENOM":req.body.prenom,
            "TELEPHONE":req.body.tel,
            "EMAIL":req.body.email,
            "USERNAME":req.body.username,
            "PWD":psw,
            "ID_SERVICE":id_service,
            "ID_POSTE":id_post,
            "DATE_EMBAUCHE":req.body.date,
            "MATRICULE":req.body.matricule,
            "GENRE":req.body.genre,
            "SIGNATURE":signature
            }
        }else{

            var infos={"NOM":req.body.nom,
            "PRENOM":req.body.prenom,
            "TELEPHONE":req.body.tel,
            "EMAIL":req.body.email,
            "USERNAME":req.body.username,
            "PWD":psw,
            "ID_SERVICE":id_service,
            "ID_POSTE":id_post,
            "DATE_EMBAUCHE":req.body.date,
            "GENRE":req.body.genre,
            "MATRICULE":req.body.matricule           
            
            }
        }



        var check_user=await Model.getOne({table:"utilisateur",culomn:{"USERNAME":req.body.username}})
                var n= Object.keys(check_user).length
            
            if(n==0 || req.body.username==req.body.usernameold){
                
                var condition={ID_UT:req.body.id}
                var condition1={ID:req.body.id}
                // await Model.update({table:"utilisateur",culomn:{"STATUT":0},conditions:condition})
                await Model.delete({table:"utilisateurs_role",conditions:condition})
            await Model.update({table:"utilisateur",culomn:infos,conditions:condition1})
            
            var user=await Model.getOne({table:"utilisateur",culomn:condition1})

            object_prof.forEach(async val =>  {
                if(val)
                await Model.insert({table:"utilisateurs_role",culomn:{"ID_UT":req.body.id,"ID_ROLE":val}})
            });

            return res.status(200).json({ status: 200,foto:user[0].FOTO, response:"ok" });
                
            }else{
                
                return res.status(200).json({ status: 200,foto:user[0].FOTO,  response:"non",message:"exist" });
            }

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,foto:user[0].FOTO, response:"non" });
    }
}


exports.userInputFill = async function (req, res) {

    try {

        
        var fonction=await Model.getList({table:"role"})
        var service=await Model.getList({table:"services_ou"})
        var poste=await Model.getList({table:"poste"})

        var str = JSON.stringify(fonction);
        str = str.replace(/ID_ROLE/g, 'id');
        str = str.replace(/DESCRIPTION_ROLE/g, 'name');
        
        object = JSON.parse(str);


        return res.status(200).json({ status: 200, fonctionInfo:object,serviceInfo:service,posteInfo:poste,response:"ok" , message: "Succesfully Retrieved" });
 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}


exports.getOne = async function (req, res) {

    try {

        
    //   console.log(req.params.id)
    const query={query:"SELECT u.ID as ID,u.NOM as NOM,PRENOM,PWD,TELEPHONE,GENRE,DATE_EMBAUCHE,MATRICULE,EMAIL,USERNAME,SOLDE_CONGE_INITIAL,u.ID_SERVICE,u.INTERNE_EXTERNE as IEXT,serv.DESCRIPTION as OU,u.ID_POSTE,DESCRIPTION_POSTE,u.FOTO,SIGNATURE FROM utilisateur u left join poste p on u.ID_POSTE=p.ID_POSTE left join services_ou serv on u.ID_SERVICE=serv.ID_SERVICE WHERE ID="+req.params.id}

      var user=await Model.getRequest(query)
      const query1={query:"SELECT*  FROM utilisateurs_role ur join role r on  ur.ID_ROLE=r.ID_ROLE where ur.ID_UT="+req.params.id}
    //   console.log(user)

      var psw=(cript(user[0].PWD, user[0].USERNAME))
      
      var fonction=await Model.getList({table:"role"})
      var service=await Model.getList({table:"services_ou"})
      var poste=await Model.getList({table:"poste"})

    //   var str = JSON.stringify(fonction);
    //   str = str.replace(/ID_ROLE/g, 'id');
    //   str = str.replace(/DESCRIPTION_ROLE/g, 'name');
      
    //   object = JSON.parse(str);

      

      var roles=await Model.getRequest(query1)
      
         return res.status(200).json({ status: 200,fonctionInfo:fonction,serviceInfo:service,posteInfo:poste,pwd:psw, user:user,roles:roles,response:"ok" , message: "Succesfully Retrieved" });
 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.bloquer_user = async function (req, res) {

    try {


        var condition={ID:req.params.id}
        await Model.update({table:"utilisateur",culomn:{"STATUT":0},conditions:condition})
      
         return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.debloquer_user = async function (req, res) {

    try {


        var condition={ID:req.params.id}
        await Model.update({table:"utilisateur",culomn:{"STATUT":1},conditions:condition})
      
         return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.getUtilisateur = async function (req, res) {

    try {

        var users=await Model.getListOrdered({table:"utilisateur",culomn:{"STATUT":1},order:{COLUMN:"NOM",TYPE:"ASC"}})
      
         return res.status(200).json({ status: 200,users:users,response:"ok" , message: "Succesfully Retrieved" });
 
    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.check_users_exist = async function (req, res) {

    try {

        var ou=await Model.getList({table:"utilisateur"})
        var n= Object.keys(ou).length
                if(n>0){
                    return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
                }else
      
         return res.status(200).json({ status: 200,response:"non" });
 
    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.getSoldeConge = async function (req, res) {

    try {
        var id=req.params.id
        var user=await Model.getOne({table:"utilisateur",culomn:{"ID":id}})
        var param_conge=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
        
    //   console.log(user[0].DATE_SOLDE_CONGE)
   
    var jour_initiale
    if (!user[0].DATE_SOLDE_CONGE) {
        return res.status(200).json({ status: 200, message: "no_solde_param",response:"non" });
    } else if (!user[0].DATE_EMBAUCHE){
        return res.status(200).json({ status: 200, message: "no_date_embauche",response:"non" });
    } else if (!user[0].SIGNATURE){
        return res.status(200).json({ status: 200, message: "no_signature",response:"non" });
    } else if (user[0].ID_POSTE==0){
        return res.status(200).json({ status: 200, message: "no_poste",response:"non" });
    }else{

        var d_embauche=new Date(user[0].DATE_EMBAUCHE);
        var d_solde=new Date(user[0].DATE_SOLDE_CONGE);
        var d_jour=new Date();

        // months = (d_jour.getFullYear() - d_solde.getFullYear()) * 12;
        // months -= d_solde.getMonth();
        // months += d_jour.getMonth();

        var r_exercice=[]
        // var annee_prochaine=parseInt(d_jour.getFullYear())+1;
        // return months <= 0 ? 0 : months;

        var j=0
        for (var i = d_solde.getFullYear(); i <=d_jour.getFullYear(); i++) {
            if(i==d_solde.getFullYear()){
                // var obj={"avant":user[0].SOLDE_CONGE_INITIAL}
                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES<"+i+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
                var result = await Model.getRequest(query)
                var sld_total=user[0].SOLDE_CONGE_INITIAL-result[0].n
                var obj = {EXERCICE:"AVANT(année de configuration de vos droits au congés) "+i,SOLDE:sld_total};
                
            r_exercice.push(obj) 
            }
            
                var dt=new Date(i+"-12-31")

                var months = (dt.getFullYear() - d_solde.getFullYear()) * 12;
                months -= d_solde.getMonth();
                months += dt.getMonth();
                var months_n=months <= 0 ? 0 : months;

                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES="+i+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
                var result = await Model.getRequest(query)

                // console.log(result[0].n)

                if (months_n>=param_conge[0].MOIS_MINIMUM) {
                    var param_augment_conge=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

                    if (param_augment_conge[0].STATUT_REPETION==1) {
                        var anne_passe=i-d_embauche.getFullYear();
                        var ajout_annee= Math.floor(anne_passe/param_augment_conge[0].ANS)*param_augment_conge[0].NOMBRE;
                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                      
                        var obj = {EXERCICE:i,SOLDE:j_total};
                        // obj[i] = j_total;
                        r_exercice.push(obj)
                    }else{
                        var anne_passe=i-d_embauche.getFullYear();
                        const query_1={query:"SELECT IFNULL(SUM(NOMBRE),0) as NOMBRE from parametrage_augmentation_conge where ANS <="+anne_passe}
                var param_augment_conge1 = await Model.getRequest(query_1)
                        
                        if (param_augment_conge1[0]) {
                            var ajout_annee= param_augment_conge1[0].NOMBRE;
                        }else var ajout_annee= 0
                        
                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                        
                        var obj = {EXERCICE:i,SOLDE:j_total};
                        // obj[i] = j_total;
                        r_exercice.push(obj)
                    }
                   

                    j++
                }
                // console.log(i)
            
        }
        return res.status(200).json({ status: 200,data:r_exercice,response:"ok" , message: "Succesfully Retrieved" });
    }

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.demande_conge = async function (req, res) {

    try {
        var id=req.body.id
        var user=await Model.getOne({table:"utilisateur",culomn:{"ID":id}})
        var param_conge=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
        var conge_encour=await Model.getOne({table:"conge_demande",culomn:{"ID_TYPE_CONGE":1,"STATUT":0,"USER_ID":id}})
        var n= Object.keys(conge_encour).length

        var dt_debut=new Date(req.body.date)
        var dt_fin=new Date(req.body.date1);
        var dt_retour=new Date(req.body.date2);

        var Difference_In_Time = dt_fin.getTime() - dt_debut.getTime();
        var Difference_In_Days =Math.floor( Difference_In_Time / (1000 * 3600 * 24));
        var Difference_In_Time1 = dt_retour.getTime() - dt_debut.getTime();
        var Difference_In_Days1 =Math.floor( Difference_In_Time1 / (1000 * 3600 * 24));
        var Difference_In_Time2 = dt_retour.getTime() - dt_fin.getTime();
        var Difference_In_Days2 =Math.floor( Difference_In_Time2 / (1000 * 3600 * 24));
        var new_nombre=Difference_In_Days-req.body.nombre
        var new_nombre1=Difference_In_Days1-req.body.nombre


      
   
        if (req.body.type_conge==1) {

            var jour_initiale
            if (!user[0].DATE_SOLDE_CONGE) {
                return res.status(200).json({ status: 200, message: "no_solde_param",response:"non" });
            } else if (!user[0].DATE_EMBAUCHE){
                return res.status(200).json({ status: 200, message: "no_date_embauche",response:"non" });
            } else if (!user[0].SIGNATURE){
                return res.status(200).json({ status: 200, message: "no_signature",response:"non" });
            }else if (n>0&&req.body.type_conge==1){
                return res.status(200).json({ status: 200, message: "conge_encour",response:"non" });
            }else if (new_nombre<-req.body.nombre||new_nombre1<0||Difference_In_Days2>6){
                // console.log(new_nombre)
                return res.status(200).json({ status: 200, message: "verifier_date",response:"non" });
            }
            else{

                var d_embauche=new Date(user[0].DATE_EMBAUCHE);
           

                        var dt=new Date(req.body.exercice+"-12-31")
                        var d_solde=new Date(user[0].DATE_SOLDE_CONGE);
                        var d_jour=new Date();

                        var months = (dt.getFullYear() - d_embauche.getFullYear()) * 12;
                        months -= d_embauche.getMonth();
                        months += dt.getMonth();
                        var months_n=months <= 0 ? 0 : months;

                        // console.log(result[0].n)
                        // returnPromise().then((value) => {
                        //     console.log('1st then, inside test(): ' + value);
                        //     return 'Hello';
                        //   })
                        var n_anterieur=solde_enterieur(id, req.body.exercice,d_embauche.getFullYear(),d_solde.getFullYear(),user[0].SOLDE_CONGE_INITIAL)

                        n_anterieur.then( async function(n_anterieur) {
                            // console.log(result) // "Some User token"
                    if (months_n>=param_conge[0].MOIS_MINIMUM) {

                        if (n_anterieur==0||d_solde.getFullYear()>req.body.exercice) {
                                              
                        
                            if (d_solde.getFullYear()>req.body.exercice) {
                                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES<"+d_solde.getFullYear()+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
                                var result = await Model.getRequest(query)
    
                                var j_total=user[0].SOLDE_CONGE_INITIAL-result[0].n
                            }else{
    
                                    const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES="+req.body.exercice+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
                                var result = await Model.getRequest(query)
                                
        
                                var param_augment_conge=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

                                if (param_augment_conge[0].STATUT_REPETION==1) {
                                    
                                    var anne_passe=req.body.exercice-d_embauche.getFullYear();
                                    var ajout_annee= Math.floor(anne_passe/param_augment_conge[0].ANS)*param_augment_conge[0].NOMBRE;
                                    var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                                
                                    // var obj = {EXERCICE:i,SOLDE:j_total};
                                    // obj[i] = j_total;
                                    // r_exercice.push(obj)
                                }else{
                                    var anne_passe=req.body.exercice-d_embauche.getFullYear();
                                    const query_1={query:"SELECT IFNULL(SUM(NOMBRE),0) as NOMBRE from parametrage_augmentation_conge where ANS <="+anne_passe}
                var param_augment_conge1 = await Model.getRequest(query_1)
                                    
                                    if (param_augment_conge1[0]) {
                                        var ajout_annee= param_augment_conge1[0].NOMBRE;
                                    }else var ajout_annee= 0
                                    
                                    var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n

                                }
                            }
                        
                            if (j_total>=req.body.nombre) {

                                // console.log(j_total)
                                // console.log("bien fait")
                                var infos={
                                    "USER_ID":id,
                                    "ADRESSE_CONGE":req.body.adresse,
                                    "ID_TYPE_CONGE":req.body.type_conge,
                                    "EXERCICES":req.body.exercice,
                                    "DUREE":req.body.nombre,
                                    "MOTIF":req.body.motif,
                                    "DATE_DEBUT":req.body.date,
                                    "DATE_FIN":req.body.date1,
                                    "DATE_RETOUR":req.body.date2
                                }

                                id_conge_demande=await Model.insert({table:"conge_demande",culomn:infos})
                                id_conge_demande_interim=await Model.insert(
                                    {table:"conge_iterim_user",
                                    culomn:{
                                        "ID_CONGE_DEMAMDE":id_conge_demande,
                                        "ID_USER":req.body.id_ut
                                    }})

                                var flux_conge1=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":user[0].ID_POSTE}})

                               

                                await Promise.all(flux_conge1.map(async val1 => {
                                    
                                    var infos1={
                                        "ID_CONGE_DEMAMDE":id_conge_demande,
                                        "ID_POST":val1['ID_TO'], 
                                        "LEVEL":1                                     
                                    }
                                    var poste=await Model.getOne({table:"poste",culomn:{"ID_POSTE":val1['ID_TO']}})

                                    if (user[0].GENRE=='2') {
                                        var sujet="elle "
                                    }else  var sujet="il "

                                 

                                    await Model.insert({table:"conge_validation",culomn:infos1})

                                    var possedants=await Model.getList({table:"utilisateur",culomn:{"ID_POSTE":val1['ID_TO']}})
                                    // console.log(val1['ID_TO'])
                                    await Promise.all(possedants.map(async vl => {
                                        // ---------------EMAIL---------------------------------------

                                        var transporter = require("../config/email.config");

                                        var mailOptions = {
                                        from: 'rh@bije.bi',
                                        to: vl['EMAIL'],
                                        subject: 'DEMENDE DE CONGE',
                                        text: " ",
                                        html:"Monsieur/Madame "+poste[0].DESCRIPTION_POSTE+", Veuillez réagir sur la demande de congé de l'employé "+user[0].NOM+" "+user[0].PRENOM+" ("+user[0].MATRICULE+") qu'"+sujet+" vient de soumettre.\n\n <a href='"+req.body.online_url+"notifications/traiter_conge/"+id_conge_demande+"'>Prière de Cliquer ici pour plus d'information</a>"
                                    };

                                        transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            // console.log('Email sent: ' + vl['EMAIL']);
                                        }
                                        });
                                    }))
                                    

                                    if (val1['TO_PORT']!='t') {

                                        var flux_conge2=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val1['ID_TO']}})

                                        await Promise.all(flux_conge2.map(async val2 => {
                                            
                                            var infos2={
                                                "ID_CONGE_DEMAMDE":id_conge_demande,
                                                "ID_POST":val2['ID_TO'], 
                                                "LEVEL":2                                     
                                            }
        
                                            await Model.insert({table:"conge_validation",culomn:infos2})
        
                                            if (val2['TO_PORT']!='t') {
                                                var flux_conge3=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val2['ID_TO']}})

                                                await Promise.all(flux_conge3.map(async val3 => {
                                                    
                                                    var infos3={
                                                        "ID_CONGE_DEMAMDE":id_conge_demande,
                                                        "ID_POST":val3['ID_TO'], 
                                                        "LEVEL":3                                    
                                                    }
                
                                                    await Model.insert({table:"conge_validation",culomn:infos3})
                
                                                    if (val3['TO_PORT']!='t') {
                                                        var flux_conge4=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val3['ID_TO']}})

                                                        await Promise.all(flux_conge4.map(async val4 => {
                                                            
                                                            var infos4={
                                                                "ID_CONGE_DEMAMDE":id_conge_demande,
                                                                "ID_POST":val4['ID_TO'], 
                                                                "LEVEL":4                                     
                                                            }
                        
                                                            await Model.insert({table:"conge_validation",culomn:infos4})
                        
                                                            if (val4['TO_PORT']!='t') {
                                                                var flux_conge5=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val4['ID_TO']}})

                                                                    await Promise.all(flux_conge5.map(async val5 => {
                                                                        
                                                                        var infos5={
                                                                            "ID_CONGE_DEMAMDE":id_conge_demande,
                                                                            "ID_POST":val5['ID_TO'], 
                                                                            "LEVEL":5                                     
                                                                        }
                                    
                                                                        await Model.insert({table:"conge_validation",culomn:infos5})
                                    
                                                                        if (val5['TO_PORT']!='t') {
                                                                            var flux_conge6=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val5['ID_TO']}})

                                                                            await Promise.all(flux_conge6.map(async val6 => {
                                                                                
                                                                                var infos6={
                                                                                    "ID_CONGE_DEMAMDE":id_conge_demande,
                                                                                    "ID_POST":val6['ID_TO'], 
                                                                                    "LEVEL":6                                     
                                                                                }
                                            
                                                                                await Model.insert({table:"conge_validation",culomn:infos6})
                                            
                                                                                // if (val5['TO_PORT']!='t') {
                                                                                    
                                                                                // }
                                            
                                                                            }))
                                                                        }
                                    
                                                                    }))
                                                            }
                        
                                                        }))
                                                    }
                
                                                }))
                                            }
        
                                        }))
                                        
                                    }

                                }))

                                return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
                                
                                
                            }else return res.status(200).json({ status: 200,solde:j_total, message: "no_solde_suffisant",response:"non" });

                            
                        }else{
                            // console.log(months_n)
                            return res.status(200).json({ status: 200, message: "solde_anterieur",response:"non" });
                            
                        } 
                    
                 }else{
                    // console.log(n_anterieur)
                    
                    return res.status(200).json({ status: 200, message: "no_droit_cetteanne",response:"non" });
                 }
                })
                 
        
            }
        } else{

        // console.log("autre type conge")

        
        // req.body.exercice
        var this_year=new Date()
        var jour_initiale
        if (req.body.exercice!=this_year.getFullYear()){
            return res.status(200).json({ status: 200, message: "verifier_exercice",response:"non" });
        }else if (!user[0].DATE_EMBAUCHE){
            return res.status(200).json({ status: 200, message: "no_date_embauche",response:"non" });
        } else if (!user[0].SIGNATURE){
            return res.status(200).json({ status: 200, message: "no_signature",response:"non" });
        }else if (new_nombre<-req.body.nombre||new_nombre1<0||Difference_In_Days2>6){
            return res.status(200).json({ status: 200, message: "verifier_date",response:"non" });
        }
        else{

            var d_embauche=new Date(user[0].DATE_EMBAUCHE);
       


                    // console.log(result[0].n)


                            // console.log(j_total)
                            // console.log("bien fait")
                            var infos={
                                "USER_ID":id,
                                "ADRESSE_CONGE":req.body.adresse,
                                "ID_TYPE_CONGE":req.body.type_conge,
                                "EXERCICES":req.body.exercice,
                                "DUREE":req.body.nombre,
                                "MOTIF":req.body.motif,
                                "DATE_DEBUT":req.body.date,
                                "DATE_FIN":req.body.date1,
                                "DATE_RETOUR":req.body.date2
                            }

                            id_conge_demande=await Model.insert({table:"conge_demande",culomn:infos})

                            var flux_conge1=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":user[0].ID_POSTE}})

                            await Promise.all(flux_conge1.map(async val1 => {
                                
                                var infos1={
                                    "ID_CONGE_DEMAMDE":id_conge_demande,
                                    "ID_POST":val1['ID_TO'], 
                                    "LEVEL":1                                     
                                }

                                var poste=await Model.getOne({table:"poste",culomn:{"ID_POSTE":val1['ID_TO']}})
                                if (user[0].GENRE=='2') {
                                    var sujet="elle "
                                }else  var sujet="il "


                                await Model.insert({table:"conge_validation",culomn:infos1})

                                var possedants=await Model.getList({table:"utilisateur",culomn:{"ID_POSTE":val1['ID_TO']}})
                                // console.log(val1['ID_TO'])
                                await Promise.all(possedants.map(async vl => {
                                    // ---------------EMAIL---------------------------------------

                                    var transporter = require("../config/email.config");

                                    var mailOptions = {
                                    from: 'rh@bije.bi',
                                    to: vl['EMAIL'],
                                    subject: 'DEMENDE DE CONGE',
                                    text: " ",
                                    html:"Monsieur/Madame "+poste[0].DESCRIPTION_POSTE+", Veuillez réagir sur la demande de congé de l'employé "+user[0].NOM+" "+user[0].PRENOM+" ("+user[0].MATRICULE+") qu'"+sujet+" vient de soumettre.\n\n <a href='"+req.body.online_url+"notifications/traiter_conge/"+id_conge_demande+"'>Prière de Cliquer ici pour plus d'information</a>"
                                };

                                    transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        // console.log('Email sent: ' + vl['EMAIL']);
                                    }
                                    });
                                }))
                                

                                if (val1['TO_PORT']!='t') {

                                    var flux_conge2=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val1['ID_TO']}})

                                    await Promise.all(flux_conge2.map(async val2 => {
                                        
                                        var infos2={
                                            "ID_CONGE_DEMAMDE":id_conge_demande,
                                            "ID_POST":val2['ID_TO'], 
                                            "LEVEL":2                                     
                                        }
    
                                        await Model.insert({table:"conge_validation",culomn:infos2})
    
                                        if (val2['TO_PORT']!='t') {
                                            var flux_conge3=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val2['ID_TO']}})

                                            await Promise.all(flux_conge3.map(async val3 => {
                                                
                                                var infos3={
                                                    "ID_CONGE_DEMAMDE":id_conge_demande,
                                                    "ID_POST":val3['ID_TO'], 
                                                    "LEVEL":3                                    
                                                }
            
                                                await Model.insert({table:"conge_validation",culomn:infos3})
            
                                                if (val3['TO_PORT']!='t') {
                                                    var flux_conge4=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val3['ID_TO']}})

                                                    await Promise.all(flux_conge4.map(async val4 => {
                                                        
                                                        var infos4={
                                                            "ID_CONGE_DEMAMDE":id_conge_demande,
                                                            "ID_POST":val4['ID_TO'], 
                                                            "LEVEL":4                                     
                                                        }
                    
                                                        await Model.insert({table:"conge_validation",culomn:infos4})
                    
                                                        if (val4['TO_PORT']!='t') {
                                                            var flux_conge5=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val4['ID_TO']}})

                                                                await Promise.all(flux_conge5.map(async val5 => {
                                                                    
                                                                    var infos5={
                                                                        "ID_CONGE_DEMAMDE":id_conge_demande,
                                                                        "ID_POST":val5['ID_TO'], 
                                                                        "LEVEL":5                                     
                                                                    }
                                
                                                                    await Model.insert({table:"conge_validation",culomn:infos5})
                                
                                                                    if (val5['TO_PORT']!='t') {
                                                                        var flux_conge6=await Model.getList({table:"flux_conge",culomn:{"ID_FROM":val5['ID_TO']}})

                                                                        await Promise.all(flux_conge6.map(async val6 => {
                                                                            
                                                                            var infos6={
                                                                                "ID_CONGE_DEMAMDE":id_conge_demande,
                                                                                "ID_POST":val6['ID_TO'], 
                                                                                "LEVEL":6                                     
                                                                            }
                                        
                                                                            await Model.insert({table:"conge_validation",culomn:infos6})
                                        
                                                                            // if (val5['TO_PORT']!='t') {
                                                                                
                                                                            // }
                                        
                                                                        }))
                                                                    }
                                
                                                                }))
                                                        }
                    
                                                    }))
                                                }
            
                                            }))
                                        }
    
                                    }))
                                    
                                }

                            }))

                            return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });                 
                
            // }
            return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
    
        }
   
            return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
        } 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.demande_conge_update = async function (req, res) {

    try {
        var id=req.body.id
        var id_conge_demande=req.body.id_conge_demande
        var condition={ID_CONGE_DEMAMDE:id_conge_demande}
        var user=await Model.getOne({table:"utilisateur",culomn:{"ID":id}})
        var param_conge=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
        // var conge_encour=await Model.getOne({table:"conge_demande",culomn:{"ID_TYPE_CONGE":1,"STATUT":0,"ID_CONGE_DEMAMDEk":"<>"+id_conge_demande}})
        const query={query:"SELECT* from conge_demande where USER_ID="+id+" AND ID_TYPE_CONGE=1 AND STATUT=0 AND ID_CONGE_DEMAMDE<>"+id_conge_demande}
        var conge_encour = await Model.getRequest(query)
        var n= Object.keys(conge_encour).length

        var dt_debut=new Date(req.body.date)
        var dt_fin=new Date(req.body.date1);
        var dt_retour=new Date(req.body.date2);

        var Difference_In_Time = dt_fin.getTime() - dt_debut.getTime();
        var Difference_In_Days =Math.floor( Difference_In_Time / (1000 * 3600 * 24));
        var Difference_In_Time1 = dt_retour.getTime() - dt_debut.getTime();
        var Difference_In_Days1 =Math.floor( Difference_In_Time1 / (1000 * 3600 * 24));
        var Difference_In_Time2 = dt_retour.getTime() - dt_fin.getTime();
        var Difference_In_Days2 =Math.floor( Difference_In_Time2 / (1000 * 3600 * 24));
        var new_nombre=Difference_In_Days-req.body.nombre
        var new_nombre1=Difference_In_Days1-req.body.nombre


    //   console.log(user[0].DATE_SOLDE_CONGE)
   
        if (req.body.type_conge==1) {

            var jour_initiale
            if (!user[0].DATE_SOLDE_CONGE) {
                return res.status(200).json({ status: 200, message: "no_solde_param",response:"non" });
            } else if (!user[0].DATE_EMBAUCHE){
                return res.status(200).json({ status: 200, message: "no_date_embauche",response:"non" });
            } else if (!user[0].SIGNATURE){
                return res.status(200).json({ status: 200, message: "no_signature",response:"non" });
            }else if (n>0&&req.body.type_conge==1){
                return res.status(200).json({ status: 200, message: "conge_encour",response:"non" });
            }else if (new_nombre<-req.body.nombre||new_nombre1<0||Difference_In_Days2>6){
                return res.status(200).json({ status: 200, message: "verifier_date",response:"non" });
            }
            else{

                var d_embauche=new Date(user[0].DATE_EMBAUCHE);
           

                        var dt=new Date(req.body.exercice+"-12-31")
                        var d_solde=new Date(user[0].DATE_SOLDE_CONGE);
                        var d_jour=new Date();

                        var months = (dt.getFullYear() - d_embauche.getFullYear()) * 12;
                        months -= d_embauche.getMonth();
                        months += dt.getMonth();
                        var months_n=months <= 0 ? 0 : months;

                        var n_anterieur=solde_enterieur(id, req.body.exercice,d_embauche.getFullYear(),d_solde.getFullYear(),user[0].SOLDE_CONGE_INITIAL)

                        n_anterieur.then( async function(n_anterieur) {

                        // console.log(result[0].n)

                        if (months_n>=param_conge[0].MOIS_MINIMUM) {

                            if (n_anterieur==0||d_solde.getFullYear()>req.body.exercice) {
                                
                                if (d_solde.getFullYear()>req.body.exercice) {
                                    const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES<"+d_solde.getFullYear()+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
                                    var result = await Model.getRequest(query)
        
                                    var j_total=user[0].SOLDE_CONGE_INITIAL-result[0].n
                                }else{
        
                                        const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES="+req.body.exercice+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
                                    var result = await Model.getRequest(query)
                                    
            
                                    var param_augment_conge=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

                                    if (param_augment_conge[0].STATUT_REPETION==1) {
                                        
                                        var anne_passe=req.body.exercice-d_embauche.getFullYear();
                                        var ajout_annee= Math.floor(anne_passe/param_augment_conge[0].ANS)*param_augment_conge[0].NOMBRE;
                                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                                    
                                        // var obj = {EXERCICE:i,SOLDE:j_total};
                                        // obj[i] = j_total;
                                        // r_exercice.push(obj)
                                    }else{
                                        var anne_passe=req.body.exercice-d_embauche.getFullYear();
                                        const query_1={query:"SELECT IFNULL(SUM(NOMBRE),0) as NOMBRE from parametrage_augmentation_conge where ANS <="+anne_passe}
                var param_augment_conge1 = await Model.getRequest(query_1)
                                        
                                        if (param_augment_conge1[0]) {
                                            var ajout_annee= param_augment_conge1[0].NOMBRE;
                                        }else var ajout_annee= 0
                                        
                                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n

                                    }
                                }
                            
                                if (j_total>=req.body.nombre) {

                                    // console.log(j_total)
                                    // console.log("bien fait")
                                    var infos={
                                        "USER_ID":id,
                                        "ADRESSE_CONGE":req.body.adresse,
                                        "ID_TYPE_CONGE":req.body.type_conge,
                                        "EXERCICES":req.body.exercice,
                                        "DUREE":req.body.nombre,
                                        "MOTIF":req.body.motif,
                                        "DATE_DEBUT":req.body.date,
                                        "DATE_FIN":req.body.date1,
                                        "DATE_RETOUR":req.body.date2
                                    }

                                    
                                await Model.update({table:"conge_demande",culomn:infos,conditions:condition})


                                    return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
                                    
                                    
                                }else return res.status(200).json({ status: 200,solde:j_total, message: "no_solde_suffisant",response:"non" });

                            }else{
                                // console.log(months_n)
                                return res.status(200).json({ status: 200, message: "solde_anterieur",response:"non" });
                                
                            }


                        }else{
                            // console.log(months_n)
                            return res.status(200).json({ status: 200, message: "no_droit_cetteanne",response:"non" });
                            
                        } 
                    
                // }
                return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
                    })
            }
        } else{

        // console.log("autre type conge")

        

       var this_year=new Date()
        var jour_initiale
        if (req.body.exercice!=this_year.getFullYear()){
            return res.status(200).json({ status: 200, message: "verifier_exercice",response:"non" });
        }else if (!user[0].DATE_EMBAUCHE){
            return res.status(200).json({ status: 200, message: "no_date_embauche",response:"non" });
        } else if (!user[0].SIGNATURE){
            return res.status(200).json({ status: 200, message: "no_signature",response:"non" });
        }else if (new_nombre<-req.body.nombre||new_nombre1<0||Difference_In_Days2>6){
            return res.status(200).json({ status: 200, message: "verifier_date",response:"non" });
        }
        else{

            var d_embauche=new Date(user[0].DATE_EMBAUCHE);
       


                    // console.log(result[0].n)


                            // console.log(j_total)
                            // console.log("bien fait")
                            var infos={
                                "USER_ID":id,
                                "ADRESSE_CONGE":req.body.adresse,
                                "ID_TYPE_CONGE":req.body.type_conge,
                                "EXERCICES":req.body.exercice,
                                "DUREE":req.body.nombre,
                                "MOTIF":req.body.motif,
                                "DATE_DEBUT":req.body.date,
                                "DATE_FIN":req.body.date1,
                                "DATE_RETOUR":req.body.date2
                            }

                            await Model.update({table:"conge_demande",culomn:infos,conditions:condition})

                            

                            return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });                 
                
    
        }
   
        } 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}
exports.getConge = async function (req, res) {

    try {
        var id=req.params.id

        var ce_conge=await Model.getList({table:"conge_demande",culomn:{"ID_CONGE_DEMAMDE":id}})
        const query_user={query:"SELECT u.ID as ID,u.NOM as NOM,PRENOM,PWD,TELEPHONE,DATE_EMBAUCHE,MATRICULE,EMAIL,USERNAME,SOLDE_CONGE_INITIAL,u.ID_SERVICE,u.INTERNE_EXTERNE as IEXT,serv.DESCRIPTION as OU,u.ID_POSTE,DESCRIPTION_POSTE,u.FOTO,SIGNATURE FROM utilisateur u left join poste p on u.ID_POSTE=p.ID_POSTE left join services_ou serv on u.ID_SERVICE=serv.ID_SERVICE WHERE ID="+ce_conge[0].USER_ID}

        var user=await Model.getRequest(query_user)
        // var user=await Model.getList({table:"utilisateur",culomn:{"ID":ce_conge[0].USER_ID}})

        const query={query:"SELECT ABREVIATION,ABREVIATION_POSTE,COMMENT,CONNECTED,DATE,DATE_CONNECT,DATE_EMBAUCHE,DATE_SOLDE_CONGE,DATE_VALIDATION,DESCRIPTION,DESCRIPTION_POSTE,EMAIL,FOTO,ID,ID_ADMIN,ID_CONGE_DEMAMDE,ID_CONGE_VALIDATION,ID_OU,ID_PARENT,ID_POST,p.ID_POSTE,so.ID_SERVICE,ID_UT_CHEF,ID_UT_INTERIM,INTERIM,INTERNE_EXTERNE,LEVEL,LOC,MATRICULE,NIVEAU,NOM,PRENOM,PWD,SIGNATURE,SOLDE_CONGE_INITIAL,cv.STATUT,TELEPHONE,USERNAME,cv.USER_ID from conge_validation cv LEFT JOIN poste p on cv.ID_POST=p.ID_POSTE LEFT JOIN services_ou so on p.ID_SERVICE=so.ID_SERVICE LEFT JOIN utilisateur u on cv.USER_ID=u.ID where ID_CONGE_DEMAMDE="+id+" ORDER BY so.ID_SERVICE DESC"}
        var result = await Model.getRequest(query)

        var check0=await Model.getOne({table:"conge_validation",culomn:{"STATUT":0,"ID_CONGE_DEMAMDE":id}})
        var n0= Object.keys(check0).length
        
            // console.log(n0)      
            if(n0==0){
            var check2=await Model.getOne({table:"conge_validation",culomn:{"STATUT":2,"ID_CONGE_DEMAMDE":id}})
                    var n2= Object.keys(check2).length
                    if(n2>0){
                        await Model.update({table:"conge_demande",culomn:{"STATUT":2},conditions:{"ID_CONGE_DEMAMDE":id}}) 
                    }else await Model.update({table:"conge_demande",culomn:{"STATUT":1},conditions:{"ID_CONGE_DEMAMDE":id}}) 

            }

        return res.status(200).json({ status: 200,demandeur:user,info_validateur:result,ce_conge:ce_conge,response:"ok" , message: "Succesfully Retrieved" });
    

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}


exports.getHistoriqueConge = async function (req, res) {

    try {
        var id_conge=req.params.id_conge
        var id_user=req.params.id_user
        var user=await Model.getOne({table:"utilisateur",culomn:{"ID":id_user}})
        var param_conge=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
        var ce_conge=await Model.getList({table:"conge_demande",culomn:{"ID_CONGE_DEMAMDE":id_conge}})

        var d_embauche=new Date(user[0].DATE_EMBAUCHE);
        var d_solde=new Date(user[0].DATE_SOLDE_CONGE);
        var d_jour=new Date(ce_conge[0].DATE_CREATION);

        
        const query={query:"SELECT* from conge_demande where USER_ID="+id_user+" AND DATE_CREATION<'"+ce_conge[0].DATE_CREATION+"' AND ID_TYPE_CONGE=1"}
        var result = await Model.getRequest(query)

        var r_exercice=[]

        var j=0
        for (var i = d_solde.getFullYear(); i <=d_jour.getFullYear(); i++) {
            if(i==d_solde.getFullYear()){
                // var obj={"avant":user[0].SOLDE_CONGE_INITIAL}
                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id_user+" AND EXERCICES<"+i+" AND ID_TYPE_CONGE=1  AND DATE_CREATION<'"+ce_conge[0].DATE_CREATION+"'"}
                var result = await Model.getRequest(query)
                
                var sld_total=user[0].SOLDE_CONGE_INITIAL-result[0].n
// console.log(ce_conge)
                if (ce_conge[0].EXERCICES<d_solde.getFullYear()) {
                    var sld_total1=sld_total-parseInt(ce_conge[0].DUREE)  
                }else

                var sld_total1=sld_total 

                var obj = {EXERCICE:"AVANT(année de configuration de vos droits au congés) "+i,SOLDE:sld_total,RESTE:sld_total1};
               
                if (sld_total>0||sld_total1) r_exercice.push(obj) 
                
            }
            
                var dt=new Date(i+"-12-31")

                var months = (dt.getFullYear() - d_solde.getFullYear()) * 12;
                months -= d_solde.getMonth();
                months += dt.getMonth();
                var months_n=months <= 0 ? 0 : months;

                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id_user+" AND EXERCICES="+i+" AND ID_TYPE_CONGE=1 AND STATUT=1 AND DATE_CREATION<'"+ce_conge[0].DATE_CREATION+"'"}
                var result = await Model.getRequest(query)

                // console.log(result[0].n)

                if (months_n>=param_conge[0].MOIS_MINIMUM) {
                    var param_augment_conge=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

                    if (param_augment_conge[0].STATUT_REPETION==1) {
                        var anne_passe=i-d_embauche.getFullYear();
                        var ajout_annee= Math.floor(anne_passe/param_augment_conge[0].ANS)*param_augment_conge[0].NOMBRE;
                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                      
                        // var obj = {EXERCICE:i,SOLDE:j_total};

                        if (ce_conge[0].EXERCICES==i) {
                            var sld_total1=j_total-parseInt(ce_conge[0].DUREE)  
                        }else
        
                        var sld_total1=j_total 
                        
                var obj = {EXERCICE:i,SOLDE:j_total ,RESTE:sld_total1};
                
                        // obj[i] = j_total;
                        // r_exercice.push(obj)
                        if (j_total>0||sld_total1) r_exercice.push(obj) 
                    }else{
                        var anne_passe=i-d_embauche.getFullYear();
                        const query_1={query:"SELECT IFNULL(SUM(NOMBRE),0) as NOMBRE from parametrage_augmentation_conge where ANS <="+anne_passe}
                var param_augment_conge1 = await Model.getRequest(query_1)
                        
                        if (param_augment_conge1[0]) {
                            var ajout_annee= param_augment_conge1[0].NOMBRE;
                        }else var ajout_annee= 0
                        
                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                        
                        // var obj = {EXERCICE:i,SOLDE:j_total};
                        // obj[i] = j_total;
                        if (ce_conge[0].EXERCICES==i) {
                            var sld_total1=j_total-parseInt(ce_conge[0].DUREE)  
                        }else
        
                        var sld_total1=j_total 
                var obj = {EXERCICE:i,SOLDE:j_total,RESTE:sld_total1};

                        // r_exercice.push(obj)
                        if (j_total>0||sld_total1) r_exercice.push(obj) 
                    }
                   

                    j++
                }
                // console.log(i)
            
        }
        return res.status(200).json({ status: 200,data:r_exercice,response:"ok" , message: "Succesfully Retrieved" });
    

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.delete_conge_demande = async function (req, res) {

    try {


        var condition={ID_CONGE_DEMAMDE:req.params.id}
        await Model.delete({table:"conge_demande",conditions:condition})
        await Model.delete({table:"conge_validation",conditions:condition})
      
         return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.pdf_conge = async function (req, res) {

    try {

        var id_conge=req.body.id
        // console.log(id_conge)
        // console.log(req.body.historique_solde)
        // console.log(req.body)
        array_histo=JSON.parse(req.body.historique_solde)
        info_validateur=JSON.parse(req.body.info_validateur)

        var conge=await Model.getOne({table:"conge_demande",culomn:{"ID_CONGE_DEMAMDE":id_conge}})
        var user=await Model.getOne({table:"utilisateur",culomn:{"ID":conge[0].USER_ID}})
        var service=await Model.getOne({table:"services_ou",culomn:{"ID_SERVICE":user[0].ID_SERVICE}})
        var poste=await Model.getOne({table:"poste",culomn:{"ID_POSTE":user[0].ID_POSTE}})
        var type_conge=await Model.getOne({table:"type_conges",culomn:{"ID_TYPE_CONGE":conge[0].ID_TYPE_CONGE}})


        

        var date=new Date();
        var date_eng=new Date(user[0].DATE_EMBAUCHE);
        date_crea=new Date(conge[0].DATE_CREATION)
        var date=new Date(conge[0].DATE_DEBUT);
        var date1=new Date(conge[0].DATE_FIN);
        var date2=new Date(conge[0].DATE_RETOUR);

        const FPDF = require('node-fpdf')
        const pdf = new FPDF('P','mm','A4');

        pdf.AddPage();
        pdf.SetMargins(20,20,20);
        pdf.SetFont('Times','',11);
        
        pdf.SetY(35);
        pdf.Cell(30,5,'Réf:',0,0),'L';
        pdf.Cell(150,5,'Le '+("0" + date_crea.getDate() ).slice(-2)+"/" +("0" + (date_crea.getMonth() + 1)).slice(-2)+"/"+date_crea.getFullYear(),0,1,'R');
        pdf.Cell(30,5,'Objet: ',0,1,'L');
        pdf.SetFont('Times','B',11);
        pdf.Cell(170,8,'DEMANDE DE CONGE',0,1,'C');
        pdf.Cell(210,8,'1. Identification:',0,1,'l');
        pdf.SetFont('Times','',11);
        
        pdf.SetX(30);pdf.Cell(80,5,'Nom et Prénom',0,0,'l');pdf.Cell(130,5,": "+user[0].NOM+" "+user[0].PRENOM,0,1,'l');
        pdf.SetX(30);pdf.Cell(80,5,'Fonction / Affectation',0,0,'l');pdf.Cell(130,5,": "+poste[0].DESCRIPTION_POSTE,0,1,'l');
        pdf.SetX(30);pdf.Cell(80,5,'Matricule',0,0,'l');pdf.Cell(130,5,": "+user[0].MATRICULE,0,1,'l');
        pdf.SetX(30);pdf.Cell(80,5,'Date d\'engagement',0,0,'l');pdf.Cell(130,5,": "+("0" + date_eng.getDate() ).slice(-2)+"/" +("0" + (date_eng.getMonth() + 1)).slice(-2)+"/"+date_eng.getFullYear(),0,1,'l');
        pdf.SetX(30);pdf.Cell(80,5,'Adresse complète durant le congé',0,0,'l');pdf.Cell(130,5,": "+conge[0].ADRESSE_CONGE,0,1,'l');

        pdf.SetFont('Times','B',11);
        pdf.Ln(3);
        pdf.Cell(45,8,"2. Type de congé sollicité ",0,0,'l');
        pdf.SetFont('Times','',11);
        pdf.Cell(130,8, ": "+type_conge[0].DESCRIPTION_CONGE,0,1,'l');

        pdf.SetX(30);pdf.Cell(20,5,'Exercice',0,0,'l');pdf.Cell(130,5,": "+conge[0].EXERCICES,0,1,'l');
        pdf.SetX(30);pdf.Cell(20,5,'Durée',0,0,'l');pdf.Cell(130,5,": "+conge[0].DUREE+" jour(s)",0,1,'l');
        pdf.SetX(30);pdf.Cell(20,5,'Motif',0,0,'l');pdf.Cell(130,5,": "+conge[0].MOTIF,0,1,'l');
        pdf.Ln(3);

        
        pdf.SetFont('Times','B',11);
        pdf.Cell(5,8,"3.",0,0,'l');
        pdf.SetX(30);pdf.MultiCell(160,6,"Je voudrais commencer le congé le "+("0" + date.getDate() ).slice(-2)+"/" +("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear()+
        ", Pour terminer le "+("0" + date1.getDate() ).slice(-2)+"/" +("0" + (date1.getMonth() + 1)).slice(-2)+"/"+date1.getFullYear()+
        " (les deux jours inclus), Je reprendrais mes fonction le "+("0" + date2.getDate() ).slice(-2)+"/" +("0" + (date2.getMonth() + 1)).slice(-2)+"/"+date2.getFullYear(),0,'J',0);
        
        pdf.Cell(0,3, " ",0,1,'l');
        pdf.Cell(5,8,"4.",0,0,'l');
        pdf.SetX(30);pdf.Cell(20,6,'Exercice',1,0,'l');pdf.Cell(70,6,"Solde congé annuel avant celui-ci",1,0,'l');pdf.Cell(70,6,"Solde congé annuel après celui-ci",1,1,'l');
        var histo=historique_mes_conges(id_conge,user[0].ID)


            await Promise.all(array_histo.map( val => {

                            var inf=val.EXERCICE+""
                            if(inf.includes("AVANT")){                               
                               var exer="AVANT"
                            }else var exer=val.EXERCICE
                            pdf.SetX(30);pdf.Cell(20,6,exer,1,0,'l');pdf.Cell(70,6,val.SOLDE,1,0,'l');pdf.Cell(70,6,val.RESTE,1,1,'l');
       
                        }));
       pdf.Ln(5);  
                        // pdf.SetFont('Times','',11);
J=5
            await Promise.all(info_validateur.map( val => {
                pdf.SetFont('Times','B',11);
                pdf.Cell(5,8,J+".",0,0,'l');
                

                // pdf.SetX(30);
                y=pdf.GetY()+4
                if(val.NIVEAU==0||val.NIVEAU==1){
                    avis_dec="Décision & Signature - "+val.DESCRIPTION_POSTE
                }else avis_dec=" Avis & Signature - "+val.DESCRIPTION_POSTE
                pdf.Cell(160,5,avis_dec,0,1,'l');
                
                // pdf.Cell(60,8,"..."+val.COMMENT,0,1,'l');
                pdf.SetFont('Times','',11);
                if (val.COMMENT) {
                    text=val.COMMENT 
                }else text=""
                
                longeur=text.length*2.5
                if(longeur>130)longeur=130
                pdf.SetX(30);pdf.MultiCell(longeur,6,text,0,'L',0,1,'','',true,0,true);
                // MultiCell($w, $h, $txt, $border=0, $align='J', $fill=0, $ln=1, $x='', $y='', $reseth=true, $stretch=0, $ishtml=false, $autopadding=true, $maxh=0)
                
                x=pdf.GetX()+longeur+10
                
                //  console.log(x)
                
                
                if (val.SIGNATURE) {
                    pdf.Image(val.SIGNATURE,x,y,50,20);//s1646752352292
                    // console.log(val)
                        if(val.INTERIM){
                            pdf.SetX(x+50)
                        pdf.Cell(10,1,"A.I",0,1,'L');
                        }
                    
                    // pdf.Image('uploads/signatures/s1646752352292.jpg',x,y,50,20);
                    }

                if (val.DATE_VALIDATION) {
                    if (val.STATUT==1) {
                        var txt="(Statut Validé)"
                    }else if (val.STATUT==2) {
                        var txt="(Statut Réfusé)"
                    }else var txt=""
                    d_val=new Date(val.DATE_VALIDATION)
                    pdf.Cell(60,8,txt+"("+val.NOM+" "+val.PRENOM+" Le "+("0" + d_val.getDate() ).slice(-2)+"/" +("0" + (d_val.getMonth() + 1)).slice(-2)+"/"+d_val.getFullYear()+")",0,1,'l');
                }else pdf.Cell(60,8,"",0,1,'R');
                

       J++
            })); 
                   
            
        pdf.Image('uploads/logo/entete.jpg',0,0,210);//entete de pqge
        // 

        pdf.Image('uploads/logo/pied1.jpg',0,270,210);//pied de page

        pdf.Output('F',"uploads/pdf/pdf"+id_conge+".pdf");



//---------------------------------------------------------------------------------------------
// const transporter = require("../config/email.config");

// var mailOptions = {
//   from: 'rh@bije.bi',
//   to: 'fmanirambona@bije.bi',
//   subject: 'test',
//   text: 'That was easy!!!!!!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     // console.log('Email sent: ' + info.response);
//   }
// });

// ----------------------------------------------------------------------------------



         return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
 

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}



async function solde_enterieur(id, annee_demande,annee_embauche,annee_solde,solde_initial) {

    var param_conge=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
    var  rest=0
    var annee_demande1=annee_demande-1

    var j=0
    // var j_total=0

        const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES<"+annee_solde+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
        var result = await Model.getRequest(query)

        var j_total=solde_initial-result[0].n
        rest+=parseInt(j_total)

    for (var i = annee_demande1; i >= annee_solde; i--) {

        // if (annee_solde<=i) {
                   
            const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id+" AND EXERCICES="+i+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
            var result = await Model.getRequest(query)
            

            var param_augment_conge=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

            if (param_augment_conge[0].STATUT_REPETION==1) {
                
                var anne_passe=i-annee_embauche;
                var ajout_annee= Math.floor(anne_passe/param_augment_conge[0].ANS)*param_augment_conge[0].NOMBRE;
                j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
            
                // var obj = {EXERCICE:i,SOLDE:j_total};
                // obj[i] = j_total;
                // r_exercice.push(obj)
            }else{
                var anne_passe=i-annee_embauche;
                const query_1={query:"SELECT IFNULL(SUM(NOMBRE),0) as NOMBRE from parametrage_augmentation_conge where ANS <="+anne_passe}
                var param_augment_conge1 = await Model.getRequest(query_1)
                
                if (param_augment_conge1[0]) {
                    var ajout_annee= param_augment_conge1[0].NOMBRE;
                }else var ajout_annee= 0
                
                j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n

            }

            rest+=parseInt(j_total)
        // console.log(j_total)
        // }

        
        j_total=0
    }


    // console.log(rest)
    return rest

}

async function historique_mes_conges(id_conge, id_user) {

    

    try {
        var id_conge=id_conge
        var id_user=id_user
        var user=await Model.getOne({table:"utilisateur",culomn:{"ID":id_user}})
        var param_conge=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
        var ce_conge=await Model.getList({table:"conge_demande",culomn:{"ID_CONGE_DEMAMDE":id_conge}})

        var d_embauche=new Date(user[0].DATE_EMBAUCHE);
        var d_solde=new Date(user[0].DATE_SOLDE_CONGE);
        var d_jour=new Date(ce_conge[0].DATE_CREATION);

        
        const query={query:"SELECT* from conge_demande where USER_ID="+id_user+" AND DATE_CREATION<'"+ce_conge[0].DATE_CREATION+"' AND ID_TYPE_CONGE=1"}
        var result = await Model.getRequest(query)

        var r_exercice=[]

        var j=0
        for (var i = d_solde.getFullYear(); i <=d_jour.getFullYear(); i++) {
            if(i==d_solde.getFullYear()){
                // var obj={"avant":user[0].SOLDE_CONGE_INITIAL}
                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id_user+" AND EXERCICES<"+i+" AND ID_TYPE_CONGE=1  AND DATE_CREATION<'"+ce_conge[0].DATE_CREATION+"'"}
                var result = await Model.getRequest(query)
                
                var sld_total=user[0].SOLDE_CONGE_INITIAL-result[0].n
// console.log(ce_conge)
                if (ce_conge[0].EXERCICES<d_solde.getFullYear()) {
                    var sld_total1=sld_total-parseInt(ce_conge[0].DUREE)  
                }else

                var sld_total1=sld_total 

                var obj = {EXERCICE:"AVANT(année de configuration de vos droits au congés) "+i,SOLDE:sld_total,RESTE:sld_total1};
               
                if (sld_total>0||sld_total1) r_exercice.push(obj) 
                
            }
            
                var dt=new Date(i+"-12-31")

                var months = (dt.getFullYear() - d_solde.getFullYear()) * 12;
                months -= d_solde.getMonth();
                months += dt.getMonth();
                var months_n=months <= 0 ? 0 : months;

                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+id_user+" AND EXERCICES="+i+" AND ID_TYPE_CONGE=1 AND STATUT=1 AND DATE_CREATION<'"+ce_conge[0].DATE_CREATION+"'"}
                var result = await Model.getRequest(query)

                // console.log(result[0].n)

                if (months_n>=param_conge[0].MOIS_MINIMUM) {
                    var param_augment_conge=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

                    if (param_augment_conge[0].STATUT_REPETION==1) {
                        var anne_passe=i-d_embauche.getFullYear();
                        var ajout_annee= Math.floor(anne_passe/param_augment_conge[0].ANS)*param_augment_conge[0].NOMBRE;
                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                      
                        // var obj = {EXERCICE:i,SOLDE:j_total};

                        if (ce_conge[0].EXERCICES==i) {
                            var sld_total1=j_total-parseInt(ce_conge[0].DUREE)  
                        }else
        
                        var sld_total1=j_total 
                        
                var obj = {EXERCICE:i,SOLDE:j_total ,RESTE:sld_total1};
                
                        // obj[i] = j_total;
                        // r_exercice.push(obj)
                        if (j_total>0||sld_total1) r_exercice.push(obj) 
                    }else{
                        var anne_passe=i-d_embauche.getFullYear();
                        const query_1={query:"SELECT IFNULL(SUM(NOMBRE),0) as NOMBRE from parametrage_augmentation_conge where ANS <="+anne_passe}
                var param_augment_conge1 = await Model.getRequest(query_1)
                        
                        if (param_augment_conge1[0]) {
                            var ajout_annee= param_augment_conge1[0].NOMBRE;
                        }else var ajout_annee= 0
                        
                        var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)-result[0].n
                        
                        // var obj = {EXERCICE:i,SOLDE:j_total};
                        // obj[i] = j_total;
                        if (ce_conge[0].EXERCICES==i) {
                            var sld_total1=j_total-parseInt(ce_conge[0].DUREE)  
                        }else
        
                        var sld_total1=j_total 
                var obj = {EXERCICE:i,SOLDE:j_total,RESTE:sld_total1};

                        // r_exercice.push(obj)
                        if (j_total>0||sld_total1) r_exercice.push(obj) 
                    }
                   

                    j++
                }
                // console.log(i)
            
        }
        return r_exercice
    

    } catch (e) {
        return e.message
    }

}
exports.getNotification = async function (req, res) {

    try {

        id=req.params.id
        data=[]
        today=new Date().getFullYear()+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + new Date().getDate() ).slice(-2)

        user=await Model.getOne({table:"utilisateur",culomn:{"ID":id}})
        
        query_post={query:"SELECT count(*) as n from conge_validation  where ID_POST="+user[0].ID_POSTE+"  AND STATUT=0"}
        result_post = await Model.getRequest(query_post)
        query_interim={query:"SELECT* from conge_iterim_user ctu JOIN conge_demande cd on  ctu.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE WHERE STATUT=1 AND ID_USER="+id+" AND DATE_RETOUR > "+today}
        result_interim = await Model.getRequest(query_interim)

        //  console.log(result_interim)
    j=0
         await Promise.all(result_interim.map(async val => {
            //  console.log(val)
            user1=await Model.getOne({table:"utilisateur",culomn:{"ID":val.USER_ID}})
            
            query_post1={query:"SELECT count(*) as n from conge_validation  where ID_POST="+user1[0].ID_POSTE+" AND STATUT=0"}
            result_post1 = await Model.getRequest(query_post1)
            j+=result_post1[0].n
            // console.log(result_post1[0].n)
         }))
         total_conge=j+result_post[0].n
    
         data.push({"type":" Demande(s) de Congé","value":total_conge,"slogan":"notification_conge",})

         
    return res.status(200).json({ status: 200,data:data,response:"ok" , message: "Succesfully Retrieved" });

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
    
}

exports.conge_a_traiter = async function (req, res) {

    // const query={query:"SELECT* FROM conge_demande cd JOIN type_conges tc on cd.ID_TYPE_CONGE=tc.ID_TYPE_CONGE  WHERE USER_ID="+req.params.id+" ORDER BY cd.DATE_CREATION DESC"}

    try {

        id=req.params.id
        data=[]
        var r={"data":[]}
        today=new Date().getFullYear()+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + new Date().getDate() ).slice(-2)

        user=await Model.getOne({table:"utilisateur",culomn:{"ID":id}})
        
        query_post={query:"SELECT* from conge_validation cv JOIN conge_demande cd on cv.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE JOIN utilisateur ut on cd.USER_ID=ut.ID JOIN type_conges tc on cd.ID_TYPE_CONGE=tc.ID_TYPE_CONGE where ID_POST="+user[0].ID_POSTE+"  ORDER BY cd.ID_CONGE_DEMAMDE DESC"}
        result_post = await Model.getRequest(query_post)

        // console.log(result_post)
        await Promise.all(result_post.map(async val => {

                                   if (val['STATUT']==0) {
                          var statut="<span style='color:blue'>CREE</span>" 
                          var date="<span style='color:blue'>"+val['DATE_CREATION']+"</span>" 
                        //    action+='<button id="mod|'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-success getModif1" style="margin-right:10px">Modifier</buton><button id="supp|'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-danger getModif1" style="margin-right:10px">Supprimer</buton> '
                       }else  if (val['STATUT']==1) {
                        var statut="<span style='color:Green'>VALIDE</span>" 
                        var date="<span style='color:Green'>"+val['DATE_CREATION']+"</span>" 
                     }else  if (val['STATUT']==2) {
                        var statut="<span style='color:red'>REFUSE</span>" 
                        var date="<span style='color:red'>"+val['DATE_CREATION']+"</span>" 
                     }

            // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
            var action='<button id="'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-primary traiter" style="margin-right:10px">Traiter</buton>'
           
            r.data.push({ID_CONGE_DEMAMDE:val['ID_CONGE_DEMAMDE'],DATE_CREATION:date,NOMPRENOM:val['NOM']+" "+val['PRENOM'],MOTIF:val['MOTIF'],EXERCICES:val['EXERCICES'],ADRESSE_CONGE:val['ADRESSE_CONGE'],DATE_DEBUT:val['DATE_DEBUT'],DATE_FIN:val['DATE_FIN'],DATE_RETOUR:val['DATE_RETOUR'],STATUT:statut,NOMBRE:val['DUREE'],TYPE_CONGE:val['DESCRIPTION_CONGE'],ACTION:action})
            
        }));

        query_interim={query:"SELECT* from conge_iterim_user ctu JOIN conge_demande cd on  ctu.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE WHERE STATUT=1 AND ID_USER="+id+" AND DATE_RETOUR > "+today}
        result_interim = await Model.getRequest(query_interim)

        //  console.log(result_interim)
    j=0
         await Promise.all(result_interim.map(async val => {
            //  console.log(val)
            user1=await Model.getOne({table:"utilisateur",culomn:{"ID":val.USER_ID}})
            
            query_post1={query:"SELECT cd.ID_CONGE_DEMAMDE,DATE_CREATION,NOM,PRENOM,MOTIF,EXERCICES,ADRESSE_CONGE,DATE_DEBUT,DATE_FIN,DATE_RETOUR,cd.STATUT,DUREE,DESCRIPTION_CONGE from conge_validation cv JOIN conge_demande cd on cv.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE JOIN utilisateur ut on cd.USER_ID=ut.ID JOIN type_conges tc on cd.ID_TYPE_CONGE=tc.ID_TYPE_CONGE where ID_POST="+user1[0].ID_POSTE+" ORDER BY cd.ID_CONGE_DEMAMDE DESC"}
            result_post1 = await Model.getRequest(query_post1)
            // j+=result_post1[0].n
            // query_post={query:"SELECT* from conge_validation cv JOIN conge_demande cd on cv.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE JOIN utilisateur ut on cd.USER_ID=ut.ID  where ID_POST="+user[0].ID_POSTE+"  AND cv.STATUT=0"}
            // result_post = await Model.getRequest(query_post)
    
            // console.log(result_post1)
            await Promise.all(result_post1.map(async val1 => {

                if (val1['STATUT']==0) {
                    var statut="<span style='color:blue'>CREE</span>" 
                    var date="<span style='color:blue'>"+val1['DATE_CREATION']+"</span>" 
                    //  action+='<button id="mod|'+val1['ID_CONGE_DEMAMDE']+'" class="btn btn-success getModif1" style="margin-right:10px">Modifier</buton><button id="supp|'+val1['ID_CONGE_DEMAMDE']+'" class="btn btn-danger getModif1" style="margin-right:10px">Supprimer</buton> '
                 }else  if (val1['STATUT']==1) {
                  var statut="<span style='color:Green'>VALIDE</span>" 
                  var date="<span style='color:Green'>"+val1['DATE_CREATION']+"</span>" 
               }else  if (val1['STATUT']==2) {
                  var statut="<span style='color:red'>REFUSE</span>" 
                  var date="<span style='color:red'>"+val1['DATE_CREATION']+"</span>" 
               }
    
                // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                var action='<button id="'+val1['ID_CONGE_DEMAMDE']+'" class="btn btn-primary traiter" style="margin-right:10px">Traiter</buton>'
               
                r.data.push({ID_CONGE_DEMAMDE:val1['ID_CONGE_DEMAMDE'],DATE_CREATION:date,NOMPRENOM:val1['NOM']+" "+val1['PRENOM'],MOTIF:val['MOTIF'],EXERCICES:val1['EXERCICES'],ADRESSE_CONGE:val1['ADRESSE_CONGE'],DATE_DEBUT:val1['DATE_DEBUT'],DATE_FIN:val1['DATE_FIN'],DATE_RETOUR:val1['DATE_RETOUR'],STATUT:statut,NOMBRE:val1['DUREE'],TYPE_CONGE:val1['DESCRIPTION_CONGE'],ACTION:action})
                
            }));
            // console.log(result_post1[0].n)
         }))
    //      total_conge=j+result_post[0].n



                    
      return  res.status(200).json(r);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
    }

exports.traiter_conge = async function (req, res) {
    try {
        var id=req.body.id
        var id_conge_demande=req.body.id_conge_demande
        var statut=req.body.statut
        var comment=req.body.comment
        today=new Date().getFullYear()+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + new Date().getDate() ).slice(-2)
       

        var user=await Model.getOne({table:"utilisateur",culomn:{"ID":id}})

        

        query_interim={query:"SELECT* from conge_iterim_user ctu JOIN conge_demande cd on  ctu.ID_CONGE_DEMAMDE=cd.ID_CONGE_DEMAMDE WHERE STATUT=1 AND ID_USER="+id+" AND DATE_RETOUR > "+today}
        result_interim = await Model.getRequest(query_interim)

       

        // console.log(result_interim)
         await Promise.all(result_interim.map(async val => {
            var infos={"USER_ID":id,
            "COMMENT":comment,
            "STATUT":statut,
            "DATE_VALIDATION":today +" "+("0" + new Date().getHours() ).slice(-2)+":"+("0" + new Date().getMinutes() ).slice(-2)+":"+("0" + new Date().getSeconds() ).slice(-2),
            "INTERIM":1
           }
            user1=await Model.getOne({table:"utilisateur",culomn:{"ID":val.USER_ID}})
            await Model.update({table:"conge_validation",culomn:infos,conditions:{"ID_CONGE_DEMAMDE":id_conge_demande,"ID_POST":user1[0].ID_POSTE}})
            if(statut==2)
            await Model.update({table:"conge_demande",culomn:{"STATUT":2},conditions:{"ID_CONGE_DEMAMDE":id_conge_demande}}) 
         }))

        
  
         var infos={"USER_ID":id,
         "COMMENT":comment,
         "STATUT":statut,
         "DATE_VALIDATION":today +" "+("0" + new Date().getHours() ).slice(-2)+":"+("0" + new Date().getMinutes() ).slice(-2)+":"+("0" + new Date().getSeconds() ).slice(-2),
         "INTERIM":0
        }

        await Model.update({table:"conge_validation",culomn:infos,conditions:{"ID_CONGE_DEMAMDE":id_conge_demande,"ID_POST":user[0].ID_POSTE}})
        if(statut==2)
        await Model.update({table:"conge_demande",culomn:{"STATUT":2},conditions:{"ID_CONGE_DEMAMDE":id_conge_demande}}) 
              // ---------------EMAIL---------------------------------------

              var conge=await Model.getOne({table:"conge_demande",culomn:{"ID_CONGE_DEMAMDE":id_conge_demande}})
              var demandeur=await Model.getOne({table:"utilisateur",culomn:{"ID":conge[0].USER_ID}})
              if (statut==1) {
                var msg="accepté"
              }else var msg="refusé"
                    
            //   console.log()
                    var transporter = require("../config/email.config");

                    var mailOptions = {
                    from: 'rh@bije.bi',
                    to: demandeur[0].EMAIL,
                    subject: 'REACTION SUR VOTRE DEMENDE DE CONGE',
                    text: " ",
                    html:"Monsieur/Madame "+user[0].NOM+" "+user[0].PRENOM+" ("+user[0].MATRICULE+") a "+msg+" votre demande de congé"
                };

                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log('Email sent: ' + vl['EMAIL']);
                    }
                    });

        return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.check_validation = async function (req, res) {

    try {
        var id_conge=req.params.id_conge
        var id_user=req.params.id_user
        var user=await Model.getOne({table:"conge_validation",culomn:{"ID_CONGE_DEMAMDE":id_conge,"USER_ID":id_user}})
  
        // console.log(id_conge)
        // console.log(id_user)
        return res.status(200).json({ status: 200,check_validation:user,response:"ok" , message: "Succesfully Retrieved" });
    

    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non" });
    }
}

exports.users_conge_solde = async function (req, res) {

    const query={query:"SELECT* FROM utilisateur u WHERE u.STATUT=1"}

    try {
      // var users = await Model.getOne(table)
      var param_conge=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
      var result = await Model.getRequest(query)
      var r={"data":[]}
      await Promise.all(result.map(async val => {

        if (val['DATE_EMBAUCHE']&&val['DATE_SOLDE_CONGE']) {
            
            // console.log(val['DATE_SOLDE_CONGE'])
        
                const query={query:"SELECT IFNULL(SUM(DUREE),0) as n from conge_demande where USER_ID="+val['ID']+" AND ID_TYPE_CONGE=1 AND STATUT=1"}
            var result = await Model.getRequest(query)
            

            var param_augment_conge=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

            if (param_augment_conge[0].STATUT_REPETION==1) {
                
                var anne_passe=new Date().getFullYear()-new Date(val['DATE_SOLDE_CONGE']).getFullYear();
                // var anne_passe="";
                var ajout_annee= Math.floor(anne_passe/param_augment_conge[0].ANS)*param_augment_conge[0].NOMBRE;
                var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)+val['SOLDE_CONGE_INITIAL']-result[0].n
            
            }else{
                var anne_passe=new Date().getFullYear()-new Date(val['DATE_SOLDE_CONGE']).getFullYear();
                // var anne_passe="";
                
                const query_1={query:"SELECT IFNULL(SUM(NOMBRE),0) as NOMBRE from parametrage_augmentation_conge where ANS <="+anne_passe}
                var param_augment_conge1 = await Model.getRequest(query_1)
                
                if (param_augment_conge1[0]) {
                    var ajout_annee= param_augment_conge1[0].NOMBRE;
                }else var ajout_annee= 0
                
                var j_total=parseInt(param_conge[0].NOMBRE_JOUR_INTILIALE)+parseInt(ajout_annee)+val['SOLDE_CONGE_INITIAL']-result[0].n
            }

        }else var j_total="NON CONFUGURE"
        
            r.data.push({NOM_PRENOM:val['NOM']+" "+val['PRENOM'],MATRICULE:val['MATRICULE'],DATE_EMBAUCHE:val['DATE_EMBAUCHE'],SOLDE:j_total})

        }));
                    
      return  res.status(200).json(r);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.conge_tout = async function (req, res) {

    // const query={query:"SELECT* FROM conge_demande cd JOIN type_conges tc on cd.ID_TYPE_CONGE=tc.ID_TYPE_CONGE  WHERE USER_ID="+req.params.id+" ORDER BY cd.DATE_CREATION DESC"}

    try {

        // id=req.params.id
        data=[]
        var r={"data":[]}
        today=new Date().getFullYear()+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + new Date().getDate() ).slice(-2)

        // user=await Model.getOne({table:"utilisateur",culomn:{"ID":id}})
        
        query_post={query:"SELECT ID_CONGE_DEMAMDE,NOM,PRENOM,MOTIF,EXERCICES,ADRESSE_CONGE,DATE_DEBUT,DATE_FIN,DATE_RETOUR,DESCRIPTION_CONGE,DUREE,DATE_CREATION,cd.STATUT from  conge_demande cd JOIN utilisateur ut on cd.USER_ID=ut.ID JOIN type_conges tc on cd.ID_TYPE_CONGE=tc.ID_TYPE_CONGE ORDER BY cd.ID_CONGE_DEMAMDE DESC"}
        result_post = await Model.getRequest(query_post)

        // console.log(result_post)
        await Promise.all(result_post.map(async val => {

                                   if (val['STATUT']==0) {
                          var statut="<span style='color:blue'>CREE</span>" 
                          var date="<span style='color:blue'>"+val['DATE_CREATION']+"</span>" 
                        //    action+='<button id="mod|'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-success getModif1" style="margin-right:10px">Modifier</buton><button id="supp|'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-danger getModif1" style="margin-right:10px">Supprimer</buton> '
                       }else  if (val['STATUT']==1) {
                        var statut="<span style='color:Green'>VALIDE</span>" 
                        var date="<span style='color:Green'>"+val['DATE_CREATION']+"</span>" 
                     }else  if (val['STATUT']==2) {
                        var statut="<span style='color:red'>REFUSE</span>" 
                        var date="<span style='color:red'>"+val['DATE_CREATION']+"</span>" 
                     }

            // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
            var action='<button id="'+val['ID_CONGE_DEMAMDE']+'" class="btn btn-primary traiter" style="margin-right:10px">Détail</buton>'
           
            r.data.push({ID_CONGE_DEMAMDE:val['ID_CONGE_DEMAMDE'],DATE_CREATION:date,NOMPRENOM:val['NOM']+" "+val['PRENOM'],MOTIF:val['MOTIF'],EXERCICES:val['EXERCICES'],ADRESSE_CONGE:val['ADRESSE_CONGE'],DATE_DEBUT:val['DATE_DEBUT'],DATE_FIN:val['DATE_FIN'],DATE_RETOUR:val['DATE_RETOUR'],STATUT:statut,NOMBRE:val['DUREE'],TYPE_CONGE:val['DESCRIPTION_CONGE'],ACTION:action})
            
        }));
              
      return  res.status(200).json(r);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
}