require('events').EventEmitter.prototype._maxListeners = 100;
const Model = require("../models/model");
const AD = require("../config/ad.config");
const e = require("express");
var user_authentificated=[]

exports.list_ou = async function (req, res) {

    try {
      // var users = await Model.getOne(table)
      let token = req.headers.authorization;
      token_key=token.split(' ')
      var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
      
  if(user1[0].ID_RAISON>0){
    var query={query:"SELECT so.ID_SERVICE,DESCRIPTION,ABREVIATION,NOM,PRENOM,TELEPHONE,RAISON_SOCIAL from services_ou so left join utilisateur u on so.ID_UT_CHEF=u.ID left join raisons_sociales rs on so.ID_RAISON=.rs.ID_RAISON WHERE so.ID_RAISON="+user1[0].ID_RAISON+" order by DESCRIPTION"}
    
  }else
      var query={query:"SELECT so.ID_SERVICE,DESCRIPTION,ABREVIATION,NOM,PRENOM,TELEPHONE,RAISON_SOCIAL from services_ou so left join utilisateur u on so.ID_UT_CHEF=u.ID left join raisons_sociales rs on so.ID_RAISON=.rs.ID_RAISON  order by DESCRIPTION"}
      var result = await Model.getRequest(query)
    //   var result = await  Model.getList({table:"services_ou"})
      var r={"data":[]}

    //   console.log(result)
      await Promise.all(result.map(async val => {
                      

                        // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                        var action='<button id="mod-'+val['ID_SERVICE']+'" class="btn btn-success getDetailsOu" style="margin-right:10px">Modifier</buton>'
                        var action1='<button id="supp-'+val['ID_SERVICE']+'" class="btn btn-danger getDetailsOu" >Supprimer</buton>'
                                           
                        r.data.push({NAME:val['DESCRIPTION'],RAISON:val['RAISON_SOCIAL'],ABRE:val['ABREVIATION'],CHEF:val['NOM']?val['NOM']+" "+val['PRENOM']+" "+val['TELEPHONE']:"",ACTION:action+" "+action1})
                        
                    }));
                    
      return  res.status(200).json(r);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
    }

    exports.addOu = async function (req, res) {
        let token = req.headers.authorization;
        token_key=token.split(' ')
        var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
        

        try {         
            // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
            var nom=req.body.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                var infos={"DESCRIPTION":nom,
                "ABREVIATION":req.body.abreviation,
                "ID_RAISON":user1[0].ID_RAISON,
                "ID_UT_CHEF":req.body.id_ut
                }
    
    
            var check=await Model.getOne({table:"services_ou",culomn:{"DESCRIPTION":nom,"ID_RAISON":user1[0].ID_RAISON}})
                    var n= Object.keys(check).length
                
                if(n>0){
                    return res.status(200).json({ status: 200, response:"non",message:"exist" });
                }else{
    
                var id=await Model.insert({table:"services_ou",culomn:infos})
    
    
                return res.status(200).json({ status: 200, response:"ok" });
            }
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }

    exports.addPost = async function (req, res) {

        let token = req.headers.authorization;
        token_key=token.split(' ')
        var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
        
        try {         
    
            // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
            var nom=req.body.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
            var abr=req.body.abr.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                var infos={"DESCRIPTION_POSTE":nom,
                "ABREVIATION_POSTE":abr,
                "ID_RAISON":user1[0].ID_RAISON,
                "ID_SERVICE":req.body.id_un
                }
    
    
            var check=await Model.getOne({table:"poste",culomn:{"DESCRIPTION_POSTE":nom,"ID_RAISON":user1[0].ID_RAISON}})
                    var n= Object.keys(check).length
                
                if(n>0){
                    return res.status(200).json({ status: 200, response:"non",message:"exist" });
                }else{
    
                var id=await Model.insert({table:"poste",culomn:infos})
    
    
                return res.status(200).json({ status: 200, response:"ok" });
            }
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }

    exports.updatePost = async function (req, res) {
        let token = req.headers.authorization;
        token_key=token.split(' ')
        var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
        
        try {         
    
            // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
            var nom=req.body.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
            // var nom_old=req.body.post_old[0].toUpperCase() + req.body.post_old.slice(1)
            var nom_old=req.body.post_old.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
            var abr=req.body.abr.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                var infos={"DESCRIPTION_POSTE":nom,
                "ABREVIATION_POSTE":abr,
                "ID_RAISON":user1[0].ID_RAISON,
                "ID_SERVICE":req.body.id_un
                }
    
    
            var check=await Model.getOne({table:"poste",culomn:{"DESCRIPTION_POSTE":nom,"ID_RAISON":user1[0].ID_RAISON}})
                    var n= Object.keys(check).length
                
                if(n==0||nom==nom_old){
                    // var id=await Model.insert({table:"poste",culomn:infos})
                    // console.log(req.body.id)
                    var condition={ID_POSTE:req.body.id}
                    var id=await Model.update({table:"poste",culomn:infos,conditions:condition})
    
                    return res.status(200).json({ status: 200, response:"ok" });
                    
                }else{
    
                    return res.status(200).json({ status: 200, response:"non",message:"exist" });
            }
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }
    exports.UpdateOu = async function (req, res) {
        let token = req.headers.authorization;
        token_key=token.split(' ')
        var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
        
        try {         
    
            // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
            var nom=req.body.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
            // var nom_old=req.body.nom_old[0].toUpperCase() + req.body.nom_old.slice(1)
            var nom_old=req.body.nom_old.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                var infos={"DESCRIPTION":nom,
                "ABREVIATION":req.body.abreviation,
                "ID_RAISON":user1[0].ID_RAISON,
                "ID_UT_CHEF":req.body.id_ut
                }
    
    
            var check=await Model.getOne({table:"services_ou",culomn:{"DESCRIPTION":nom,"ID_RAISON":user1[0].ID_RAISON}})
                    var n= Object.keys(check).length
                
                if(n==0||nom==nom_old){
                    var condition={ID_SERVICE:req.body.id}
                    var id=await Model.update({table:"services_ou",culomn:infos,conditions:condition})

                return res.status(200).json({ status: 200, response:"ok" });
                }else{
    
                    return res.status(200).json({ status: 200, response:"non",message:"exist" });
                }
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }

    exports.delete_ou = async function (req, res) {

        try {
    
    
            var condition={ID_SERVICE:req.params.id}
            await Model.delete({table:"services_ou",conditions:condition})
          
             return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
     
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }

    exports.getOne_ou = async function (req, res) {

        try {
    

          var service=await Model.getList({table:"services_ou",culomn:{"ID_SERVICE":req.params.id}})

    
          
             return res.status(200).json({ status: 200,ouInfo:service,response:"ok" , message: "Succesfully Retrieved" });
     
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }

    exports.getOne_poste = async function (req, res) {

        try {
    

          var poste=await Model.getList({table:"poste",culomn:{"ID_POSTE":req.params.id}})

    
          
             return res.status(200).json({ status: 200,posteInfo:poste,response:"ok" , message: "Succesfully Retrieved" });
     
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }

    exports.select_his_ou = async function (req, res) {

        try {
    

        //   var poste=await Model.getList({table:"poste",culomn:{"ID_POSTE":req.params.id}})
          var poste=await Model.getOne({table:"poste",culomn:{"ID_POSTE":req.params.id}})
          var ou=await Model.getOne({table:"services_ou",culomn:{"ID_SERVICE":poste[0].ID_SERVICE}})

    
          
             return res.status(200).json({ status: 200,ouInfo:ou,response:"ok" , message: "Succesfully Retrieved" });
     
    
        } catch (e) {
            return res.status(200).json({ status: 200, message: e.message,response:"non" });
        }
    }

    exports.list_post = async function (req, res) {

        let token = req.headers.authorization;
        token_key=token.split(' ')
        var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
        

        try {
          // var users = await Model.getOne(table)
// console.log(user1[0].ID_RAISON)
          if(user1[0].ID_RAISON>0){
            var query={query:"SELECT p.ID_POSTE as ID,DESCRIPTION_POSTE,ABREVIATION_POSTE,DESCRIPTION,NOM,PRENOM,TELEPHONE,RAISON_SOCIAL from poste p left join services_ou so on p.ID_SERVICE=so.ID_SERVICE left join utilisateur u on so.ID_UT_CHEF=u.ID left join raisons_sociales rs on p.ID_RAISON=.rs.ID_RAISON WHERE p.ID_RAISON="+user1[0].ID_RAISON+" order by DESCRIPTION"}
          
          }else
          var query={query:"SELECT p.ID_POSTE as ID,DESCRIPTION_POSTE,ABREVIATION_POSTE,DESCRIPTION,NOM,PRENOM,TELEPHONE,RAISON_SOCIAL from poste p left join services_ou so on p.ID_SERVICE=so.ID_SERVICE left join utilisateur u on so.ID_UT_CHEF=u.ID left join raisons_sociales rs on p.ID_RAISON=.rs.ID_RAISON  order by DESCRIPTION"}
          var result = await Model.getRequest(query)
        //   var result = await  Model.getList({table:"services_ou"})
          var r={"data":[]}
          await Promise.all(result.map(async val => {
                          
    // console.log(val)
                            // var action='<div class="btn-group" dropdown><button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">Button dropdown <span class="caret"></span></button><ul *dropdownMenu class="dropdown-menu" role="menu"><li role="menuitem"><a class="dropdown-item" href="#">Action</a></li></ul></div>'
                            var action='<button id="mod-'+val['ID']+'" class="btn btn-success getDetailsPost" style="margin-right:10px">Modifier</buton>'
                            var action1='<button id="supp-'+val['ID']+'" class="btn btn-danger getDetailsPost" >Supprimer</buton>'
                            
                           
                            r.data.push({NAME:val['DESCRIPTION_POSTE'],RAISON:val['RAISON_SOCIAL'],ABR:val['ABREVIATION_POSTE'],OU:val['DESCRIPTION'],CHEF:val['NOM']==null?'':val['NOM']+" "+val['PRENOM']+" "+val['TELEPHONE'],ACTION:action+" "+action1})
                            
                        }));
                        
          return  res.status(200).json(r);
        } catch (e) {
          return res.status(400).json({ status: 400, message: e.message });
        }
        }
        exports.delete_poste = async function (req, res) {

            try {
        
        // console.log(req.params.id)
                var condition={ID_POSTE:req.params.id}
                await Model.delete({table:"poste",conditions:condition})
              
                 return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
         
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }
        exports.getOU = async function (req, res) {

            try {
        
                var ou=await Model.getListOrdered({table:"services_ou",order:{COLUMN:"DESCRIPTION",TYPE:"ASC"}})

                // console.log(ou)
              
                 return res.status(200).json({ status: 200,ou:ou,response:"ok" , message: "Succesfully Retrieved" });
         
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }


        exports.hierarchie_ou = async function (req, res) {

            try {
        
                let token = req.headers.authorization;
                token_key=token.split(' ')
                var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
                var condition={ID_RAISON:user1[0].ID_RAISON}
                var ou=await Model.getList({table:"services_ou",culomn:condition})
              
                

                 var r={"data":[]}
                 await Promise.all(ou.map(async val => {
                    r.data.push({ 'key': val['ID_SERVICE'], 'name': val['DESCRIPTION'],  'parent': val['ID_PARENT'] })
                       
                 }))
        //   return  res.status(200).json(r);
            return res.status(200).json({ status: 200,ou:r,response:"ok" });
            
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.update_hierarchie = async function (req, res) {

            try {         
        
                // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
               
                // console.log(req.body)
                const myObj = JSON.parse(req.body.data);
                // console.log(myObj)
                myObj.forEach(async val => {
                    if(val.parent==undefined){var parent=0}else parent=val.parent
                    await Model.update({table:"services_ou",culomn:{ID_PARENT:parent},conditions:{ID_SERVICE:val.key}})
                    var parent=await Model.getOne({table:"services_ou",culomn:{ID_SERVICE:parent}})
                    // var enfant=await Model.getOne({table:"services_ou",culomn:{"ID_SERVICE":val.key}})
                    
                    var np= Object.keys(parent).length
                    if(np>0){
                        var nv=parseInt(parent[0].NIVEAU)+1
                      await Model.update({table:"services_ou",culomn:{NIVEAU:nv},conditions:{ID_SERVICE:val.key}})
                    }
                    
                });
                    return res.status(200).json({ status: 200, response:"ok" });
                
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.flux_dem_cong = async function (req, res) {

            try {
        
                // await Model.truncate({table:"services_ou"})
              
                var poste=await Model.getList({table:"poste"})
                var flux=await Model.getList({table:"flux_conge"})

                 var r={"state":{diagramNodeData:[],diagramLinkData:[],diagramModelData: { prop: 'value' },skipsDiagramUpdate: false,selectedNodeData: null,}}
                 await Promise.all(poste.map(async val => {

                    var c1=Math.floor(Math.random()*(255-100+1)+100);
                    var c2=Math.floor(Math.random()*(255-100+1)+100);
                    var c3=Math.floor(Math.random()*(255-100+1)+100);
                    // console.log(c3+" "+c1)
                    r.state.diagramNodeData.push({ 'id': val['ID_POSTE'], 'text': val['ABREVIATION_POSTE'], 'color': 'rgb('+c1+', '+c2+', '+c3+')',  'loc': val['LOC'] })
                       
                 }))
var key=0
                 await Promise.all(flux.map(async val => {
                     key--
                    r.state.diagramLinkData.push({ 'key':key,'from': val['ID_FROM'], 'to': val['ID_TO'], 'fromPort': val['FROM_PORT'],  'toPort': val['TO_PORT'] })
                       
                 }))
        //   return  res.status(200).json(r);
            return res.status(200).json({ status: 200,data:r,response:"ok" });
            
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.update_flux = async function (req, res) {

            try {         
        
                await Model.truncate({table:"flux_conge"})
                // console.log(req.body.data)
                const myObj = JSON.parse(req.body.data);
                // console.log(myObj.diagramLinkData)

                myObj.diagramLinkData.forEach(async val => {

                    var infos={
                    "ID_FROM":val.from,
                    "ID_TO":val.to,
                    "FROM_PORT":val.fromPort,
                    "TO_PORT":val.toPort
                    }

                    var id=await Model.insert({table:"flux_conge",culomn:infos})
                    
                });
                myObj.diagramNodeData.forEach(async val => {
                    await Model.update({table:"poste",culomn:{LOC:val.loc},conditions:{ID_POSTE:val.id}})
                    
                });
                    return res.status(200).json({ status: 200, response:"ok" });
                
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.get_roles = async function (req, res) {

            try {
        
                var Roles=await Model.getList({table:"role"})
                
                // var url=await Model.getList({table:"url"})
                var url=await Model.getListOrdered({table:"url",order:{COLUMN:"LINK_URL",TYPE:"ASC"}})
            
            return res.status(200).json({ status: 200,role:Roles,urls:url,response:"ok" });
            
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }
        exports.addRole = async function (req, res) {

            try {         
                // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
                var nom=req.body.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                    var infos={"DESCRIPTION_ROLE":nom }
        
        
                var check=await Model.getOne({table:"role",culomn:{"DESCRIPTION_ROLE":nom}})
                        var n= Object.keys(check).length
                    
                    if(n>0){
                        return res.status(200).json({ status: 200, response:"non",message:"exist" });
                    }else{
        
                    var id=await Model.insert({table:"role",culomn:infos})
        
        
                    return res.status(200).json({ status: 200, response:"ok" });
                }
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }


        exports.updateRole = async function (req, res) {

            try {         
                // var nom=req.body.nom[0].toUpperCase() + req.body.nom.slice(1)
                var nom=req.body.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                var nom_old=req.body.nom_old.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
                    var infos={"DESCRIPTION_ROLE":nom }
        
        
                var check=await Model.getOne({table:"role",culomn:{"DESCRIPTION_ROLE":nom}})
                        var n= Object.keys(check).length
                    
                    if(n==0||nom==nom_old){
                        
                        var condition={ID_ROLE:req.body.id}
                        var id=await Model.update({table:"role",culomn:infos,conditions:condition})
                        
        
        
                    return res.status(200).json({ status: 200, response:"ok" });
                    }else{
        
                        return res.status(200).json({ status: 200, response:"non",message:"exist" });
                }
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.delete_role = async function (req, res) {

            try {
        
        // console.log(req.params.id)
                var condition={ID_ROLE:req.params.id}
                await Model.delete({table:"role",conditions:condition})
                await Model.delete({table:"role_url",conditions:condition})
              
                 return res.status(200).json({ status: 200,response:"ok" , message: "Succesfully Retrieved" });
         
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

    
        exports.get_url_role = async function (req, res) {

            try {
        
        // console.log(req.params.id)
                var condition={ID_ROLE:req.params.id}
                var roles=await Model.getList({table:"role_url",culomn:condition})
                // console.log(roles)
                var r=[]
                      roles.forEach(val => {
                          r.push(val['ID_URL'])
                      });
              
                 return res.status(200).json({ status: 200,urls:r,response:"ok" , message: "Succesfully Retrieved" });
         
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }
    
        exports.saves_permissions = async function (req, res) {

            try {  

                // console.log(req.body.urls)

                var id_role=req.body.id_role
                const obj = JSON.parse(req.body.urls)

                obj.forEach(async val => {

                    if(val.completed==true){

                        var check=await Model.getOne({table:"role_url",culomn:{"ID_ROLE":id_role,"ID_URL":val.ID_URL}})
                        var n= Object.keys(check).length

                        if(n==0){
                
                            await Model.insert({table:"role_url",culomn:{"ID_ROLE":id_role,"ID_URL":val.ID_URL}})
                        }
                    }else{
                        var condition={"ID_ROLE":id_role,"ID_URL":val.ID_URL}
                        await Model.delete({table:"role_url",conditions:condition})
                    }

                })

                return res.status(200).json({ status: 200,response:"ok" ,message:"" });
            
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.addUrl = async function (req, res) {

            try {  

                // console.log(req.body.urls)

                var url=req.body.url
                var check=await Model.getOne({table:"url",culomn:{"LINK_URL":url}})
                var n= Object.keys(check).length

                if(n==0){
                var id_url=await Model.insert({table:"url",culomn:{"LINK_URL":url}})
                await Model.insert({table:"role_url",culomn:{"ID_ROLE":1,"ID_URL":id_url}})
                }
                return res.status(200).json({ status: 200,response:"ok" ,message:"" });
            
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        
        exports.conge_param = async function (req, res) {

            try {
        
                const query={query:"SELECT* from parametrage_conge pc join parametrage_augmentation_conge pac on pc.ID_PARAMTRAGE_CONGE=pac.ID_PARAMETRAGE_CONGE"}
                var result = await Model.getRequest(query)
            return res.status(200).json({ status: 200,result:result,response:"ok" });
            
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }
        exports.change_conge_param = async function (req, res) {

            try {
                var nb_jour=req.body.nb_jour
                var nb_jour_ajout=req.body.nb_jour_ajout
                var nb_annee=req.body.nb_annee
                var temps=req.body.temps
                var regulier=req.body.regulier
                var nb_jour_ajout1=req.body.nb_jour_ajout1
                var nb_annee1=req.body.nb_annee1
                var nb_jour_ajout2=req.body.nb_jour_ajout2
                var nb_annee2=req.body.nb_annee2
                var nb_jour_ajout3=req.body.nb_jour_ajout3
                var nb_annee3=req.body.nb_annee3
                var nb_jour_ajout4=req.body.nb_jour_ajout4
                var nb_annee4=req.body.nb_annee4

                var condition={ID_PARAMTRAGE_CONGE:1}
                await Model.update({table:"parametrage_conge",culomn:{"NOMBRE_JOUR_INTILIALE":nb_jour,"MOIS_MINIMUM":temps},conditions:condition})

                // console.log(regulier)

                if(regulier){
                    await Model.truncate({table:"parametrage_augmentation_conge"})
                    var id=await Model.insert({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1,"ANS":nb_annee,"NOMBRE":nb_jour_ajout,"STATUT_REPETION":1}})
                }else{
                    await Model.truncate({table:"parametrage_augmentation_conge"})

                    if(nb_jour_ajout&&nb_annee) await Model.insert({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1,"ANS":nb_annee,"NOMBRE":nb_jour_ajout,"STATUT_REPETION":0}})
                    if(nb_jour_ajout1&&nb_annee1) await Model.insert({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1,"ANS":nb_annee1,"NOMBRE":nb_jour_ajout1,"STATUT_REPETION":0}})
                    if(nb_jour_ajout2&&nb_annee2) await Model.insert({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1,"ANS":nb_annee2,"NOMBRE":nb_jour_ajout2,"STATUT_REPETION":0}})
                    if(nb_jour_ajout3&&nb_annee3) await Model.insert({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1,"ANS":nb_annee3,"NOMBRE":nb_jour_ajout3,"STATUT_REPETION":0}})
                    if(nb_jour_ajout4&&nb_annee4) await Model.insert({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1,"ANS":nb_annee4,"NOMBRE":nb_jour_ajout4,"STATUT_REPETION":0}})

                }
            
            return res.status(200).json({ status: 200,response:"ok" ,message:"" });
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.conge_init = async function (req, res) {

            try {
                var matricule=req.body.matricule
                var nombre=req.body.nombre
                var date=req.body.date
                var id=req.body.id
                var USER_ID=req.body.USER_ID
                var today = new Date();
                 date = new Date(date);
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                months = (today.getFullYear() - date.getFullYear()) * 12;
                months -= date.getMonth();
                months += today.getMonth();
                var mois= months <= 0 ? 0 : months;

                var check=await Model.getOne({table:"parametrage_conge",culomn:{"ID_PARAMTRAGE_CONGE":1}})
                var check1=await Model.getOne({table:"parametrage_augmentation_conge",culomn:{"ID_PARAMETRAGE_CONGE":1}})

                let nombre_annee =  today.getFullYear() - date.getFullYear();
                let ajout =  0
                let ajout1 =  0
                
                if (check1[0].STATUT_REPETION==1) {
                     ajout =  nombre_annee/check1[0].NOMBRE
                     ajout1 =  Math.trunc(ajout)
                }else if (check1[0].STATUT_REPETION==0){
                    var non_repet=await Model.getList({table:"parametrage_augmentation_conge"})
                    non_repet.forEach(async val => {
                        var reste=nombre_annee-val['NOMBRE']
                        if (reste>0) {
                            ajout1+=parseInt(val['NOMBRE'])
                        }
                        nombre_annee=reste
                    })
                }
               

                var total=parseInt(check[0].NOMBRE_JOUR_INTILIALE+ajout1)
                console.log(total)
                

                // if (check[0].MOIS_MINIMUM>mois&&nombre>0) {
                if (check[0].MOIS_MINIMUM>mois) {
                    
                    return res.status(200).json({ status: 200, message: "mois_minimum>mois_travail",response:"non" });
                }else if (nombre>total) {
                    return res.status(200).json({ status: 200, message: "demande>total",response:"non" });
                }else{

                    var condition={ID:id}
                    var id=await Model.update({table:"utilisateur",culomn:{"MATRICULE":matricule,"SOLDE_CONGE_INITIAL":nombre,"DATE_EMBAUCHE":date,"DATE_SOLDE_CONGE":yyyy+"-"+mm+"-"+dd,"USER_ID":USER_ID},conditions:condition})
                return res.status(200).json({ status: 200,response:"ok" ,message:"" });
                }


            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.getTypeConge = async function (req, res) {

            try {
        
                var type_conges=await Model.getListOrdered({table:"type_conges",order:{COLUMN:"DESCRIPTION_CONGE",TYPE:"ASC"}})

                // console.log(ou)
              
                 return res.status(200).json({ status: 200,type_conges:type_conges,response:"ok" , message: "Succesfully Retrieved" });
         
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }

        exports.service_ou_hierarchie = async function (req, res) {
            let token = req.headers.authorization;
            token_key=token.split(' ')
            var user1=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})

            try {
        
                // await Model.truncate({table:"services_ou"})ID_RAISON="+user1[0].ID_RAISON+"
              
                var service=await Model.getList({table:"services_ou",culomn:{"ID_RAISON":user1[0].ID_RAISON}})
                var relation=await Model.getList({table:"service_ou_hierarchie"})

                 var r={"state":{diagramNodeData:[],diagramLinkData:[],diagramModelData: { prop: 'value' },skipsDiagramUpdate: false,selectedNodeData: null,}}
                 var array_node=[]
                 await Promise.all(service.map(async val => {

                    // console.log(c3+" "+c1)
                    r.state.diagramNodeData.push({ 'key': val['ID_SERVICE'], 'text': val['DESCRIPTION'], 'color': 'white',  'loc': val['LOC'] })
                    array_node.push({ 'key': val['ID_SERVICE'], 'text': val['DESCRIPTION'], 'color': 'white',  'loc': val['LOC']})
                 }))
var key=0
var array_link=[]
                 await Promise.all(relation.map(async val => {
                     key--
                    r.state.diagramLinkData.push({ 'key':key,'from': val['ID_FROM'], 'to': val['ID_TO']})
                    array_link.push({'from': val['ID_FROM'], 'to': val['ID_TO']})  
                 }))
        //   return  res.status(200).json(r);
            return res.status(200).json({ status: 200,array_node:array_node,array_link:array_link,data:r,response:"ok" });
            
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }
        exports.update_service_ou_hierarchie = async function (req, res) {

            try {         
        
                await Model.truncate({table:"service_ou_hierarchie"})
                // console.log(req.body.data)
                const myObj = JSON.parse(req.body.data);
                // console.log(myObj.diagramLinkData)

                myObj.diagramLinkData.forEach(async val => {

                    var infos={
                    "ID_FROM":val.from,
                    "ID_TO":val.to
                    }

                    var id=await Model.insert({table:"service_ou_hierarchie",culomn:infos})
                    
                });
                myObj.diagramNodeData.forEach(async val => {
                    await Model.update({table:"services_ou",culomn:{LOC:val.loc},conditions:{ID_SERVICE:val.key}})
                    
                });
                    return res.status(200).json({ status: 200, response:"ok" });
                
        
            } catch (e) {
                return res.status(200).json({ status: 200, message: e.message,response:"non" });
            }
        }