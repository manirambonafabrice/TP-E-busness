const Model = require("../models/model");
const AD = require("../config/ad.config");
const e = require("express");
// const json_encode = require('json_encode');


exports.profile_insert = async function (req, res) {
 try {
    await Model.insert({table:"profil",culomn:{"DESCRIPTION_PROFIL":'username'}})

      return  res.status(200).json('');
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.test = async function (req, res) {
  try {
     
    const str = "Crème Bruléeà"
    var n=str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
  
    console.log(n)
    

     } catch (e) {
       return res.status(400).json({ status: 400, message: e.message });
     }
 }