require('events').EventEmitter.prototype._maxListeners = 100;
const Model = require("../models/model");
const AD = require("../config/ad.config");
const e = require("express");
const { Console } = require('console');



exports.list_province = async function (req, res) {

    try {
      // var users = await Model.getOne(table)
      const query={query:"SELECT* from provinces order by PROVINCE_NAME"}
      var result = await Model.getRequest(query)
    //   var result = await  Model.getList({table:"services_ou"})
      var r={"data":[]}

    //   console.log(result)
    i=1
      await Promise.all(result.map(async val => {
                      

                        // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                        // var action='<button id="mod-'+val['ID_SERVICE']+'" class="btn btn-primary getDetailsOu" style="margin-right:10px">Modifier</buton>'
                        // var action1='<button id="supp-'+val['ID_SERVICE']+'" class="btn btn-danger getDetailsOu" >Supprimer</buton>'
                        
                       
                        r.data.push({NUMERO:i,PROVINCE:val['PROVINCE_NAME'],LONGITUDE:val['PROVINCE_LONGITUDE'],LATITUDE:val['PROVINCE_LATITUDE'],})
                    i++    
                    }));
                    
      return  res.status(200).json(r);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getProvince = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    const query={query:"SELECT* from provinces order by PROVINCE_NAME"}
    var result = await Model.getRequest(query)

    return res.status(200).json({ status: 200, provinces: result,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.getCommune = async function (req, res) {

  try {
    id_province=req.params.id
    // var users = await Model.getOne(table)
    const query={query:"SELECT* from communes where PROVINCE_ID="+id_province+" order by COMMUNE_NAME"}
    var result = await Model.getRequest(query)

    return res.status(200).json({ status: 200, communes: result,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.getZone = async function (req, res) {

  try {
    id=req.params.id
    // var users = await Model.getOne(table)
    const query={query:"SELECT* from zones where COMMUNE_ID="+id+" order by ZONE_NAME"}
    var result = await Model.getRequest(query)

    return res.status(200).json({ status: 200, zones: result,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.list_commune = async function (req, res) {

  try {
    id_province=req.params.id
    // var users = await Model.getOne(table)
    const query={query:"SELECT* from communes where PROVINCE_ID="+id_province+" order by COMMUNE_NAME"}
    var result = await Model.getRequest(query)
    var r={"data":[]}

    //   console.log(result)
    i=1
      await Promise.all(result.map(async val => {

                        r.data.push({NUMERO:i,COMMUNE:val['COMMUNE_NAME'],LONGITUDE:val['COMMUNE_LONGITUDE'],LATITUDE:val['COMMUNE_LATITUDE'],})
                    i++    
                    }));
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.list_zone = async function (req, res) {

  try {
    id_commune=req.params.id
    // var users = await Model.getOne(table)
    const query={query:"SELECT* from zones where COMMUNE_ID="+id_commune+" order by ZONE_NAME"}
    var result = await Model.getRequest(query)
    var r={"data":[]}

    //   console.log(result)
    i=1
      await Promise.all(result.map(async val => {
        action='<button id="mod|'+val['ZONE_ID']+'" class="btn btn-success zone" style="margin-right:10px">Modifier</buton><button id="supp|'+val['ZONE_ID']+'" class="btn btn-danger zone" style="margin-right:10px">Supprimer</buton> '

                        r.data.push({NUMERO:i,ZONE:val['ZONE_NAME'],LONGITUDE:val['ZONE_LATITUDE'],LATITUDE:val['ZONE_LONGITUDE'],ACTION:action})
                    i++    
                    }));
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.addZone = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      var user_id=req.body.user_id
      var commune_id=req.body.commune_id
      var zone=req.body.zone.charAt(0).toUpperCase() + req.body.zone.slice(1).toLowerCase();
          var infos={"ZONE_NAME":zone,
          "COMMUNE_ID":commune_id
          }


      var check=await Model.getOne({table:"zones",culomn:{"ZONE_NAME":zone}})
              var n= Object.keys(check).length
          
          if(n>0){
              return res.status(200).json({ status: 200, response:"non",message:"exist" });
          }else{

          var id=await Model.insert({table:"zones",culomn:infos})


          return res.status(200).json({ status: 200, response:"ok" });
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.updateZone = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      var id=req.body.id
      var longitude=req.body.longitude
      var latitude=req.body.latitude
      var zone=req.body.zone.charAt(0).toUpperCase() + req.body.zone.slice(1).toLowerCase();
      var old_zone=req.body.old_zone.charAt(0).toUpperCase() + req.body.old_zone.slice(1).toLowerCase();
          var infos={"ZONE_NAME":zone,
          "ZONE_LATITUDE":latitude,
          "ZONE_LONGITUDE":longitude,
          }


      var check=await Model.getOne({table:"zones",culomn:{"ZONE_NAME":zone}})
              var n= Object.keys(check).length
          
          if(n==0||zone==old_zone){
            // var id=await Model.insert({table:"zones",culomn:infos})

          var condition={ZONE_ID:id}
          await Model.update({table:"zones",culomn:infos,conditions:condition})
          return res.status(200).json({ status: 200, response:"ok" });
              
          }else{
            return res.status(200).json({ status: 200, response:"non",message:"exist" });
          
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}
exports.delete_zone = async function (req, res) {

  try {


      var condition={ZONE_ID:req.params.id}
      await Model.delete({table:"zones",conditions:condition})
    
       return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}
exports.getOne_zone = async function (req, res) {

  try {


    var zone=await Model.getList({table:"zones",culomn:{"ZONE_ID":req.params.id}})


    
       return res.status(200).json({ status: 200,zoneInfo:zone,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.list_raisons_solciales = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    const query={query:"SELECT* FROM raisons_sociales WHERE ID_RAISON<>0 order by RAISON_SOCIAL"}
    var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {
                    

                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                      var action='<button id="mod-'+val['ID_RAISON']+'" class="btn btn-success getDetailsRaison" style="margin-right:10px">Modifier</buton>'
                      var action1='<button id="supp-'+val['ID_RAISON']+'" class="btn btn-danger getDetailsRaison" >Supprimer</buton>'
                      
                     
                      r.data.push({RAISON:val['RAISON_SOCIAL'],NIF:val['NIF'],RC:val['RC'],TEL:val['TEL'],ACTION:action+" "+action1})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.addRaison = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')

      var foto=""
  
     if(req.body.blob.includes("data:image")) 
     {

          var base64Data = req.body.blob.replace(/^data:image\/png;base64,/, "");
          var foto="uploads/logo/"+new Date().getTime()+".png"
          

          require("fs").writeFile(foto, base64Data, 'base64', function(req,err) {
          // console.log(err);
          });

      }

      var NIF=req.body.NIF
      var RC=req.body.RC
      var TEL=req.body.TEL
      var raison=req.body.raison.toUpperCase();
          var infos={"RAISON_SOCIAL":raison,
          "RC":RC,
          "NIF":NIF,
          "TEL":TEL,
          "LOGO":foto,
          "USER_ID":token_key[2]
          }


      // var check=await Model.getOne({table:"raisons_sociales",culomn:{"ZONE_NAME":zone}})
      const query={query:"SELECT* from raisons_sociales where RC='"+RC+"' OR NIF='"+NIF+"'"}
    var check = await Model.getRequest(query)
              var n= Object.keys(check).length
          
          if(n>0){
              return res.status(200).json({ status: 200, response:"non",message:"exist" });
          }else{

          var id=await Model.insert({table:"raisons_sociales",culomn:infos})


          return res.status(200).json({ status: 200, response:"ok" });
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.delete_raison = async function (req, res) {

  try {


      var condition={ID_RAISON:req.params.id}
      await Model.delete({table:"raisons_sociales",conditions:condition})
    
       return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.getOne_raison = async function (req, res) {

  try {


    var raison=await Model.getList({table:"raisons_sociales",culomn:{"ID_RAISON":req.params.id}})


    
       return res.status(200).json({ status: 200,raisonInfo:raison,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.updateRaison = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req.body)
      let token = req.headers.authorization;
      token_key=token.split(' ')

      var foto=""
  
      if(req.body.blob.includes("data:image")) 
      {
 
           var base64Data = req.body.blob.replace(/^data:image\/png;base64,/, "");
           var foto="uploads/logo/"+new Date().getTime()+".png"
           
 
           require("fs").writeFile(foto, base64Data, 'base64', function(req,err) {
           // console.log(err);
           });
 
       }

      var id=req.body.id
      var NIF=req.body.NIF
      var RC=req.body.RC
      var old_raison=req.body.old_raison
      var old_RC=req.body.old_RC
      var old_NIF=req.body.old_NIF
      var TEL=req.body.TEL
      var raison=req.body.raison.toUpperCase();

      if (foto) {
        var infos={"RAISON_SOCIAL":raison,
        "RC":RC,
        "NIF":NIF,
        "TEL":TEL,
        "LOGO":foto,
        "USER_ID":token_key[2]
        }
      }else
          var infos={"RAISON_SOCIAL":raison,
          "RC":RC,
          "NIF":NIF,
          "TEL":TEL,
          "USER_ID":token_key[2]
          }


      // var check=await Model.getOne({table:"raisons_sociales",culomn:{"ZONE_NAME":zone}})
      const query={query:"SELECT* from raisons_sociales where RC='"+RC+"' OR NIF='"+NIF+"'"}
    var check = await Model.getRequest(query)
              var n= Object.keys(check).length
          
          if(n==0||old_RC==RC||old_NIF==NIF){
              
              // var id=await Model.insert({table:"raisons_sociales",culomn:infos})
              var condition={ID_RAISON:id}
          await Model.update({table:"raisons_sociales",culomn:infos,conditions:condition})
              return res.status(200).json({ status: 200, response:"ok" });
          }else{
            return res.status(200).json({ status: 200, response:"non",message:"exist" });

      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.list_vehicules = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    
if(user1[0].ID_RAISON>0){
  var query={query:"SELECT* FROM vehicules v left join raisons_sociales r on v.ID_RAISON=r.ID_RAISON left join vehicules_types vt on v.ID_VEHICULE_TYPE=vt.ID_VEHICULE_TYPE WHERE v.ID_RAISON="+user1[0].ID_RAISON+" order by PLAQUE"}

}else
    var query={query:"SELECT* FROM vehicules v left join raisons_sociales r on v.ID_RAISON=r.ID_RAISON left join vehicules_types vt on v.ID_VEHICULE_TYPE=vt.ID_VEHICULE_TYPE order by PLAQUE"}
    var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {
                    

                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                      var action='<button id="mod-'+val['ID_VEHICULE']+'" class="btn btn-success getDetailsvehicule" style="margin-right:10px">Modifier</buton>'
                      // var action1='<button id="supp-'+val['ID_VEHICULE']+'" class="btn btn-danger getDetailsvehicule" >Bloquer</buton>'
                      var action1=''
                     
                      r.data.push({RAISON:val['RAISON_SOCIAL'],PLACE:val['PLACE'],PLAQUE:val['PLAQUE'],TYPE:val['NOMBRE_PASSAGERS'],ACTION:action+" "+action1})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getTypeVehicule = async function (req, res) {

  try {
      
      var vehicules_types=await Model.getList({table:"vehicules_types"})


      return res.status(200).json({ status: 200,vehicules_types:vehicules_types,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.addVehicule = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var foto=""
  
     if(req.body.blob.includes("data:image")) 
     {

          var base64Data = req.body.blob.replace(/^data:image\/png;base64,/, "");
          var foto="uploads/vehicules/"+new Date().getTime()+".png"
          

          require("fs").writeFile(foto, base64Data, 'base64', function(req,err) {
          // console.log(err);
          });

      }
      
          var infos={
          "PLAQUE":req.body.plaque,
          "PLACE":req.body.nombre, 
          "ID_VEHICULE_TYPE":req.body.type_vehicule,
          "ID_RAISON":user1[0].ID_RAISON,
          "FOTO":foto,
          "USER_ID":token_key[2]
          }


      var check_veh_typ=await Model.getOne({table:"vehicules_types",culomn:{"ID_VEHICULE_TYPE":req.body.type_vehicule}})

      // console.log(req.body.nombre)

      if (req.body.nombre>=check_veh_typ[0].MIN&&req.body.nombre<=check_veh_typ[0].MAX) {
       
      const query={query:"SELECT* from vehicules where PLAQUE='"+req.body.plaque+"'"}
    var check = await Model.getRequest(query)
              var n= Object.keys(check).length
          
          if(n>0){
              return res.status(200).json({ status: 200, response:"non",message:"exist" });
          }else{

          var id=await Model.insert({table:"vehicules",culomn:infos})


          return res.status(200).json({ status: 200, response:"ok" });
      }
    }else return res.status(200).json({ status: 200, response:"non",message:"non_correspond" });

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.getOne_vehicule = async function (req, res) {

  try {


    var vehicule=await Model.getList({table:"vehicules",culomn:{"ID_VEHICULE":req.params.id}})


    
       return res.status(200).json({ status: 200,vehicule:vehicule,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.updateVehicule = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)

      id=req.body.id
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var foto=""
  
     if(req.body.blob.includes("data:image")) 
     {

          var base64Data = req.body.blob.replace(/^data:image\/png;base64,/, "");
          var foto="uploads/vehicules/"+new Date().getTime()+".png"
          

          require("fs").writeFile(foto, base64Data, 'base64', function(req,err) {
          // console.log(err);
          });

      }

      if(foto){
        var infos={
          "PLAQUE":req.body.plaque,
          "PLACE":req.body.nombre, 
          "ID_VEHICULE_TYPE":req.body.type_vehicule,
          "ID_RAISON":user1[0].ID_RAISON,
          "FOTO":foto,
          "USER_ID":token_key[2]
          }
      }else var infos={
        "PLAQUE":req.body.plaque,
        "PLACE":req.body.nombre, 
        "ID_VEHICULE_TYPE":req.body.type_vehicule,
        "ID_RAISON":user1[0].ID_RAISON,
        "USER_ID":token_key[2]
        }
          
      // var check=await Model.getOne({table:"raisons_sociales",culomn:{"ZONE_NAME":zone}})

      
      var check_veh_typ=await Model.getOne({table:"vehicules_types",culomn:{"ID_VEHICULE_TYPE":req.body.type_vehicule}})

      // console.log(req.body.nombre)

      if (req.body.nombre>=check_veh_typ[0].MIN&&req.body.nombre<=check_veh_typ[0].MAX) {
      const query={query:"SELECT* from vehicules where PLAQUE='"+req.body.plaque+"'"}
    var check = await Model.getRequest(query)
              var n= Object.keys(check).length
          
          if(n==0||req.body.plaque==req.body.old_plaque){
            
          // var id=await Model.insert({table:"vehicules",culomn:infos})
          var condition={ID_VEHICULE:id}
          await Model.update({table:"vehicules",culomn:infos,conditions:condition})


          return res.status(200).json({ status: 200, response:"ok" });
              
          }else{
            return res.status(200).json({ status: 200, response:"non",message:"exist" });
         }
        }else return res.status(200).json({ status: 200, response:"non",message:"non_correspond" });

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.list_point_vente = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    
if(user1[0].ID_RAISON>0){
  var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE p.ID_RAISON="+user1[0].ID_RAISON+" order by APPELLATION_POINT"}

}else
var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID order by APPELLATION_POINT"}
var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {
                    

                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                      var action='<button id="mod-'+val['ID_POINT']+'" class="btn btn-success getDetailspointVente" style="margin-right:10px">Modifier</buton>'
                      // var action1='<button id="supp-'+val['ID_VEHICULE']+'" class="btn btn-danger getDetailsvehicule" >Bloquer</buton>'
                      var action1=''
                     
                      r.data.push({RAISON:val['RAISON_SOCIAL'],PROVINCE:val['PROVINCE_NAME'],COMMUNE:val['COMMUNE_NAME'],ZONE:val['ZONE_NAME'],LOCALITE:val['LOCALITE'],APPELATION:val['APPELLATION_POINT'],LONGITUDE:val['LONGITUDE_POINT'],LATITUDE:val['LATITUDE_POINT'],ACTION:action+" "+action1})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.list_point_vente_prov = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    id=req.params.id
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    
if(user1[0].ID_RAISON>0){
  var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE pr.PROVINCE_ID="+id+" AND p.ID_RAISON="+user1[0].ID_RAISON+" order by APPELLATION_POINT"}

}else
var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID  WHERE pr.PROVINCE_ID="+id+" order by APPELLATION_POINT"}
var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {
                    

                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                      var action='<button id="mod-'+val['ID_POINT']+'" class="btn btn-success getDetailspointVente" style="margin-right:10px">Modifier</buton>'
                      // var action1='<button id="supp-'+val['ID_VEHICULE']+'" class="btn btn-danger getDetailsvehicule" >Bloquer</buton>'
                      var action1=''
                     
                      r.data.push({RAISON:val['RAISON_SOCIAL'],PROVINCE:val['PROVINCE_NAME'],COMMUNE:val['COMMUNE_NAME'],ZONE:val['ZONE_NAME'],LOCALITE:val['LOCALITE'],APPELATION:val['APPELLATION_POINT'],LONGITUDE:val['LONGITUDE_POINT'],LATITUDE:val['LATITUDE_POINT'],ACTION:action+" "+action1})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.list_point_vente_com = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    id=req.params.id
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    
if(user1[0].ID_RAISON>0){
  var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE c.COMMUNE_ID="+id+" AND p.ID_RAISON="+user1[0].ID_RAISON+" order by APPELLATION_POINT"}

}else
var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID  WHERE c.COMMUNE_ID="+id+" order by APPELLATION_POINT"}
var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {
                    

                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                      var action='<button id="mod-'+val['ID_POINT']+'" class="btn btn-success getDetailspointVente" style="margin-right:10px">Modifier</buton>'
                      // var action1='<button id="supp-'+val['ID_VEHICULE']+'" class="btn btn-danger getDetailsvehicule" >Bloquer</buton>'
                      var action1=''
                     
                      r.data.push({RAISON:val['RAISON_SOCIAL'],PROVINCE:val['PROVINCE_NAME'],COMMUNE:val['COMMUNE_NAME'],ZONE:val['ZONE_NAME'],LOCALITE:val['LOCALITE'],APPELATION:val['APPELLATION_POINT'],LONGITUDE:val['LONGITUDE_POINT'],LATITUDE:val['LATITUDE_POINT'],ACTION:action+" "+action1})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.list_point_vente_zone = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    id=req.params.id
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    
if(user1[0].ID_RAISON>0){
  var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE p.ZONE_ID="+id+" AND p.ID_RAISON="+user1[0].ID_RAISON+" order by APPELLATION_POINT"}

}else
var query={query:"SELECT* FROM points_de_vente p left join raisons_sociales r on p.ID_RAISON=r.ID_RAISON left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID  WHERE p.ZONE_ID="+id+" order by APPELLATION_POINT"}
var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {
                    

                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                      var action='<button id="mod-'+val['ID_POINT']+'" class="btn btn-success getDetailspointVentezone" style="margin-right:10px">Modifier</buton>'
                      // var action1='<button id="supp-'+val['ID_VEHICULE']+'" class="btn btn-danger getDetailsvehicule" >Bloquer</buton>'
                      var action1=''
                     
                      r.data.push({RAISON:val['RAISON_SOCIAL'],PROVINCE:val['PROVINCE_NAME'],COMMUNE:val['COMMUNE_NAME'],ZONE:val['ZONE_NAME'],LOCALITE:val['LOCALITE'],APPELATION:val['APPELLATION_POINT'],LONGITUDE:val['LONGITUDE_POINT'],LATITUDE:val['LATITUDE_POINT'],ACTION:action+" "+action1})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.addPointVente = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var foto=""

      var localite=req.body.localite
      var point_vente=req.body.point_vente
      var longitude=req.body.longitude
      var latitude=req.body.longitude
      var zone_id=req.body.zone_id
          var infos={
          "LOCALITE":localite,
          "ZONE_ID":zone_id,
          "APPELLATION_POINT":point_vente,
          "LONGITUDE_POINT":longitude,
          "LATITUDE_POINT":latitude,
          "ID_RAISON":user1[0].ID_RAISON,
          "USER_ID":token_key[2]
          }


      // var check=await Model.getOne({table:"raisons_sociales",culomn:{"ZONE_NAME":zone}})
      const query={query:"SELECT* from points_de_vente where APPELLATION_POINT='"+point_vente+"'"}
    var check = await Model.getRequest(query)
              var n= Object.keys(check).length
          
          if(n>0){
              return res.status(200).json({ status: 200, response:"non",message:"exist" });
          }else{

          var id=await Model.insert({table:"points_de_vente",culomn:infos})


          return res.status(200).json({ status: 200, response:"ok" });
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.updatePointVente = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var foto=""

      var id=req.body.id
      var localite=req.body.localite
      var point_vente=req.body.point_vente
      var oldpoint_vente=req.body.oldpoint_vente
      var longitude=req.body.longitude
      var latitude=req.body.latitude
      var zone_id=req.body.zone_id
          var infos={
          "LOCALITE":localite,
          "ZONE_ID":zone_id,
          "APPELLATION_POINT":point_vente,
          "LONGITUDE_POINT":longitude,
          "LATITUDE_POINT":latitude,
          "ID_RAISON":user1[0].ID_RAISON,
          "USER_ID":token_key[2]
          }


      // var check=await Model.getOne({table:"raisons_sociales",culomn:{"ZONE_NAME":zone}})
      const query={query:"SELECT* from points_de_vente where APPELLATION_POINT='"+point_vente+"'"}
    var check = await Model.getRequest(query)
              var n= Object.keys(check).length
          
          if(n==0||point_vente==oldpoint_vente){
            var condition={ID_POINT:id}
            // console.log(id)
            await Model.update({table:"points_de_vente",culomn:infos,conditions:condition})
          // var id=await Model.insert({table:"points_de_vente",culomn:infos})


          return res.status(200).json({ status: 200, response:"ok" });
              
          }else{
            return res.status(200).json({ status: 200, response:"non",message:"exist" });
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}
exports.getOnePoint = async function (req, res) {

  try {


    var point=await Model.getList({table:"points_de_vente",culomn:{"ID_POINT":req.params.id}})


    
       return res.status(200).json({ status: 200,point:point,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}


exports.get_users = async function (req, res) {

  try {
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var Roles=await Model.getList({table:"role"})
      
      // var url=await Model.getList({table:"url"})
      var users=await Model.getListOrdered({table:"utilisateur",order:{COLUMN:"NOM",TYPE:"ASC"},culomn:{"ID_RAISON":user1[0].ID_RAISON}})
// 
  
      return res.status(200).json({ status: 200,role:Roles,users:users,response:"ok" });
  
  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.get_points = async function (req, res) {

  try {
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      // var users=await Model.getListOrdered({table:"utilisateur",order:{COLUMN:"NOM",TYPE:"ASC"},culomn:{"ID_RAISON":user1[0].ID_RAISON}})
      var query={query:"SELECT* FROM points_de_vente p left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE p.ID_RAISON="+user1[0].ID_RAISON+" order by APPELLATION_POINT,PROVINCE_NAME,COMMUNE_NAME,ZONE_NAME"}
      var result = await Model.getRequest(query)
  return res.status(200).json({ status: 200,points:result,response:"ok" });
  
  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.get_users_points = async function (req, res) {

  try {

// console.log(req.params.id)
      var condition={ID_POINT:req.params.id}
      var roles=await Model.getList({table:"utilisateur",culomn:condition})
      // console.log(roles)
      var r=[]
            roles.forEach(val => {
                r.push(val['ID'])
            });
    
       return res.status(200).json({ status: 200,users_id:r,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.saves_affectation = async function (req, res) {

  try {  
      // console.log(req.body.users)
      let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var id_point=req.body.id_point
      const obj = JSON.parse(req.body.users)
      var condition={ID_RAISON:user1[0].ID_RAISON}
      await Model.update({table:"utilisateur",culomn:{"ID_POINT":0},conditions:condition})
  // console.log(val.completed)
      obj.forEach(async val => {
        // console.log(val.completed)
          if(val.completed==true){
          var infos={"ID_POINT":id_point}

            var condition={ID:val.ID}
            await Model.update({table:"utilisateur",culomn:infos,conditions:condition})
            await Model.insert({table:"points_de_vente_users_historique",culomn:{"ID_USER":val.ID,"ID_POINT":id_point}})

          }

      })

      return res.status(200).json({ status: 200,response:"ok" ,message:"" });
  
  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}


exports.getOne_point = async function (req, res) {

  try {
    id=req.params.id

      // var users=await Model.getListOrdered({table:"utilisateur",order:{COLUMN:"NOM",TYPE:"ASC"},culomn:{"ID_RAISON":user1[0].ID_RAISON}})
      var query={query:"SELECT* FROM points_de_vente p left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE p.ID_POINT="+id+" order by APPELLATION_POINT,PROVINCE_NAME,COMMUNE_NAME,ZONE_NAME"}
      var result = await Model.getRequest(query)
  return res.status(200).json({ status: 200,point:result,response:"ok" });
  
  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.list_users_point = async function (req, res) {

  console.log(req)
  try {
    id=req.params.id
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    if(id>0){
      var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE u.ID_POINT="+id}
    }else
    var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID where u.  ID_RAISON="+user1[0].ID_RAISON}
    var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {
                    

                      r.data.push({NOM_PRENOM:val['NOM']+" "+val['PRENOM'],TEL:val['TELEPHONE'],APPELATION:val['APPELLATION_POINT'],LOCALITE:val['LOCALITE'],ZONE:val['ZONE_NAME'],COMMUNE:val['COMMUNE_NAME'],PROVINCE:val['PROVINCE_NAME']})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.list_itineraire = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    
if(user1[0].ID_RAISON>0){

  var query={query:"SELECT* FROM itineraires WHERE ID_RAISON="+user1[0].ID_RAISON+" "}

}else
var query={query:"SELECT* FROM itineraires"}
var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

  //   console.log(result)
    await Promise.all(result.map(async val => {

        if (val['TYPE_ITINERAIRE']==1) {
          var prov_origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['ORIGINE']}})
          var prov_destination=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['DESTINATION']}})
          var origine=prov_origine[0].PROVINCE_NAME
          var DESTINATION=prov_destination[0].PROVINCE_NAME
          var type="Provincial"
        } else if (val['TYPE_ITINERAIRE']==2) {
          var prov_origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['ORIGINE']}})
          var prov_destination=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['DESTINATION']}})
          var origine=prov_origine[0].COMMUNE_NAME
          var DESTINATION=prov_destination[0].COMMUNE_NAME
          var type="Communal"
        }else if (val['TYPE_ITINERAIRE']==3) {
          var prov_origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['ORIGINE']}})
          var prov_destination=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['DESTINATION']}})
          var origine=prov_origine[0].ZONE_NAME
          var DESTINATION=prov_destination[0].ZONE_NAME
          var type="zonal"
        }else {
          var prov_origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['ORIGINE']}})
          var prov_destination=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['DESTINATION']}})
          var origine=prov_origine[0].LOCALITE+"("+prov_origine[0].APPELLATION_POINT+")"
          var DESTINATION=prov_destination[0].LOCALITE+"("+prov_destination[0].APPELLATION_POINT+")"
          var type="Inter Point focal"
        }
                    
        var raison=await Model.getOne({table:"raisons_sociales",culomn:{"ID_RAISON":val['ID_RAISON']}})
        var createur=await Model.getOne({table:"utilisateur",culomn:{"ID":val['USER_ID']}})
                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                      var action='<button id="mod-'+val['ID_POINT']+'" class="btn btn-success getItineraire" style="margin-right:10px">Modifier</buton>'
                      // var action1='<button id="supp-'+val['ID_VEHICULE']+'" class="btn btn-danger getDetailsvehicule" >Bloquer</buton>'
                      var action1=''
                     
                      r.data.push({RAISON:raison['RAISON_SOCIAL'],TYPE:type,ORIGINE:origine,DESTINATION:DESTINATION,CREATEUR:createur[0].NOM+" "+createur[0].PRENOM+"("+createur[0].TELEPHONE+")",ACTION:action+" "+action1})
                      
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getInfo_Itineraire_par_type = async function (req, res) {

  // console.log(req)
  try {
    id=req.params.id
    id1=req.params.id1
    
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    var r={"data":[]}
    switch (id) {
      case "1": 
      // console.log(id)
      // province= await  Model.getListOrdered({table:"provinces",order:{COLUMN:"PROVINCE_NAME",TYPE:"ASC"}})
        var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID join communes c on z.COMMUNE_ID=c.COMMUNE_ID join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID where ID_RAISON="+user1[0].ID_RAISON+" GROUP BY PROVINCE_NAME ORDER BY PROVINCE_NAME"}
        var province = await Model.getRequest(query)

      await Promise.all(province.map(async val => {
                        
                        r.data.push({ID:val['PROVINCE_ID'],DESCRIPTION:val['PROVINCE_NAME']})
                        
                    }));
        
        break;

        case "2": 
      // commune= await  Model.getListOrdered({table:"communes",order:{COLUMN:"COMMUNE_NAME",TYPE:"ASC"}})  
      var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID join communes c on z.COMMUNE_ID=c.COMMUNE_ID where ID_RAISON="+user1[0].ID_RAISON+" AND PROVINCE_ID="+id1+" GROUP BY COMMUNE_NAME ORDER BY COMMUNE_NAME"}
        var commune = await Model.getRequest(query)  

      await Promise.all(commune.map(async val => {
                        
                        r.data.push({ID:val['COMMUNE_ID'],DESCRIPTION:val['COMMUNE_NAME']})
                        
                    }));
        
        break;

        case "3": 
      // zone= await  Model.getListOrdered({table:"zones",order:{COLUMN:"ZONE_NAME",TYPE:"ASC"}}) 
      var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID  where ID_RAISON="+user1[0].ID_RAISON+" AND COMMUNE_ID="+id1+" GROUP BY ZONE_NAME ORDER BY ZONE_NAME"}
        var zone = await Model.getRequest(query)     

      await Promise.all(zone.map(async val => {
                        
                        r.data.push({ID:val['ZONE_ID'],DESCRIPTION:val['ZONE_NAME']})
                        
                    }));
        
        break;

        case "4": 
        // ID_RAISON="+user1[0].ID_RAISON"
        // points_de_vente= await  Model.getListOrdered({table:"points_de_vente",culomn:{"ID_RAISON":user1[0].ID_RAISON},order:{COLUMN:"APPELLATION_POINT",TYPE:"ASC"}})    
        var query={query:"SELECT* FROM points_de_vente p  where ID_RAISON="+user1[0].ID_RAISON+" AND ZONE_ID="+id1+" GROUP BY APPELLATION_POINT ORDER BY APPELLATION_POINT"}
        var points_de_vente = await Model.getRequest(query)
        await Promise.all(points_de_vente.map(async val => {
                          
                          r.data.push({ID:val['ID_POINT'],DESCRIPTION:val['APPELLATION_POINT']+"("+val['LOCALITE']+")"})
                          
                      }));
          
          break;
    
      default:
        break;
    }
    // if(id>0){
    //   var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE u.ID_POINT="+id}
    // }else
    // var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID where u.  ID_RAISON="+user1[0].ID_RAISON}
    // var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})

                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getCommune_Itineraire = async function (req, res) {

  // console.log(req)
  try {
    id=req.params.id
    
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    var r={"data":[]}

    var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID join communes c on z.COMMUNE_ID=c.COMMUNE_ID where ID_RAISON="+user1[0].ID_RAISON+" AND PROVINCE_ID="+id+" GROUP BY COMMUNE_NAME ORDER BY COMMUNE_NAME"}
    var commune = await Model.getRequest(query)  

  await Promise.all(commune.map(async val => {
                    
                    r.data.push({ID:val['COMMUNE_ID'],DESCRIPTION:val['COMMUNE_NAME']})
                    
                }));

          
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getZone_Itineraire = async function (req, res) {

  // console.log(req)
  try {
    id=req.params.id
    
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    var r={"data":[]}

    var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID  where ID_RAISON="+user1[0].ID_RAISON+" AND COMMUNE_ID="+id+" GROUP BY ZONE_NAME ORDER BY ZONE_NAME"}
    var commune = await Model.getRequest(query)  

  await Promise.all(commune.map(async val => {
                    
                    r.data.push({ID:val['ZONE_ID'],DESCRIPTION:val['ZONE_NAME']})
                    
                }));

          
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getInfo_Itineraire_withoutOrigine = async function (req, res) {

  // console.log(req)
  try {
    var province_id=req.body.province_id
    var commune_id=req.body.commune_id
    var zone_id=req.body.zone_id
    var type=req.body.type
    var origine=req.body.origine
    
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    var r={"data":[]}
    switch (type) {
      case "1": 
      // console.log(id)
      // province= await  Model.getListOrdered({table:"provinces",order:{COLUMN:"PROVINCE_NAME",TYPE:"ASC"}})
        var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID join communes c on z.COMMUNE_ID=c.COMMUNE_ID join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID where ID_RAISON="+user1[0].ID_RAISON+" AND pr.PROVINCE_ID<>"+origine+" GROUP BY PROVINCE_NAME ORDER BY PROVINCE_NAME"}
        var province = await Model.getRequest(query)

      await Promise.all(province.map(async val => {
                        
                        r.data.push({ID:val['PROVINCE_ID'],DESCRIPTION:val['PROVINCE_NAME']})
                        
                    }));
        
        break;

        case "2": 
      // commune= await  Model.getListOrdered({table:"communes",order:{COLUMN:"COMMUNE_NAME",TYPE:"ASC"}})  
      var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID join communes c on z.COMMUNE_ID=c.COMMUNE_ID where ID_RAISON="+user1[0].ID_RAISON+" AND PROVINCE_ID="+province_id+" AND c.COMMUNE_ID<>"+origine+" GROUP BY COMMUNE_NAME ORDER BY COMMUNE_NAME"}
        var commune = await Model.getRequest(query)  

      await Promise.all(commune.map(async val => {
                        
                        r.data.push({ID:val['COMMUNE_ID'],DESCRIPTION:val['COMMUNE_NAME']})
                        
                    }));
        
        break;

        case "3": 
      // zone= await  Model.getListOrdered({table:"zones",order:{COLUMN:"ZONE_NAME",TYPE:"ASC"}}) 
      var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID  join communes c on z.COMMUNE_ID=c.COMMUNE_ID where ID_RAISON="+user1[0].ID_RAISON+" AND PROVINCE_ID="+province_id+" AND z.ZONE_ID<>"+origine+" GROUP BY ZONE_NAME ORDER BY ZONE_NAME"}
        var zone = await Model.getRequest(query)     

      await Promise.all(zone.map(async val => {
                        
                        r.data.push({ID:val['ZONE_ID'],DESCRIPTION:val['ZONE_NAME']})
                        
                    }));
        
        break;

        case "4": 
        // ID_RAISON="+user1[0].ID_RAISON"
        // points_de_vente= await  Model.getListOrdered({table:"points_de_vente",culomn:{"ID_RAISON":user1[0].ID_RAISON},order:{COLUMN:"APPELLATION_POINT",TYPE:"ASC"}})    
        var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID join communes c on z.COMMUNE_ID=c.COMMUNE_ID where ID_RAISON="+user1[0].ID_RAISON+" AND PROVINCE_ID="+province_id+" AND p.ID_POINT<>"+origine+" GROUP BY APPELLATION_POINT ORDER BY APPELLATION_POINT"}
        var points_de_vente = await Model.getRequest(query)
        await Promise.all(points_de_vente.map(async val => {
                          
                          r.data.push({ID:val['ID_POINT'],DESCRIPTION:val['APPELLATION_POINT']+"("+val['LOCALITE']+")"})
                          
                      }));
          
          break;
    
      default:
        break;
    }
    // if(id>0){
    //   var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE u.ID_POINT="+id}
    // }else
    // var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID where u.  ID_RAISON="+user1[0].ID_RAISON}
    // var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})

                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.addItineraire = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var user_id=req.body.user_id
      var type=req.body.type
      var prix=req.body.prix
      var destination=req.body.destination
      var origine=req.body.origine

          var infos={
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "PRIX":prix,
            "ID_RAISON":user1[0].ID_RAISON,
            "USER_ID":user_id
          }
          var infos_check={
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "ID_RAISON":user1[0].ID_RAISON
          }



      var check=await Model.getOne({table:"itineraires",culomn:infos_check})
              var n= Object.keys(check).length
          
          if(n>0){
              return res.status(200).json({ status: 200, response:"non",message:"exist" });
          }else{

          var id=await Model.insert({table:"itineraires",culomn:infos})
          
          return res.status(200).json({ status: 200, response:"ok" });
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.getInfo_Itineraire_withoutOrigine2 = async function (req, res) {

  // console.log(req)
  try {
    var province_id=req.body.province_id
    var commune_id=req.body.commune_id
    var zone_id=req.body.zone_id
    var type=req.body.type
    var origine=req.body.origine
    
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    var r={"data":[]}
    switch (type) {
      case "1": 
      // console.log(id)
      // province= await  Model.getListOrdered({table:"provinces",order:{COLUMN:"PROVINCE_NAME",TYPE:"ASC"}})
        var query={query:"SELECT* FROM provinces  where PROVINCE_ID<>"+origine+" ORDER BY PROVINCE_NAME"}
        var province = await Model.getRequest(query)

      await Promise.all(province.map(async val => {
                        
                        r.data.push({ID:val['PROVINCE_ID'],DESCRIPTION:val['PROVINCE_NAME']})
                        
                    }));
        
        break;

        case "2": 
      // commune= await  Model.getListOrdered({table:"communes",order:{COLUMN:"COMMUNE_NAME",TYPE:"ASC"}})  
      var query={query:"SELECT* FROM  communes c  where  PROVINCE_ID="+province_id+" AND c.COMMUNE_ID<>"+origine+" ORDER BY COMMUNE_NAME"}
        var commune = await Model.getRequest(query)  

      await Promise.all(commune.map(async val => {
                        
                        r.data.push({ID:val['COMMUNE_ID'],DESCRIPTION:val['COMMUNE_NAME']})
                        
                    }));
        
        break;

        case "3": 
      // zone= await  Model.getListOrdered({table:"zones",order:{COLUMN:"ZONE_NAME",TYPE:"ASC"}}) 
      var query={query:"SELECT* FROM zones left join communes c on z.COMMUNE_ID=c.COMMUNE_ID where PROVINCE_ID="+province_id+" AND z.ZONE_ID<>"+origine+" ORDER BY ZONE_NAME"}
        var zone = await Model.getRequest(query)     

      await Promise.all(zone.map(async val => {
                        
                        r.data.push({ID:val['ZONE_ID'],DESCRIPTION:val['ZONE_NAME']})
                        
                    }));
        
        break;

        case "4": 
        // ID_RAISON="+user1[0].ID_RAISON"
        // points_de_vente= await  Model.getListOrdered({table:"points_de_vente",culomn:{"ID_RAISON":user1[0].ID_RAISON},order:{COLUMN:"APPELLATION_POINT",TYPE:"ASC"}})    
        var query={query:"SELECT* FROM points_de_vente p join zones z on p.ZONE_ID=z.ZONE_ID join communes c on z.COMMUNE_ID=c.COMMUNE_ID  where ID_RAISON="+user1[0].ID_RAISON+" AND  PROVINCE_ID="+province_id+" AND p.ID_POINT<>"+origine+" ORDER BY APPELLATION_POINT"}
        var points_de_vente = await Model.getRequest(query)
        await Promise.all(points_de_vente.map(async val => {
                          
                          r.data.push({ID:val['ID_POINT'],DESCRIPTION:val['APPELLATION_POINT']+"("+val['LOCALITE']+")"})
                          
                      }));
          
          break;
    
      default:
        break;
    }
    // if(id>0){
    //   var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID WHERE u.ID_POINT="+id}
    // }else
    // var query={query:"SELECT* FROM utilisateur u left join points_de_vente p on u.ID_POINT=p.ID_POINT left join zones z on p.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces pr on c.PROVINCE_ID=pr.PROVINCE_ID where u.  ID_RAISON="+user1[0].ID_RAISON}
    // var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})

                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getItineraire = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    const query={query:"SELECT* from itineraires where ID_RAISON="+user1[0].ID_RAISON+" ORDER BY ID_ITINERAIRE"}
    var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    // var r={"data":[]}
    var r=[]

  //   console.log(result)
  i=1
    await Promise.all(result.map(async val => {

      // console.log(val['TYPE_ITINERAIRE'])

                switch (val['TYPE_ITINERAIRE']) {
                  case 1:var type="PROVINCIALE"   
                  var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['DESTINATION']}}) 
                  var itineraire= origine[0].PROVINCE_NAME+"-"+  destination[0].PROVINCE_NAME  
                  break;

                  case 2:var type="COMMUNALE"
                  var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['DESTINATION']}}) 
                  var itineraire= origine[0].COMMUNE_NAME+"-"+  destination[0].COMMUNE_NAME          
                  break;

                  case 3:var type="ZONALE"
                  var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['DESTINATION']}}) 
                  var itineraire= origine[0].ZONE_NAME+"-"+  destination[0].ZONE_NAME          
                  break;

                  case 4:var type="INTER POINT FOCAL"
                  // console.log(val['DESTINATION'])
                  var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['DESTINATION']}}) 
                  var itineraire= origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")-" +destination[0].APPELLATION_POINT+"("+destination[0].LOCALITE+")"        
                  break;
                
                  default:var type="UNDEFINED"
                    break;
                }
                
          r.push({ID_IT:val['ID_ITINERAIRE'],NUMERO:i,TYPE_ITINERAIRE:type,ITINERAIRE:itineraire,PRIX:val['PRIX'],"isExpanded": false,subjects: []})
          var r1=r
        // console.log(r1)
        
                
                        
        
         i++ 
                  
                  
        }));
                  
    // return  res.status(200).json(r);

    // r.asyncForEach(async val => {
      await Promise.all(r.map(async val => {
      // console.log(val)
      var query1={query:"SELECT* from itineraires_intermediaire where ID_ITINERAIRE="+val.ID_IT}
      var result1 = await Model.getRequest(query1)

      await Promise.all(result1.map(async val1 => {
        
        switch (val1['TYPE_ITINERAIRE']) {
          case 1:   
          var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val1['ORIGINE']}})      
          var destination=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val1['DESTINATION']}}) 
          var itineraire= origine[0].PROVINCE_NAME+"-"+  destination[0].PROVINCE_NAME  
          break;

          case 2:
          var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val1['ORIGINE']}})      
          var destination=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val1['DESTINATION']}}) 
          var itineraire= origine[0].COMMUNE_NAME+"-"+  destination[0].COMMUNE_NAME          
          break;

          case 3:
          var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val1['ORIGINE']}})      
          var destination=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val1['DESTINATION']}}) 
          var itineraire= origine[0].ZONE_NAME+"-"+  destination[0].ZONE_NAME          
          break;

          case 4:
          var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val1['ORIGINE']}})      
          var destination=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val1['DESTINATION']}}) 
          var itineraire= origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")-" +destination[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")"        
          break;
        
          default:var type="UNDEFINED"
            break;
        }
        
        objIndex = r.findIndex((obj => obj.ID_IT == val.ID_IT));
        r[objIndex].subjects.push({ID_ITINERAIRE_INT:val1['ID_ITINERAIRE_INT'],ITINERAIRE:itineraire,PRIX:val1['PRIX']})
        // console.log(r[objIndex])
        
      }))
     
  }))
 
    return res.status(200).json({ status: 200,infos_itineraire:r,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
}
}


exports.getOneItineraire = async function (req, res) {

  try {
    // var users = await Model.getOne(table)

    id=req.params.id
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
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

 
    return res.status(200).json({ status: 200,iti:iti,lieu:lieu,lieu1:lieu1,itineraire:itineraire,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
}
}

exports.getOneItineraire1 = async function (req, res) {

  try {
    // var users = await Model.getOne(table)

    id=req.params.id
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    var itineraire=await Model.getOne({table:"itineraires",culomn:{"ID_ITINERAIRE":id}})
    
    switch (itineraire[0].TYPE_ITINERAIRE) {
      case 1:
        var lieu={prov:'',com:'',zone:'',point:''}
        var lieu1={prov1:[],com1:[],zone1:[],point1:[]}
        var origine=await Model.getListOrdered({table:"provinces",order:{COLUMN:"PROVINCE_NAME",TYPE:"ASC"}}) 
        
        var arr=[]

        

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['PROVINCE_ID'],DESCRIPTION:val['PROVINCE_NAME']})
                          
                      }));
        var iti={orig:arr,dest:[]}
      break;

      case 2:
        var com=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].ORIGINE}})
        var PRO=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":com[0].PROVINCE_ID}})
        var lieu={prov:com[0].PROVINCE_ID,com:'',zone:'',point:''}
        var lieu1={prov1:[{ID:com[0].PROVINCE_ID,DESCRIPTION:PRO[0].PROVINCE_NAME}],com1:[],zone1:[],point1:[]}

        var origine=await Model.getListOrdered({table:"communes",culomn:{"PROVINCE_ID":com[0].PROVINCE_ID},order:{COLUMN:"COMMUNE_NAME",TYPE:"ASC"}})
        var arr=[]

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['COMMUNE_ID'],DESCRIPTION:val['COMMUNE_NAME']})
                          
                      }));
        var iti={orig:arr,dest:[]}
     
        // console.log(com)
      break;

      case 3:
        var query={query:"SELECT* from zones z left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE ZONE_ID="+itineraire[0].ORIGINE+" ORDER BY ZONE_NAME"}
        var result = await Model.getRequest(query)
       
        var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:'',point:''}
        var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[],point1:[]}
        // var origine=await Model.getOne({table:"zones"})
        var origine=await Model.getListOrdered({table:"zones",culomn:{"COMMUNE_ID":result[0].COMMUNE_ID},order:{COLUMN:"ZONE_NAME",TYPE:"ASC"}})
        var arr=[]

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['ZONE_ID'],DESCRIPTION:val['ZONE_NAME']})
                          
                      }));
        var iti={orig:arr,dest:[]}
        break;

      case 4:
        var query={query:"SELECT* from points_de_vente po left join zones z on po.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE  ID_POINT="+itineraire[0].ORIGINE+" ORDER BY ZONE_NAME"}
        var result = await Model.getRequest(query)
        
        var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:result[0].ZONE_ID,point:''}
        var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[{ID:result[0].ZONE_ID,DESCRIPTION:result[0].ZONE_NAME}],point1:[]}
        // var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":itineraire[0].ORIGINE}})
        var origine=await Model.getListOrdered({table:"points_de_vente",culomn:{"ZONE_ID":result[0].ZONE_ID},order:{COLUMN:"APPELLATION_POINT",TYPE:"ASC"}})
        var arr=[]

        // console.log(result[0].ZONE_ID)
        // var iti={orig:[{ID:origine[0].ID_POINT,DESCRIPTION:origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")"}],dest:[{ID:dest[0].ID_POINT,DESCRIPTION:dest[0].APPELLATION_POINT+"("+dest[0].LOCALITE+")"}]}

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['ID_POINT'],DESCRIPTION:val['APPELLATION_POINT']+"("+val['LOCALITE']+")"})
                          
                      }));
        var iti={orig:arr,dest:[]}
      break;
    
      default:
        var lieu={prov:'',com:'',zone:'',point:''}
        break;
    }
  
    var r=[]

 
    return res.status(200).json({ status: 200,iti:iti,lieu:lieu,lieu1:lieu1,itineraire:itineraire,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
}
}

exports.getOneItineraire_intermediaire = async function (req, res) {

  try {
    // var users = await Model.getOne(table)

    id=req.params.id
    id_interm=req.params.id_interm
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    var itineraire=await Model.getOne({table:"itineraires",culomn:{"ID_ITINERAIRE":id}})
    var itineraires_intermediaire=await Model.getOne({table:"itineraires_intermediaire",culomn:{"ID_ITINERAIRE_INT":id_interm}})
    
    switch (itineraire[0].TYPE_ITINERAIRE) {
      case 1:
        var lieu={prov:'',com:'',zone:'',point:''}
        var lieu1={prov1:[],com1:[],zone1:[],point1:[]}
        var origine=await Model.getListOrdered({table:"provinces",order:{COLUMN:"PROVINCE_NAME",TYPE:"ASC"}}) 
        
        var arr=[]

        

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['PROVINCE_ID'],DESCRIPTION:val['PROVINCE_NAME']})
                          
                      }));
        var iti={orig:arr,dest:[]}
      break;

      case 2:
        var com=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":itineraire[0].ORIGINE}})
        var PRO=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":com[0].PROVINCE_ID}})
        var lieu={prov:com[0].PROVINCE_ID,com:'',zone:'',point:''}
        var lieu1={prov1:[{ID:com[0].PROVINCE_ID,DESCRIPTION:PRO[0].PROVINCE_NAME}],com1:[],zone1:[],point1:[]}

        var origine=await Model.getListOrdered({table:"communes",culomn:{"PROVINCE_ID":com[0].PROVINCE_ID},order:{COLUMN:"COMMUNE_NAME",TYPE:"ASC"}})
        var arr=[]

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['COMMUNE_ID'],DESCRIPTION:val['COMMUNE_NAME']})
                          
                      }));
        var iti={orig:arr,dest:[]}
     
        // console.log(com)
      break;

      case 3:
        var query={query:"SELECT* from zones z left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE ZONE_ID="+itineraire[0].ORIGINE+" ORDER BY ZONE_NAME"}
        var result = await Model.getRequest(query)
       
        var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:'',point:''}
        var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[],point1:[]}
        // var origine=await Model.getOne({table:"zones"})
        var origine=await Model.getListOrdered({table:"zones",culomn:{"COMMUNE_ID":result[0].COMMUNE_ID},order:{COLUMN:"ZONE_NAME",TYPE:"ASC"}})
        var arr=[]

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['ZONE_ID'],DESCRIPTION:val['ZONE_NAME']})
                          
                      }));
        var iti={orig:arr,dest:[]}
        break;

      case 4:
        var query={query:"SELECT* from points_de_vente po left join zones z on po.ZONE_ID=z.ZONE_ID left join communes c on z.COMMUNE_ID=c.COMMUNE_ID left join provinces p on c.PROVINCE_ID=p.PROVINCE_ID WHERE  ID_POINT="+itineraire[0].ORIGINE+" ORDER BY ZONE_NAME"}
        var result = await Model.getRequest(query)
        
        var lieu={prov:result[0].PROVINCE_ID,com:result[0].COMMUNE_ID,zone:result[0].ZONE_ID,point:''}
        var lieu1={prov1:[{ID:result[0].PROVINCE_ID,DESCRIPTION:result[0].PROVINCE_NAME}],com1:[{ID:result[0].COMMUNE_ID,DESCRIPTION:result[0].COMMUNE_NAME}],zone1:[{ID:result[0].ZONE_ID,DESCRIPTION:result[0].ZONE_NAME}],point1:[]}
        // var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":itineraire[0].ORIGINE}})
        var origine=await Model.getListOrdered({table:"points_de_vente",culomn:{"ZONE_ID":result[0].ZONE_ID},order:{COLUMN:"APPELLATION_POINT",TYPE:"ASC"}})
        var arr=[]

        // console.log(result[0].ZONE_ID)
        // var iti={orig:[{ID:origine[0].ID_POINT,DESCRIPTION:origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")"}],dest:[{ID:dest[0].ID_POINT,DESCRIPTION:dest[0].APPELLATION_POINT+"("+dest[0].LOCALITE+")"}]}

        await Promise.all(origine.map(async val => {
                          
                        arr.push({ID:val['ID_POINT'],DESCRIPTION:val['APPELLATION_POINT']+"("+val['LOCALITE']+")"})
                          
                      }));
        var iti={orig:arr,dest:[]}
      break;
    
      default:
        var lieu={prov:'',com:'',zone:'',point:''}
        break;
    }
  
    var r=[]

 
    return res.status(200).json({ status: 200,iti:iti,lieu:lieu,lieu1:lieu1,itineraires_intermediaire:itineraires_intermediaire,itineraire:itineraire,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
}
}


exports.updateItineraire = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var id=req.body.id
      origine_old=req.body.origine_old
      destination_old=req.body.destination_old
      type_old=req.body.type_old
      var user_id=req.body.user_id
      var type=req.body.type
      var prix=req.body.prix
      var destination=req.body.destination
      var origine=req.body.origine

          var infos={
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "PRIX":prix,
            "ID_RAISON":user1[0].ID_RAISON,
            "USER_ID":user_id
          }
          var infos_check={
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "ID_RAISON":user1[0].ID_RAISON
          }



      var check=await Model.getOne({table:"itineraires",culomn:infos_check})
              var n= Object.keys(check).length
          
          if(n==0||(origine_old==origine&&destination_old==destination&&type_old==type)){
              
          // var id=await Model.insert({table:"itineraires",culomn:infos})
          var condition={ID_ITINERAIRE:id}
          await Model.update({table:"itineraires",culomn:infos,conditions:condition})
          
          return res.status(200).json({ status: 200, response:"ok" });

          }else{

          return res.status(200).json({ status: 200, response:"non",message:"exist" });
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.addItineraire_intermediaire = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var user_id=req.body.user_id
      var id_itiner=req.body.id_itiner
      var type=req.body.type
      var prix=req.body.prix
      var destination=req.body.destination
      var origine=req.body.origine

          var infos={
            "ID_ITINERAIRE":id_itiner,
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "PRIX":prix,
            "ID_RAISON":user1[0].ID_RAISON,
            "USER_ID":user_id
          }
          var infos_check={
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "ID_RAISON":user1[0].ID_RAISON
          }



      var check=await Model.getOne({table:"itineraires",culomn:infos_check})
              var n= Object.keys(check).length
      var check1=await Model.getOne({table:"itineraires_intermediaire",culomn:infos_check})
              var n1= Object.keys(check1).length
          
          if(n>0||n1>0){
              return res.status(200).json({ status: 200, response:"non",message:"exist" });
          }else{

          var id=await Model.insert({table:"itineraires_intermediaire",culomn:infos})
          
          return res.status(200).json({ status: 200, response:"ok" });
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.updateItineraire_intermediaire = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

      var user_id=req.body.user_id
      var id_interm=req.body.id_interm
      var id_itiner=req.body.id_itiner
      var type=req.body.type
      var prix=req.body.prix
      var destination=req.body.destination
      var origine=req.body.origine
      origine_old=req.body.origine_old
      destination_old=req.body.destination_old
      type_old=req.body.type_old

          var infos={
            "ID_ITINERAIRE":id_itiner,
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "PRIX":prix,
            "ID_RAISON":user1[0].ID_RAISON,
            "USER_ID":user_id
          }
          var infos_check={
            "TYPE_ITINERAIRE":type,
            "ORIGINE":origine,
            "DESTINATION":destination,
            "ID_RAISON":user1[0].ID_RAISON
          }



      var check=await Model.getOne({table:"itineraires",culomn:infos_check})
              var n= Object.keys(check).length
      var check1=await Model.getOne({table:"itineraires_intermediaire",culomn:infos_check})
              var n1= Object.keys(check1).length
          
          if((n==0||n1==0)||(origine_old==origine&&destination_old==destination&&type_old==type)){
            // var id=await Model.insert({table:"itineraires_intermediaire",culomn:infos})
            var condition={ID_ITINERAIRE_INT:id_interm}
            await Model.update({table:"itineraires_intermediaire",culomn:infos,conditions:condition})
            return res.status(200).json({ status: 200, response:"ok" });
             
          }else{
            return res.status(200).json({ status: 200, response:"non",message:"exist" });
         
      }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.delete_itineraire = async function (req, res) {

  try {

    var check=await Model.getOne({table:"trajet_transport",culomn:{"ID_ITINERAIRE":req.params.id}})
    var n= Object.keys(check).length

    if (n==0) {
      var condition={ID_ITINERAIRE:req.params.id}
      await Model.delete({table:"itineraires",conditions:condition})
      await Model.delete({table:"itineraires_intermediaire",conditions:condition})
    
       return res.status(200).json({ status: 200,response:"ok" , message: "yes" });
    }else{

      return res.status(200).json({ status: 200,response:"ok" , message: "non" });
    }

      


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.delete_itineraire_intermediaire = async function (req, res) {

  try {

    var check=await Model.getOne({table:"trajet_transport",culomn:{"ID_ITINERAIRE":req.params.id}})
    var n= Object.keys(check).length

    if (n==0) {
      var condition={ID_ITINERAIRE_INT:req.params.id1}

      await Model.delete({table:"itineraires_intermediaire",conditions:condition})
    
       return res.status(200).json({ status: 200,response:"ok" , message: "yes" });
    }else{

      return res.status(200).json({ status: 200,response:"ok" , message: "non" });
    }

      


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.getvehicules = async function (req, res) {

  try {
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    const query={query:"SELECT* from vehicules where ID_RAISON="+user1[0].ID_RAISON+" order by PLAQUE"}
    var result = await Model.getRequest(query)

    return res.status(200).json({ status: 200, vehicule: result,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getUser_raison = async function (req, res) {

  try {
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    const query={query:"SELECT* from utilisateur where ID_RAISON="+user1[0].ID_RAISON+" AND STATUT=1 order by NOM"}
    var result = await Model.getRequest(query)

    return res.status(200).json({ status: 200, chauff: result,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.addtrajet = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})


      date=req.body.date
      vehicule=req.body.vehicule
      chauffeur=req.body.chauffeur
      itineraire=req.body.itineraire
      type_trajet=req.body.type_trajet
      

      
          var infos={
            "DATE_HEURE_DEPART":date,
            "ID_VEHICULE":vehicule,
            "CHAUFFEUR":chauffeur,
            "ID_RAISON":user1[0].ID_RAISON,
            "ID_ITINERAIRE":itineraire,
            "USER_ID":user1[0].ID,
            "TYPE_TRAJET":type_trajet
          }
          var infos_check_v={
            "ID_VEHICULE":vehicule,
            "STATUT":0
          }
          var infos_check_c={
            "CHAUFFEUR":chauffeur,
            "STATUT":0
          }


      var check_v=await Model.getOne({table:"trajet_transport",culomn:infos_check_v})
          var nv= Object.keys(check_v).length
      var check_c=await Model.getOne({table:"trajet_transport",culomn:infos_check_c})
              var nc= Object.keys(check_c).length
          
        //   if(nv>0){
        //       return res.status(200).json({ status: 200, response:"non",message:"vehicule_encour" });
        //   // }else
        //   //  if(nc>0){
        //   //   return res.status(200).json({ status: 200, response:"non",message:"chauffeur_encour" });
        // }else{

            var id=await Model.insert({table:"trajet_transport",culomn:infos})
               var info_historique={
                "CHAUFFEUR":chauffeur,
                "ID_TRAJET":id,
                "STATUT_CHAUFFEUR":0,
              }
              await Model.insert({table:"historique_chauffeur_trajet",culomn:info_historique})
              var info_historique_vehicule={
                "ID_VEHICULE":vehicule,
                "ID_TRAJET":id,
                "STATUT_VEHICULE":0,
              }
              await Model.insert({table:"historique_vehicule_trajet",culomn:info_historique_vehicule})

            //   if(nc>0){
            //   var info_historique={
            //     "CHAUFFEUR":chauffeur,
            //     "ID_TRAJET":id,
            //     "STATUT_CHAUFFEUR":0,
            //   }
            //   var today=new Date()
            //   var year = today.getFullYear();
            //   var month = today.getMonth();
            //   var date = today.getDate();
            //   var hour = today.getHours();
            //   var min = today.getMinutes();
            //   var sec = today.getSeconds();
            //   var fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date ).slice(-2)+" "+("0" + hour ).slice(-2)+":"+("0" + min ).slice(-2)+":"+("0" + sec ).slice(-2)
        
            //   var id_trajet=check_c[0].ID_TRAJET
            //   var info_historique1={
            //     "CHAUFFEUR":chauffeur,
            //     "ID_TRAJET":id_trajet,
            //     "STATUT_CHAUFFEUR":1,
            //     "DATE_LIBERE_CHAUFFEUR":fullDate
            //   }
            //   await Model.insert({table:"historique_chauffeur_trajet",culomn:info_historique})
            //   // await Model.insert({table:"historique_chauffeur_trajet",culomn:info_historique1})

            // }else{
            //   var info_historique={
            //     "CHAUFFEUR":chauffeur,
            //     "ID_TRAJET":id,
            //     "STATUT_CHAUFFEUR":0,
            //   }
            //   await Model.insert({table:"historique_chauffeur_trajet",culomn:info_historique})
            // }
              
              return res.status(200).json({ status: 200, response:"ok" });
          // }

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.getItineraireFiltre = async function (req, res) {

  try {
    // var users = await Model.getOne(table)

    var id_type=req.params.id
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    const query={query:"SELECT* from itineraires where ID_RAISON="+user1[0].ID_RAISON+" AND TYPE_ITINERAIRE="+id_type+" ORDER BY ID_ITINERAIRE"}
    var result = await Model.getRequest(query)
  //   var result = await  Model.getList({table:"services_ou"})
    // var r={"data":[]}
    var r=[]

  //   console.log(result)
  i=1
    await Promise.all(result.map(async val => {

      // console.log(val['TYPE_ITINERAIRE'])

                switch (val['TYPE_ITINERAIRE']) {
                  case 1:var type="PROVINCIALE"   
                  var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['DESTINATION']}}) 
                  var itineraire= origine[0].PROVINCE_NAME+"-"+  destination[0].PROVINCE_NAME  
                  break;

                  case 2:var type="COMMUNALE"
                  var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['DESTINATION']}}) 
                  var itineraire= origine[0].COMMUNE_NAME+"-"+  destination[0].COMMUNE_NAME          
                  break;

                  case 3:var type="ZONALE"
                  var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['DESTINATION']}}) 
                  var itineraire= origine[0].ZONE_NAME+"-"+  destination[0].ZONE_NAME          
                  break;

                  case 4:var type="INTER POINT FOCAL"
                  // console.log(val['DESTINATION'])
                  var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['ORIGINE']}})      
                  var destination=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['DESTINATION']}}) 
                  var itineraire= origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")-" +destination[0].APPELLATION_POINT+"("+destination[0].LOCALITE+")"        
                  break;
                
                  default:var type="UNDEFINED"
                    break;
                }
                
          r.push({ID_IT:val['ID_ITINERAIRE'],NUMERO:i,TYPE_ITINERAIRE:type,ITINERAIRE:itineraire,PRIX:val['PRIX'],"isExpanded": false,subjects: []})
          var r1=r
        // console.log(r1)
        
                
                        
        
         i++ 
                  
                  
        }));
 
 
    return res.status(200).json({ status: 200,infos_itineraire:r,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
}
}

exports.getNumber_iti_byType = async function (req, res) {

  try {
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    // var users = await Model.getOne(table)
    var query1={query:"SELECT count(*) as n from itineraires where ID_RAISON="+user1[0].ID_RAISON+" AND TYPE_ITINERAIRE=1"}
    var result1 = await Model.getRequest(query1)
    var query2={query:"SELECT count(*) as n from itineraires where ID_RAISON="+user1[0].ID_RAISON+" AND TYPE_ITINERAIRE=2"}
    var result2 = await Model.getRequest(query2)
    const query3={query:"SELECT count(*) as n from itineraires where ID_RAISON="+user1[0].ID_RAISON+" AND TYPE_ITINERAIRE=3"}
    var result3 = await Model.getRequest(query3)
    const query4={query:"SELECT count(*) as n from itineraires where ID_RAISON="+user1[0].ID_RAISON+" AND TYPE_ITINERAIRE=4"}
    var result4 = await Model.getRequest(query4)

    var infos=[
      {id:1,value:"Provinciale("+result1[0].n+")"},
      {id:2,value:"Communale("+result2[0].n+")"},
      {id:3,value:"Zonale("+result3[0].n+")"},
      {id:4,value:"Inter point Focal("+result4[0].n+")"},
    ]

    return res.status(200).json({ status: 200, infos: infos,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.list_trajet = async function (req, res) {

  try {
    // var users = await Model.getOne(table)
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    
if(user1[0].ID_RAISON>0){
    var query={query:"SELECT ID_TRAJET,PLAQUE,RAISON_SOCIAL,ORIGINE,DESTINATION,tt.ID_RAISON,tt.STATUT,TYPE_ITINERAIRE,tt.DATE_CREATION,tt.DATE_HEURE_DEPART,tt.ID_VEHICULE,NOM,PRENOM,TELEPHONE FROM trajet_transport tt left join utilisateur ut on tt.CHAUFFEUR=ut.ID left join vehicules ve on tt.ID_VEHICULE=ve.ID_VEHICULE left join itineraires it on tt.ID_ITINERAIRE=it.ID_ITINERAIRE left join raisons_sociales r on tt.ID_RAISON=r.ID_RAISON WHERE ID_RAISON="+user1[0].ID_RAISON+" order by DATE_HEURE_DEPART DESC"}
    var result = await Model.getRequest(query)
}else{
  var query={query:"SELECT ID_TRAJET,PLAQUE,RAISON_SOCIAL,ORIGINE,DESTINATION,tt.ID_RAISON,tt.STATUT,TYPE_ITINERAIRE,tt.DATE_CREATION,tt.DATE_HEURE_DEPART,tt.ID_VEHICULE,NOM,PRENOM,TELEPHONE FROM trajet_transport tt left join utilisateur ut on tt.CHAUFFEUR=ut.ID left join vehicules ve on tt.ID_VEHICULE=ve.ID_VEHICULE left join itineraires it on tt.ID_ITINERAIRE=it.ID_ITINERAIRE left join raisons_sociales r on tt.ID_RAISON=r.ID_RAISON order by DATE_HEURE_DEPART DESC"}
    var result = await Model.getRequest(query)
}
  //   var result = await  Model.getList({table:"services_ou"})
    var r={"data":[]}

    var i=1

    // console.log(result)
    await Promise.all(result.map(async val => {

      switch (val['TYPE_ITINERAIRE']) {
        case 1:var type="PROVINCIALE"   
        var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['ORIGINE']}})      
        var destination=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":val['DESTINATION']}}) 
        var itineraire= origine[0].PROVINCE_NAME+"-"+  destination[0].PROVINCE_NAME  
        break;

        case 2:var type="COMMUNALE"
        var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['ORIGINE']}})      
        var destination=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":val['DESTINATION']}}) 
        var itineraire= origine[0].COMMUNE_NAME+"-"+  destination[0].COMMUNE_NAME          
        break;

        case 3:var type="ZONALE"
        var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['ORIGINE']}})      
        var destination=await Model.getOne({table:"zones",culomn:{"ZONE_ID":val['DESTINATION']}}) 
        var itineraire= origine[0].ZONE_NAME+"-"+  destination[0].ZONE_NAME          
        break;

        case 4:var type="INTER POINT FOCAL"
        // console.log(val['DESTINATION'])
        var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['ORIGINE']}})      
        var destination=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":val['DESTINATION']}}) 
        var itineraire= origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")-" +destination[0].APPELLATION_POINT+"("+destination[0].LOCALITE+")"        
        break;
      
        default:var type="UNDEFINED"
          break;
      }
                    
      var action=''
      if(val['STATUT']==0){

        var date="<span style='color:blue'>"+val['DATE_HEURE_DEPART']+"</span>"
        var datecr="<span style='color:blue'>"+val['DATE_CREATION']+"</span>"
        var statut="<span style='color:blue'>CREE</span>"
        var action='<button id="mod-'+val['ID_TRAJET']+'" class="btn btn-info getTrajet" style="margin-right:10px"><i class="icon-pencil" ></i></buton>'                     
        action+='<button id="susp-'+val['ID_TRAJET']+'" class="btn btn-danger getTrajet" style="margin-right:10px">X</buton>'                     
        action+='<button id="clo-'+val['ID_TRAJET']+'" class="btn btn-success getTrajet" style="margin-right:10px"><i class="fa fa-check" ></i></buton>'                     
      
        
      }else if(val['STATUT']==1){
        var datecr="<span style='color:green'>"+val['DATE_CREATION']+"</span>"
        var date="<span style='color:green'>"+val['DATE_HEURE_DEPART']+"</span>"
        var statut="<span style='color:green'>TERMINE</span>"
      }else {
        var datecr="<span style='color:red'>"+val['DATE_CREATION']+"</span>"
        var date="<span style='color:red'>"+val['DATE_HEURE_DEPART']+"</span>"
        var statut="<span style='color:red'>SUSPENDU</span>"
      }
                      // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                     
                      r.data.push({num:i,RAISON:val['RAISON_SOCIAL'],STATUT:statut,ITINERAIRE:itineraire,DATE_CR:datecr,DATE:date,VEHICULE:val['PLAQUE'],CHAUFFEUR:val['NOM']+" "+val['PRENOM']+"("+val['TELEPHONE']+")",ACTION:action})
                    i++  
                  }));
                  
    return  res.status(200).json(r);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getOneTrajet = async function (req, res) {

  try {
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    id=req.params.id
    // var users = await Model.getOne(table)
    var query=await Model.getOne({table:"trajet_transport",culomn:{"ID_TRAJET":id}})
    var iti=await Model.getOne({table:"itineraires",culomn:{"ID_ITINERAIRE":query[0].ID_ITINERAIRE}})
    // const query={query:"SELECT* from utilisateur where ID_RAISON="+user1[0].ID_RAISON+" order by NOM"}
    // var result = await Model.getRequest(query)

    return res.status(200).json({ status: 200, trajet: query,iti:iti,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.updatetrajet = async function (req, res) {

  try {         
      // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
      // console.log(req)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})


      date=req.body.date
      id=req.body.id
      old_chauffeur=req.body.old_chauffeur
      old_vehicule=req.body.old_vehicule
      vehicule=req.body.vehicule
      chauffeur=req.body.chauffeur
      itineraire=req.body.itineraire

      var today=new Date()
      var year = today.getFullYear();
      var month = today.getMonth();
      var date1 = today.getDate();
      var hour = today.getHours();
      var min = today.getMinutes();
      var sec = today.getSeconds();
      var fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date1 ).slice(-2)+" "+("0" + hour ).slice(-2)+":"+("0" + min ).slice(-2)+":"+("0" + sec ).slice(-2)
      
      

          var infos={
            "DATE_HEURE_DEPART":date,
            "ID_VEHICULE":vehicule,
            "CHAUFFEUR":chauffeur,
            "ID_RAISON":user1[0].ID_RAISON,
            "ID_ITINERAIRE":itineraire,
            "USER_ID":user1[0].ID,
          }


      if (old_chauffeur!=chauffeur) {
        var info_historique={
                    "CHAUFFEUR":chauffeur,
                    "ID_TRAJET":id,
                    "STATUT_CHAUFFEUR":0,
                  }
                  var info_historique_update={
                    "CHAUFFEUR":old_chauffeur,
                    "ID_TRAJET":id,
                    
                    "STATUT_CHAUFFEUR":0,
                  }
                  await Model.update({table:"historique_chauffeur_trajet",culomn:{STATUT_CHAUFFEUR:1,'DATE_LIBERE_CHAUFFEUR':fullDate},conditions:info_historique_update})
                 
                  await Model.insert({table:"historique_chauffeur_trajet",culomn:info_historique})
                  
      }
      if (old_vehicule!=vehicule) {
        var info_historique_vehicule={
          "ID_VEHICULE":vehicule,
          "ID_TRAJET":id,
          "STATUT_VEHICULE":0,
        }
        var info_historique_vehicule_update={
          "ID_VEHICULE":old_vehicule,
          "ID_TRAJET":id,
          
          "STATUT_VEHICULE":0,
        }
        await Model.update({table:"historique_vehicule_trajet",culomn:{STATUT_VEHICULE:1,'DATE_LIBERE_VEHICULE':fullDate},conditions:info_historique_vehicule_update})
  
        await Model.insert({table:"historique_vehicule_trajet",culomn:info_historique_vehicule})
              
      }

              // if(nv==0||old_vehicule==check_v[0].ID_VEHICULE){

              //   if(nc==0||old_chauffeur==check_c[0].CHAUFFEUR){

                   
              //   }else{
                  
              //     // return res.status(200).json({ status: 200, response:"non",message:"chauffeur_encour" });
              //   }

              // }else{
              //  // return res.status(200).json({ status: 200, response:"non",message:"vehicule_encour" });
              // }

      //         if((nv==0||old_vehicule==check_v[0].ID_VEHICULE)&&(nc==0||old_chauffeur==check_c[0].CHAUFFEUR)){
      //           // var id=await Model.insert({table:"trajet_transport",culomn:infos})
      //           var condition={ID_TRAJET:id}
      //     await Model.update({table:"trajet_transport",culomn:infos,conditions:condition})
          
      //           return res.status(200).json({ status: 200, response:"ok" });
      //         }else
          
      //     if(nv>0){
      //         return res.status(200).json({ status: 200, response:"non",message:"vehicule_encour" });
      //     }else if(nc>0){
      //       return res.status(200).json({ status: 200, response:"non",message:"chauffeur_encour" });
      //   }else{

      //     return res.status(200).json({ status: 200, message: "non reconu",response:"non" });
      // }

      var condition={ID_TRAJET:id}
                  await Model.update({table:"trajet_transport",culomn:infos,conditions:condition})
          
                return res.status(200).json({ status: 200, response:"ok" }); 

  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.getGlobalInfos = async function (req, res) {

  try {
    let token = req.headers.authorization;
    token_key=token.split(' ')
    var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
    id=req.params.id
    // var users = await Model.getOne(table)
    if(user1[0].ID_RAISON>0){
      var query_r={query:"SELECT count(*) as n from raisons_sociales "}
      var result_r = await Model.getRequest(query_r)
      var query_v={query:"SELECT count(*) as n from vehicules where ID_RAISON="+user1[0].ID_RAISON}
      var result_v = await Model.getRequest(query_v)
      var query_u={query:"SELECT count(*) as n from utilisateur where ID_RAISON="+user1[0].ID_RAISON}
      var result_u = await Model.getRequest(query_u)
      var query_it={query:"SELECT count(*) as n from itineraires where ID_RAISON="+user1[0].ID_RAISON}
      var result_it = await Model.getRequest(query_it)
    }else{
      var query_r={query:"SELECT count(*) as n from raisons_sociales"}
      var result_r = await Model.getRequest(query_r)
      var query_v={query:"SELECT count(*) as n from vehicules"}
      var result_v = await Model.getRequest(query_v)
      var query_u={query:"SELECT count(*) as n from utilisateur"}
      var result_u = await Model.getRequest(query_u)
      var query_it={query:"SELECT count(*) as n from itineraires"}
      var result_it = await Model.getRequest(query_it)
    }



    return res.status(200).json({ status: 200, infos: {raisons:result_r[0].n,employes:result_u[0].n,vehicules:result_v[0].n,itineraires:result_it[0].n},response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}


exports.cloturer_trajet = async function (req, res) {

  try {


      var condition={ID_TRAJET:req.params.id}
      var today=new Date()
      var year = today.getFullYear();
      var month = today.getMonth();
      var date = today.getDate();
      var hour = today.getHours();
      var min = today.getMinutes();
      var sec = today.getSeconds();
      var fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date ).slice(-2)+" "+("0" + hour ).slice(-2)+":"+("0" + min ).slice(-2)+":"+("0" + sec ).slice(-2)
      
  
  var get_tra=await Model.getOne({table:"trajet_transport",culomn:condition})
          
          var infos_check_c={
            "CHAUFFEUR":get_tra[0].CHAUFFEUR,
            "ID_TRAJET":get_tra[0].ID_TRAJET,
            "STATUT_CHAUFFEUR":1,
          }

          var check_c=await Model.getOne({table:"historique_chauffeur_trajet",culomn:infos_check_c})
          var nc= Object.keys(check_c).length
          if(nc==0){
            var info_historique1={
              "CHAUFFEUR":get_tra[0].CHAUFFEUR,
              "ID_TRAJET":get_tra[0].ID_TRAJET,
              "STATUT_CHAUFFEUR":1,
              "DATE_LIBERE_CHAUFFEUR":fullDate
            }          
            await Model.insert({table:"historique_chauffeur_trajet",culomn:info_historique1})
          }

          var infos_check_v={
            "ID_VEHICULE":get_tra[0].ID_VEHICULE,
            "ID_TRAJET":get_tra[0].ID_TRAJET,
            "STATUT_VEHICULE":1,
          }

          var check_c=await Model.getOne({table:"historique_vehicule_trajet",culomn:infos_check_v})
          var nc= Object.keys(check_c).length
          if(nc==0){
            var info_historiqueV={
              "ID_VEHICULE":get_tra[0].ID_VEHICULE,
              "ID_TRAJET":get_tra[0].ID_TRAJET,
              "STATUT_VEHICULE":1,
              "DATE_LIBERE_VEHICULE":fullDate
            }          
            await Model.insert({table:"historique_vehicule_trajet",culomn:info_historiqueV})
          }
          
    
          var infos={STATUT:1,DATE_CLOTURE:fullDate}
          // await Model.delete({table:"raisons_sociales",conditions:condition})
          await Model.update({table:"trajet_transport",culomn:infos,conditions:condition})
       return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}
exports.suspendre_trajet = async function (req, res) {

  try {


      var condition={ID_TRAJET:req.params.id}


      
      var condition={ID_TRAJET:req.params.id}
      var today=new Date()
      var year = today.getFullYear();
      var month = today.getMonth();
      var date = today.getDate();
      var hour = today.getHours();
      var min = today.getMinutes();
      var sec = today.getSeconds();
      var fullDate=year+"-"+("0" + (month + 1)).slice(-2)+"-"+("0" + date ).slice(-2)+" "+("0" + hour ).slice(-2)+":"+("0" + min ).slice(-2)+":"+("0" + sec ).slice(-2)
      
  
  var get_tra=await Model.getOne({table:"trajet_transport",culomn:condition})
          
          var infos_check_c={
            "CHAUFFEUR":get_tra[0].CHAUFFEUR,
            "ID_TRAJET":get_tra[0].ID_TRAJET,
            "STATUT_CHAUFFEUR":1,
          }

          var check_c=await Model.getOne({table:"historique_chauffeur_trajet",culomn:infos_check_c})
          var nc= Object.keys(check_c).length
          if(nc==0){
            var info_historique1={
              "CHAUFFEUR":get_tra[0].CHAUFFEUR,
              "ID_TRAJET":get_tra[0].ID_TRAJET,
              "STATUT_CHAUFFEUR":1,
              "DATE_LIBERE_CHAUFFEUR":fullDate
            }          
            await Model.insert({table:"historique_chauffeur_trajet",culomn:info_historique1})
          }

          var infos_check_v={
            "ID_VEHICULE":get_tra[0].ID_VEHICULE,
            "ID_TRAJET":get_tra[0].ID_TRAJET,
            "STATUT_VEHICULE":1,
          }

          var check_c=await Model.getOne({table:"historique_vehicule_trajet",culomn:infos_check_v})
          var nc= Object.keys(check_c).length
          if(nc==0){
            var info_historiqueV={
              "ID_VEHICULE":get_tra[0].ID_VEHICULE,
              "ID_TRAJET":get_tra[0].ID_TRAJET,
              "STATUT_VEHICULE":1,
              "DATE_LIBERE_VEHICULE":fullDate
            }          
            await Model.insert({table:"historique_vehicule_trajet",culomn:info_historiqueV})
          }
    

      var infos={STATUT:2}
      // await Model.delete({table:"raisons_sociales",conditions:condition})
      await Model.update({table:"trajet_transport",culomn:infos,conditions:condition})
    
       return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });


  } catch (e) {
      return res.status(200).json({ status: 200, message: e.message,response:"non" });
  }
}

exports.check_chauffeur_libre = async function (req, res) {

  try {
    id=req.params.id
   
    // var users = await Model.getOne(table)
    var check_c=await Model.getListOrdered({table:"trajet_transport",order:{COLUMN:"ID_TRAJET",TYPE:"DESC"},culomn:{"CHAUFFEUR":id,STATUT:0}})
    // var users=await Model.getListOrdered({table:"utilisateur",order:{COLUMN:"NOM",TYPE:"ASC"},culomn:{"ID_RAISON":user1[0].ID_RAISON}})
// 
  
          var nc= Object.keys(check_c).length
    
          if(nc==0){
            var result='libre'
          }else var result='occupe'
          var r={"data":[]}
          await Promise.all(check_c.map(async val => {
            var getOneIti= await Model.getOne({table:"itineraires",culomn:{"ID_ITINERAIRE":val['ID_ITINERAIRE']}}) 
            switch (getOneIti[0].TYPE_ITINERAIRE) {
              case 1:var type="PROVINCIALE"   
              var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].PROVINCE_NAME+"-"+  destination[0].PROVINCE_NAME  
              break;
          
              case 2:var type="COMMUNALE"
              var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].COMMUNE_NAME+"-"+  destination[0].COMMUNE_NAME          
              break;
          
              case 3:var type="ZONALE"
              var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"zones",culomn:{"ZONE_ID":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].ZONE_NAME+"-"+  destination[0].ZONE_NAME          
              break;
          
              case 4:var type="INTER POINT FOCAL"
              // console.log(val['DESTINATION'])
              var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")-" +destination[0].APPELLATION_POINT+"("+destination[0].LOCALITE+")"        
              break;
            
              default:var type="UNDEFINED"
                break;
            }

            if (val['TYPE_TRAJET']==0) {
              var date=val['DATE_HEURE_DEPART'].split(" ")[0]
              
              
            }else date=val['DATE_HEURE_DEPART']

               
              r.data.push({itin_infos:itineraire,DATE_CREATION:val['DATE_CREATION'],DATE_HEURE_DEPART:date})
          }))

          // console.log(r)
    return res.status(200).json({ status: 200, result_occupe: result,result_info:r,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message,response:"non"  });
  }
}

exports.check_vehicule_libre = async function (req, res) {

  try {
    id=req.params.id
   
    // var users = await Model.getOne(table)
    var check_c=await Model.getListOrdered({table:"trajet_transport",order:{COLUMN:"ID_TRAJET",TYPE:"DESC"},culomn:{"ID_VEHICULE":id,STATUT:0}})
    // var users=await Model.getListOrdered({table:"utilisateur",order:{COLUMN:"NOM",TYPE:"ASC"},culomn:{"ID_RAISON":user1[0].ID_RAISON}})
// 
  
          var nc= Object.keys(check_c).length
    
          if(nc==0){
            var result='libre'
          }else var result='occupe'
          var r={"data":[]}
          await Promise.all(check_c.map(async val => {
            var getOneIti= await Model.getOne({table:"itineraires",culomn:{"ID_ITINERAIRE":val['ID_ITINERAIRE']}}) 
            switch (getOneIti[0].TYPE_ITINERAIRE) {
              case 1:var type="PROVINCIALE"   
              var origine=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"provinces",culomn:{"PROVINCE_ID":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].PROVINCE_NAME+"-"+  destination[0].PROVINCE_NAME  
              break;
          
              case 2:var type="COMMUNALE"
              var origine=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"communes",culomn:{"COMMUNE_ID":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].COMMUNE_NAME+"-"+  destination[0].COMMUNE_NAME          
              break;
          
              case 3:var type="ZONALE"
              var origine=await Model.getOne({table:"zones",culomn:{"ZONE_ID":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"zones",culomn:{"ZONE_ID":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].ZONE_NAME+"-"+  destination[0].ZONE_NAME          
              break;
          
              case 4:var type="INTER POINT FOCAL"
              // console.log(val['DESTINATION'])
              var origine=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":getOneIti[0].ORIGINE}})      
              var destination=await Model.getOne({table:"points_de_vente",culomn:{"ID_POINT":getOneIti[0].DESTINATION}}) 
              var itineraire= origine[0].APPELLATION_POINT+"("+origine[0].LOCALITE+")-" +destination[0].APPELLATION_POINT+"("+destination[0].LOCALITE+")"        
              break;
            
              default:var type="UNDEFINED"
                break;
            }

            if (val['TYPE_TRAJET']==0) {
              var date=val['DATE_HEURE_DEPART'].split(" ")[0]
              
              
            }else date=val['DATE_HEURE_DEPART']

               
              r.data.push({itin_infos:itineraire,DATE_CREATION:val['DATE_CREATION'],DATE_HEURE_DEPART:date})
          }))

          // console.log(r)
    return res.status(200).json({ status: 200, result_occupe: result,result_info:r,response:"ok" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message,response:"non"  });
  }
}
