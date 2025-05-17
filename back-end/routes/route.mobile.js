
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads',maxFieldsSize: '20MB' });
const mobile_contr = require("../controllers/mobile.controller")
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

router.post('/auth', mobile_contr.authentification);
router.post('/synchronisation', multipartMiddleware,verifyToken,mobile_contr.synchronisation);
router.post('/synchronisation_facture_paiement', multipartMiddleware,verifyToken,mobile_contr.synchronisation_facture_paiement);
router.post('/save_facture', multipartMiddleware,verifyToken,mobile_contr.save_facture);

// router.post('/updatetrajet', multipartMiddleware,verifyToken,transport_contr.updatetrajet);
// router.get('/getGlobalInfos',transport_contr.getGlobalInfos);
module.exports = router; 