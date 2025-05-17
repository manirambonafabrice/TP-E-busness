import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http:HttpClient,private connexion:ConnexionService) { }

  chager_AD():Observable<any>{
   
    return this.http.get(this.connexion.base_url+"routes/chargeAD", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });     

  }

  addUser(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addUser",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  
  addOu(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addOu",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  addPost(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addPost",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  updatePost(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/updatePost",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  UpdateOu(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"routes/UpdateOu",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  updateUser(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/updateUser",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  

  inputFill():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/userInputFill", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  getOne(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOne/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  bloquer_user(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/bloquer_user/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  debloquer_user(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/debloquer_user/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      
  }

  getUtil():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getUtilisateur/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  getOU():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOU/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }


  delete_ou(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_ou/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }
  delete_poste(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_poste/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  getOne_ou(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOne_ou/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  getOne_poste(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getOne_poste/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  
  select_his_ou(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/select_his_ou/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  hierarchie_ou():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/hierarchie_ou/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
  update_hierarchie(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/update_hierarchie",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  flux_dem_cong():Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"routes/flux_dem_cong/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }
  update_flux(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/update_flux",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  service_ou_hierarchie():Observable<any>{
    // console.log(sessionStorage.getItem("tokenKey"))
 
    return this.http.get(this.connexion.base_url+"routes/service_ou_hierarchie/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  update_service_ou_hierarchie(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/update_service_ou_hierarchie",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  flux_dem_cong1(){
 
    return this.http.get(this.connexion.base_url+"routes/flux_dem_cong/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }

  get_roles():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/get_roles/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  addRole(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/addRole",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  delete_role(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_role/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  updateRole(formData):Observable<any>{
 
    return this.http.post(this.connexion.base_url+"routes/updateRole",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  get_url_role(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/get_url_role/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }
  saves_permissions(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/saves_permissions",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  addUrl(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/addUrl",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  conge_param():Observable<any>{
  
    return this.http.get(this.connexion.base_url+"routes/conge_param/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  change_conge_param(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/change_conge_param",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  conge_init(formData):Observable<any>{
  
    return this.http.post(this.connexion.base_url+"routes/conge_init",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }

  getTypeConge():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getTypeConge/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });      

  }

  getSoldeConge(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getSoldeConge/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  getSoldeConge_annee(id,annee):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getSoldeConge_annee/"+id+"/"+annee, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  demande_conge(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/demande_conge",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  demande_conge_update(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/demande_conge_update",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );      

  }
  getConge(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getConge/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  delete_conge_demande(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/delete_conge_demande/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }

  pdf_conge(formData):Observable<any>{
    // demande_conge(formData):Observable<any>{
 
   
      return this.http.post(this.connexion.base_url+"routes/pdf_conge/",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );    
    // return this.http.get(this.connexion.base_url+"routes/pdf_conge/"+id);   

  }

  getHistoriqueConge(id_conge,id_user):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getHistoriqueConge/"+id_conge+"/"+id_user, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });       

  }

  getNotification(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/getNotification/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }

  traiter_conge(formData):Observable<any>{

      return this.http.post(this.connexion.base_url+"routes/traiter_conge/",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
   );    
      

  }

  check_validation(id_conge,id_user):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/check_validation/"+id_conge+"/"+id_user, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });         

  }

  info_validateur(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/info_validateur/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });        

  }
}
