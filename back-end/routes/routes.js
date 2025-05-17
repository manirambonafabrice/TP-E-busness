const color_contr = require("../controllers/settingCollor.controller");
const user_contr = require("../controllers/user.contoller");
const ou_contr = require("../controllers/ou.controller");
const setting_contr = require("../controllers/setting.controller");
var router = require("express").Router();
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads',maxFieldsSize: '20MB' });

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


 
// Route get all products
router.get('/collors',color_contr.getAllCollor);

router.get('/utilisateur',color_contr.getUsers);
router.get('/list_users_conge',verifyToken,user_contr.list_users_conge);
router.get('/historique_de_mes_conges/:id',verifyToken,user_contr.historique_de_mes_conges);
router.get('/users_actifs',user_contr.list_users);
router.get('/users_bloques',user_contr.list_users_bloques);
router.get('/list_ou',ou_contr.list_ou);
router.get('/list_post',ou_contr.list_post);
router.post('/auth', user_contr.authentification);
router.post('/setting_test', setting_contr.profile_insert);
router.post('/test', setting_contr.test);
router.get('/chargeAD',verifyToken,user_contr.chargeAD);
router.post('/addUser', multipartMiddleware,verifyToken,user_contr.addUser);
router.post('/insert_first_user', multipartMiddleware,verifyToken,user_contr.insert_first_user);
router.post('/addOu', multipartMiddleware,verifyToken,ou_contr.addOu);
router.post('/addPost', multipartMiddleware,verifyToken,ou_contr.addPost);
router.post('/updatePost', multipartMiddleware,verifyToken,ou_contr.updatePost);
router.post('/UpdateOu', multipartMiddleware,verifyToken,ou_contr.UpdateOu);
router.post('/updateUser', multipartMiddleware,verifyToken,user_contr.updateUser);
// router.post('/addUser',verifyToken,user_contr.addUser);
router.get('/userInputFill',verifyToken,user_contr.userInputFill);
router.get('/getOne/:id',verifyToken,user_contr.getOne);
router.get('/getOne_ou/:id',verifyToken,ou_contr.getOne_ou);
router.get('/getOne_poste/:id',verifyToken,ou_contr.getOne_poste);
router.get('/bloquer_user/:id',verifyToken,user_contr.bloquer_user);
router.get('/debloquer_user/:id',verifyToken,user_contr.debloquer_user);
router.get('/delete_ou/:id',verifyToken,ou_contr.delete_ou);
router.get('/delete_poste/:id',verifyToken,ou_contr.delete_poste);
router.get('/select_his_ou/:id',verifyToken,ou_contr.select_his_ou);
router.get('/getUtilisateur',verifyToken,user_contr.getUtilisateur);
router.get('/getOU',verifyToken,ou_contr.getOU);
router.get('/check_users_exist',user_contr.check_users_exist);
router.get('/hierarchie_ou',verifyToken,ou_contr.hierarchie_ou);
router.post('/update_hierarchie', multipartMiddleware,verifyToken,ou_contr.update_hierarchie);
router.get('/flux_dem_cong',verifyToken,ou_contr.flux_dem_cong);
router.post('/update_flux', multipartMiddleware,verifyToken,ou_contr.update_flux);
router.get('/get_roles/',verifyToken,ou_contr.get_roles);
router.post('/addRole', multipartMiddleware,verifyToken,ou_contr.addRole);
router.get('/delete_role/:id',verifyToken,ou_contr.delete_role);
router.post('/updateRole', multipartMiddleware,verifyToken,ou_contr.updateRole);
router.get('/get_url_role/:id',verifyToken,ou_contr.get_url_role);
router.post('/saves_permissions', multipartMiddleware,verifyToken,ou_contr.saves_permissions);
router.post('/addUrl', multipartMiddleware,verifyToken,ou_contr.addUrl);
router.get('/conge_param/',verifyToken,ou_contr.conge_param);
router.post('/change_conge_param', multipartMiddleware,verifyToken,ou_contr.change_conge_param);
router.post('/conge_init', multipartMiddleware,verifyToken,ou_contr.conge_init);
router.get('/getTypeConge',verifyToken,ou_contr.getTypeConge);
router.get('/getSoldeConge/:id',verifyToken,user_contr.getSoldeConge);
router.get('/getConge/:id',verifyToken,user_contr.getConge);
router.get('/getHistoriqueConge/:id_conge/:id_user',verifyToken,user_contr.getHistoriqueConge);
router.post('/demande_conge', multipartMiddleware,verifyToken,user_contr.demande_conge);
router.post('/demande_conge_update', multipartMiddleware,verifyToken,user_contr.demande_conge_update);
router.get('/delete_conge_demande/:id',verifyToken,user_contr.delete_conge_demande);
router.post('/pdf_conge',multipartMiddleware,verifyToken,user_contr.pdf_conge);
router.get('/getNotification/:id',verifyToken,user_contr.getNotification);
router.get('/conge_a_traiter/:id',verifyToken,user_contr.conge_a_traiter);
router.get('/conge_tout',verifyToken,user_contr.conge_tout);
router.post('/traiter_conge',multipartMiddleware,verifyToken,user_contr.traiter_conge);
router.get('/check_validation/:id_conge/:id_user',verifyToken,user_contr.check_validation);
router.get('/users_conge_solde',verifyToken,user_contr.users_conge_solde);
router.get('/service_ou_hierarchie',ou_contr.service_ou_hierarchie);
router.post('/update_service_ou_hierarchie', multipartMiddleware,verifyToken,ou_contr.update_service_ou_hierarchie);
module.exports = router; 