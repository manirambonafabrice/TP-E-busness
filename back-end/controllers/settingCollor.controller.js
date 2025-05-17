const Model = require("../models/model");
const json_encode = require('json_encode');
exports.getAllCollor = async function (req, res) {
        // const table={table:"defaut_parametre_couleur",culomn:{id:1}}
        

    try {
        // var users = await Model.getOne(table)
        
        var body=await Model.getOne({table:"defaut_parametre_couleur",culomn:{"CELLULE":'Body'}})
        var titre=await Model.getOne({table:"defaut_parametre_couleur",culomn:{"CELLULE":'Titre'}})
        var menu=await Model.getOne({table:"defaut_parametre_couleur",culomn:{"CELLULE":'Menu'}})
        var bas_menu=await Model.getOne({table:"defaut_parametre_couleur",culomn:{"CELLULE":'Bas_menu'}})
        var bar=await Model.getOne({table:"defaut_parametre_couleur",culomn:{"CELLULE":'Bar'}})
        var logo=await Model.getOne({table:"defaut_parametre_couleur",culomn:{"CELLULE":'Logo'}})
        // var result = await Model.getList(query)
      
      //  cart.push(titre);

        // var encoded = json_encode(body);

        return res.status(200).json({ status: 200, data: {body_style:body,Titre_style:titre,Menu_style:menu,Bas_menu_style:bas_menu,Bar_style:bar,Logo:logo}, message: "Succesfully Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.getUsers = async function (req, res) {

      const query={query:"SELECT * FROM utilisateur u left join poste p on u.ID_POSTE=p.ID_POSTE"}

    try {
      // var users = await Model.getOne(table)
      var result = await Model.getRequest(query)

      return res.status(200).json({ status: 200, data: result, message: "Succesfully Retrieved" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
}

// Find a single settingColor with a id
exports.findOne = (req, res) => {
  
};

