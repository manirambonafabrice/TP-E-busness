require('events').EventEmitter.prototype._maxListeners = 100;
const Model = require("../models/model");
const AD = require("../config/ad.config");
const e = require("express");
const { Console } = require('console');
var user_authentificated=[]
const JWT = require('jsonwebtoken');
const SESSIONSTORAGE = require('node-sessionstorage');




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

    // console.log(req)

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

        if(username&&pwd){

              var psw=(cript(pwd, username))
                
              var user=await Model.getOne({table:"utilisateur",culomn:{"USERNAME":username,"PWD":psw}})
              var n1= Object.keys(user_authentificated).length

              if(user.length>0){
                    var user_role=await Model.getOne({table:"utilisateurs_role",culomn:{"ID_UT":user[0].ID,"ID_ROLE":1}})
                    var raison=await Model.getOne({table:"raisons_sociales",culomn:{"ID_RAISON":user[0].ID_RAISON}})
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

                      
                     token= JWT.sign({username: username,pwd:psw}, psw, { expiresIn: 60 * 60 *15 })

                    
              
                      return res.status(200).json({ status: 200,tokenKey:token, data: {ID:user[0].ID,NOM:user[0].NOM,PRENOM:user[0].PRENOM,USERNAME:username,TELEPHONE:user[0].TELEPHONE,EMAIL:user[0].EMAIL,PWD:pwd,PROFIL:r,paths:paths,TYPE_USER:user[0].INTERNE_EXTERNE,FOTO:user[0].FOTO,ID_RAISON:user[0].ID_RAISON,RAISON_LOGO:raison[0].LOGO,STATUT:user[0].STATUT}, message: "Succesfully Retrieved",response:"ok",type:"ok" });
                      
                  }else return res.status(200).json({ status: 200, message: "bloqué",FOTO:"",response:"non",type:"ok" });
              }


            else {
              
                return res.status(200).json({ status: 200, message: "no correct",response:"non",type:"ok" });
            }
        // });

        }else
        return res.status(200).json({ status: 200, message: "Veuiller verifier les champs obligatoire",response:"non",type:"ok"});
    } catch (e) {
        return res.status(200).json({ status: 200, message: e.message,response:"non",type:"probleme" });
    }
  
}

exports.synchronisation = async function (req, res) {
    let token = req.headers.authorization;
      token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

    try {
    
        // console.log(req.body)
        // console.log(req.body[0].client_non_envoye)
        // console.log(req.body[1].facture_non_envoye)
        // console.log(req.body[2].paiement_non_envoye)

        req.body[0].client_non_envoye.forEach(async element => {
            await Model.insert({table:"client",culomn:{ID_CLIENT:element['ID_CLIENT'],NOM_CLIENT:element['NOM_CLIENT'],PRENOM_CLIENT:element['PRENOM_CLIENT'],TELEPHONE:element['TELEPHONE'],DEVICE_ID:req.body[3].imei}})
        });

        req.body[1].facture_non_envoye.forEach(async element => {
            await Model.insert({table:"facture",culomn:{NUMERO_FACTURE:element['NUMERO_FACTURE'],ID_CLIENT:element['ID_CLIENT'],ID_TRAJET:element['ID_TRAJET'],DATE_TIME:element['DATE_TIME'],MONTANT:element['MONTANT'],DEVICE_ID:req.body[3].imei,ID_RAISON:user1[0].ID_RAISON}})
        });

        req.body[2].paiement_non_envoye.forEach(async element => {
            await Model.insert({table:"paiement",culomn:{NUMERO_FACTURE:element['NUMERO_FACTURE'],USER_ID:element['USER_ID'],DEVICE_ID:req.body[3].imei}})
        });

        var etat_user=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
        var clients=await Model.getList({table:"client"})
        var vehicules=await Model.getList({table:"vehicules",culomn:{"ID_RAISON":user1[0].ID_RAISON}})
        // var etat_user=await Model.getList({table:"trajet_transport",culomn:{"trajet_transport":token_key[2]}})
        var dt=new Date()
        // var dt1=embauche.getDate()).padStart(2, '0')+"/"+String(embauche.getMonth() + 1).padStart(2, '0')+"/"+embauche.getFullYear();
        var dt1=dt.getFullYear()+"-"+String(dt.getMonth() + 1).padStart(2, '0')+"-"+String(dt.getDate()).padStart(2, '0')+" 00:00:00";
        // console.log(dt1)
        const query={query:"SELECT* FROM trajet_transport WHERE STATUT=0 AND DATE_HEURE_DEPART>='"+dt1+"'"}
        
        var result = await Model.getRequest(query)
        var r=[]
        await Promise.all(result.map(async val => {

            await getOneItineraire (val.ID_ITINERAIRE).then( (res)=> {
              // console.log(res.iti)
                r.push({ID_TRAJET:val.ID_TRAJET,DATE_HEURE_DEPART:val.DATE_HEURE_DEPART,ID_VEHICULE:val.ID_VEHICULE,STATUT:val.STATUT,ID_ITINERAIRE:val.ID_ITINERAIRE,PRIX:res.itineraire[0].PRIX,TRAJET_DESCRIPTION:res.iti.orig[0].DESCRIPTION+"-"+res.iti.dest[0].DESCRIPTION})
                
            })
            
            var iti_interm=await Model.getList({table:"itineraires_intermediaire",culomn:{"ID_ITINERAIRE":val.ID_ITINERAIRE}})
            
            await Promise.all(iti_interm.map(async val1 => {

              await getOneItineraire_intermediaire (val1.ID_ITINERAIRE_INT).then( (res1)=> {
                // console.log(res1.iti)
                  r.push({ID_TRAJET:val.ID_TRAJET,DATE_HEURE_DEPART:val.DATE_HEURE_DEPART,ID_VEHICULE:val.ID_VEHICULE,STATUT:val.STATUT,ID_ITINERAIRE:val.ID_ITINERAIRE,PRIX:res1.itineraire[0].PRIX,TRAJET_DESCRIPTION:res1.iti.orig[0].DESCRIPTION+"-"+res1.iti.dest[0].DESCRIPTION})
                  
              })
              
            }))
            
        }))
        // console.log(result)
  
      return res.status(200).json({ status: 200,clients:clients,res:r,trajet_plan:result,user_info:etat_user,vehicules:vehicules,response:"ok" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }
  exports.synchronisation_facture_paiement = async function (req, res) {

    // console.log("called")
    let token = req.headers.authorization;
      token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

    try {

      // console.log(req.body[1].facture_non_envoye)
      // console.log(JSON.stringify(req.body[0].facture_non_envoye))

        req.body[0].facture_non_envoye.forEach(async element => {
            await Model.insert({table:"facture",culomn:{NUMERO_FACTURE:element['NUMERO_FACTURE'],ID_CLIENT:element['ID_CLIENT'],ID_TRAJET:element['ID_TRAJET'],DATE_TIME:element['DATE_TIME'],MONTANT:element['MONTANT'],DEVICE_ID:req.body[2].imei,ID_RAISON:user1[0].ID_RAISON}})
        });

        req.body[1].paiement_non_envoye.forEach(async element => {
            await Model.insert({table:"paiement",culomn:{NUMERO_FACTURE:element['NUMERO_FACTURE'],USER_ID:element['USER_ID'],DEVICE_ID:req.body[2].imei}})
        });

      
  
      return res.status(200).json({ status: 200,response:"ok" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }
  
   async function getOneItineraire (id) {

    try {
      // var users = await Model.getOne(table)
  
      
    //   let token = req.headers.authorization;
    //   token_key=token.split(' ')
    //   var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
      var itineraire=await Model.getOne({table:"itineraires",culomn:{"ID_ITINERAIRE":id}})
      
      switch (itineraire[0].TYPE_ITINERAIRE) {
        case 1:
          var lieu={prov:'',com:'',zone:'',point:''}
          var lieu1={prov1:[],com1:[],zone1:[],point1:[]}
          var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].PROVINCE_ID,DESCRIPTION:origine[0].PROVINCE_NAME}],dest:[{ID:dest[0].PROVINCE_ID,DESCRIPTION:dest[0].PROVINCE_NAME}]}
        break;
  
        case 2:
          var com=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].ORIGINE}})
          var PRO=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":com[0].PROVINCE_ID}})
          var lieu={prov:com[0].PROVINCE_ID,com:'',zone:'',point:''}
          var lieu1={prov1:[{ID:com[0].PROVINCE_ID,DESCRIPTION:PRO[0].PROVINCE_NAME}],com1:[],zone1:[],point1:[]}
  
          var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].COMMUNE_ID,DESCRIPTION:origine[0].COMMUNE_NAME}],dest:[{ID:dest[0].COMMUNE_ID,DESCRIPTION:dest[0].COMMUNE_NAME}]}
       
          // console.log(com)
        break;
  
        case 3:
          var query={query:"SELECT* from zones z left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE ZONE_ID="+itineraire[0].ORIGINE}
          var result = await Model.getRequest(query)
         
          var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:'',point:''}
          var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[],point1:[]}
          var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"zones",culomn:{"ZONE_ID":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].ZONE_ID,DESCRIPTION:origine[0].ZONE_NAME}],dest:[{ID:dest[0].ZONE_ID,DESCRIPTION:dest[0].ZONE_NAME}]}
       
          break;
  
        case 4:
          var query={query:"SELECT* from points_de_vente po left join zones z on po.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE ID_POINT="+itineraire[0].ORIGINE}
          var result = await Model.getRequest(query)
          
          var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:result[0].ZONE_ID,point:''}
          var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[{ID:result[0].ZONE_ID,DESCRIPTION:result[0].ZONE_NAME}],point1:[]}
          var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].ID_POINT,DESCRIPTION:origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")"}],dest:[{ID:dest[0].ID_POINT,DESCRIPTION:dest[0].APPELLATION_POINT+"("+dest[0].LOCALITE+")"}]}
       
        break;
      
        default:
          var lieu={prov:'',com:'',zone:'',point:''}
          break;
      }
    
      var r=[]
  
   
      return {iti:iti,itineraire:itineraire};
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }

  async function getOneItineraire_intermediaire (id) {

    try {
      // var users = await Model.getOne(table)
  
      
    //   let token = req.headers.authorization;
    //   token_key=token.split(' ')
    //   var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
      var itineraire=await Model.getOne({table:"itineraires_intermediaire",culomn:{"ID_ITINERAIRE_INT":id}})
      
      switch (itineraire[0].TYPE_ITINERAIRE) {
        case 1:
          var lieu={prov:'',com:'',zone:'',point:''}
          var lieu1={prov1:[],com1:[],zone1:[],point1:[]}
          var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].PROVINCE_ID,DESCRIPTION:origine[0].PROVINCE_NAME}],dest:[{ID:dest[0].PROVINCE_ID,DESCRIPTION:dest[0].PROVINCE_NAME}]}
        break;
  
        case 2:
          var com=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].ORIGINE}})
          var PRO=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":com[0].PROVINCE_ID}})
          var lieu={prov:com[0].PROVINCE_ID,com:'',zone:'',point:''}
          var lieu1={prov1:[{ID:com[0].PROVINCE_ID,DESCRIPTION:PRO[0].PROVINCE_NAME}],com1:[],zone1:[],point1:[]}
  
          var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].COMMUNE_ID,DESCRIPTION:origine[0].COMMUNE_NAME}],dest:[{ID:dest[0].COMMUNE_ID,DESCRIPTION:dest[0].COMMUNE_NAME}]}
       
          // console.log(com)
        break;
  
        case 3:
          var query={query:"SELECT* from zones z left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE ZONE_ID="+itineraire[0].ORIGINE}
          var result = await Model.getRequest(query)
         
          var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:'',point:''}
          var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[],point1:[]}
          var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"zones",culomn:{"ZONE_ID":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].ZONE_ID,DESCRIPTION:origine[0].ZONE_NAME}],dest:[{ID:dest[0].ZONE_ID,DESCRIPTION:dest[0].ZONE_NAME}]}
       
          break;
  
        case 4:
          var query={query:"SELECT* from points_de_vente po left join zones z on po.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE ID_POINT="+itineraire[0].ORIGINE}
          var result = await Model.getRequest(query)
          
          var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:result[0].ZONE_ID,point:''}
          var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[{ID:result[0].ZONE_ID,DESCRIPTION:result[0].ZONE_NAME}],point1:[]}
          var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":itineraire[0].ORIGINE}})
          var dest=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":itineraire[0].DESTINATION}})
          var iti={orig:[{ID:origine[0].ID_POINT,DESCRIPTION:origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")"}],dest:[{ID:dest[0].ID_POINT,DESCRIPTION:dest[0].APPELLATION_POINT+"("+dest[0].LOCALITE+")"}]}
       
        break;
      
        default:
          var lieu={prov:'',com:'',zone:'',point:''}
          break;
      }
    
      var r=[]
  
   
      return {iti:iti,itineraire:itineraire};
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  }

  exports.save_facture = async function (req, res) {
    let token = req.headers.authorization;
      token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

    try {

      var json=JSON.stringify(req.body) 

      var facture=req.body[0].facture
      var paiement=req.body[1].paiement
      
      await Model.insert({table:"facture",culomn:{NUMERO_FACTURE:facture.NUMERO_FACTURE,ID_CLIENT:facture.ID_CLIENT,ID_TRAJET:facture.ID_TRAJET,DATE_TIME:facture.DATE_TIME,MONTANT:facture.MONTANT,ID_RAISON:user1[0].ID_RAISON,USER_ID:token_key[2],DEVICE_ID:req.body[2].imei}})
      await Model.insert({table:"paiement",culomn:{NUMERO_FACTURE:facture.NUMERO_FACTURE,USER_ID:token_key[2],DEVICE_ID:req.body[2].imei}})
 
  
      return res.status(200).json({ status: 200,response:"ok" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message,response:"no" });
    }
  }
  