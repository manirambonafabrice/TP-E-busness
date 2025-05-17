
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads',maxFieldsSize: '20MB' });
const transport_contr = require("../controllers/transport.controller")
var router = require("express").Router();
const JWT = require('jsonwebtoken');
const Model = require("../models/model");
verifyToken = async(req, res, next) => {
    // console.log(req.headers)
    let token = req.headers.authorization;
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }else token_key=token.split(' ')
    // next();
    // console.log(token_key)

    try {
      var user=await Model.getOne({table:"utilisateur",culomn:{"ID":token_key[2]}})
      var decoded = JWT.verify(token_key[1], user[0].PWD);

      req.userId = decoded.id;
      next();
    } catch(err) {
      // console.log(err)
      // err
      return res.status(401).send({
          message: "Unauthorized!"
        })
    }
  };

router.get('/list_province',transport_contr.list_province);
router.get('/getProvince',verifyToken,transport_contr.getProvince);
router.get('/getCommune/:id',verifyToken,transport_contr.getCommune);
router.get('/getZone/:id',verifyToken,transport_contr.getZone);
router.get('/list_commune/:id',transport_contr.list_commune);
router.get('/list_zone/:id',transport_contr.list_zone);
router.get('/list_raisons_solciales',transport_contr.list_raisons_solciales);
router.get('/delete_zone/:id',verifyToken,transport_contr.delete_zone);
router.get('/getOne_zone/:id',verifyToken,transport_contr.getOne_zone);
router.get('/getOne_raison/:id',verifyToken,transport_contr.getOne_raison);
router.get('/getOne_vehicule/:id',verifyToken,transport_contr.getOne_vehicule);

router.post('/addZone', multipartMiddleware,verifyToken,transport_contr.addZone);
router.post('/addRaison', multipartMiddleware,verifyToken,transport_contr.addRaison);
router.post('/updateZone', multipartMiddleware,verifyToken,transport_contr.updateZone);
router.get('/delete_raison/:id',verifyToken,transport_contr.delete_raison);
router.post('/updateRaison', multipartMiddleware,verifyToken,transport_contr.updateRaison)
router.get('/list_vehicules',transport_contr.list_vehicules);
router.get('/getTypeVehicule',verifyToken,transport_contr.getTypeVehicule);
router.post('/addVehicule', multipartMiddleware,verifyToken,transport_contr.addVehicule);
router.post('/updateVehicule', multipartMiddleware,verifyToken,transport_contr.updateVehicule);
router.get('/list_point_vente',verifyToken,transport_contr.list_point_vente);
router.get('/list_point_vente_prov/:id',verifyToken,transport_contr.list_point_vente_prov);
router.get('/list_point_vente_com/:id',verifyToken,transport_contr.list_point_vente_com);
router.get('/list_point_vente_zone/:id',verifyToken,transport_contr.list_point_vente_zone);

router.post('/addPointVente', multipartMiddleware,verifyToken,transport_contr.addPointVente);
router.post('/updatePointVente', multipartMiddleware,verifyToken,transport_contr.updatePointVente);
router.get('/getOnePoint/:id',verifyToken,transport_contr.getOnePoint);
router.get('/get_users',verifyToken,transport_contr.get_users);
router.get('/get_points',verifyToken,transport_contr.get_points);
router.get('/get_users_points/:id',verifyToken,transport_contr.get_users_points);
router.post('/saves_affectation', multipartMiddleware,verifyToken,transport_contr.saves_affectation);
router.get('/getOne_point/:id',verifyToken,transport_contr.getOne_point);

router.get('/list_users_point/:id',verifyToken,transport_contr.list_users_point);
router.get('/list_itineraire',verifyToken,transport_contr.list_itineraire);
router.get('/getInfo_Itineraire_par_type/:id',verifyToken,transport_contr.getInfo_Itineraire_par_type);
router.get('/getInfo_Itineraire_par_type/:id/:id1',verifyToken,transport_contr.getInfo_Itineraire_par_type);
router.get('/getCommune_Itineraire/:id',verifyToken,transport_contr.getCommune_Itineraire);
router.get('/getZone_Itineraire/:id',transport_contr.getZone_Itineraire);
router.post('/getInfo_Itineraire_withoutOrigine', multipartMiddleware,transport_contr.getInfo_Itineraire_withoutOrigine);
router.post('/addItineraire', multipartMiddleware,verifyToken,transport_contr.addItineraire);
router.get('/getItineraire',transport_contr.getItineraire);
router.get('/getOneItineraire/:id',transport_contr.getOneItineraire);
router.get('/getOneItineraire1/:id',transport_contr.getOneItineraire1);
router.post('/updateItineraire', multipartMiddleware,verifyToken,transport_contr.updateItineraire);
router.post('/getInfo_Itineraire_withoutOrigine2', multipartMiddleware,transport_contr.getInfo_Itineraire_withoutOrigine2);
router.post('/addItineraire_intermediaire', multipartMiddleware,verifyToken,transport_contr.addItineraire_intermediaire);
router.get('/getOneItineraire_intermediaire/:id_interm/:id',transport_contr.getOneItineraire_intermediaire);
router.post('/updateItineraire_intermediaire', multipartMiddleware,verifyToken,transport_contr.updateItineraire_intermediaire);

router.get('/delete_itineraire/:id',verifyToken,transport_contr.delete_itineraire)
router.get('/delete_itineraire_intermediaire/:id/:id1',verifyToken,transport_contr.delete_itineraire_intermediaire)
router.get('/getvehicules', multipartMiddleware,verifyToken,transport_contr.getvehicules);
router.get('/getUser_raison', multipartMiddleware,verifyToken,transport_contr.getUser_raison);
router.post('/addtrajet', multipartMiddleware,verifyToken,transport_contr.addtrajet);
router.get('/getItineraireFiltre/:id',transport_contr.getItineraireFiltre);
router.get('/getNumber_iti_byType',transport_contr.getNumber_iti_byType);
router.get('/list_trajet',transport_contr.list_trajet);
router.get('/getOneTrajet/:id',transport_contr.getOneTrajet);
router.post('/updatetrajet', multipartMiddleware,verifyToken,transport_contr.updatetrajet);
router.get('/getGlobalInfos',transport_contr.getGlobalInfos);

router.get('/cloturer_trajet/:id',verifyToken,transport_contr.cloturer_trajet);
router.get('/suspendre_trajet/:id',verifyToken,transport_contr.suspendre_trajet);
router.get('/check_chauffeur_libre/:id',verifyToken,transport_contr.check_chauffeur_libre);
router.get('/check_vehicule_libre/:id',verifyToken,transport_contr.check_vehicule_libre);
module.exports = router; 