const db=require("../config/db.config")
const knex = require('knex')(db);

exports.getAll = async (req, res) => {

   var vv= knex.select().from('defaut_parametre_couleur')
   console.log(req.table);
   return vv

}

exports.getList = async (req, res) => { 

    if(req.hasOwnProperty("culomn")){
        var n= Object.keys(req.culomn).length
        // console.log(n); 
         
        if(n===0){
            var result= knex.select().from(req.table)
        }else
            var result=knex(req.table).where(req.culomn).select()
            
    }else var result= knex.select().from(req.table)
    
      // console.log(result);
   return result

}

exports.getListOrdered = async (req, res) => { 

    if(req.hasOwnProperty("culomn")){
        var n= Object.keys(req.culomn).length
        // console.log(n); 
         
        if(n===0){
            var result= knex(req.table).orderBy(req.order.COLUMN, req.order.TYPE)
        }else
            var result=knex(req.table).orderBy(req.order.COLUMN, req.order.TYPE).where(req.culomn).select()
            
    }else var result= knex.select().from(req.table).orderBy(req.order.COLUMN, req.order.TYPE)
    
      // console.log(result);
   return result

}
exports.getOne = async (req, res) => {
    var n= Object.keys(req.culomn).length
    // console.log(n); 
     
    if(n>0){
        // var result= knex.select().from(req.table)
        var result=  knex(req.table).where(req.culomn).select().limit(1)
        return result
    }else        

   return []

}


exports.getRequest = async (req, res) => { 

        var result=await knex.raw(req.query)

   return result[0]

}

exports.insert = async (req, res) => {
    var n= Object.keys(req.culomn).length
    // console.log(n); 
     
    if(n>0){

        var result=  knex(req.table)
  .insert([req.culomn])
         
        return result
        
    }else        

   return ''

}

exports.update = async (req, res) => {
    var n= Object.keys(req.culomn).length
    // console.log(req.conditions); 
     
    if(n>0){

//         var result=  knex(req.table)
//   .insert([req.culomn])
         
  var result=  knex.table(req.table)
  .where(req.conditions)
  .update(req.culomn);
        return result
        
    }else        

   return ''

}

exports.delete = async (req, res) => {

    return knex(req.table).where(req.conditions).del()
        

}

exports.truncate = async (req, res) => {

    return knex(req.table).truncate()
        
}


