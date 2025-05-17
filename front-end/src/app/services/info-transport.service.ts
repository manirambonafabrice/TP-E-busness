import { Injectable } from '@angular/core';
import { ConnexionService } from './connexion.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoTransportService {
  

  constructor(private http:HttpClient,private connexion:ConnexionService) { }

  getProvince():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getProvince", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }
  getCommune(id_povince):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getCommune/"+id_povince, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }
  getZone(id_commune):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getZone/"+id_commune, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }
    
  addZone(formData):Observable<any>{
    
   
    return this.http.post(this.connexion.base_url+"routes.transport/addZone",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }
  delete_zone(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/delete_zone/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }
  getOne_zone(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOne_zone/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  updateZone(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes.transport/updateZone",formData,
    {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }}
   );   

  }

  addRaison(formData):Observable<any>{
    
   
    return this.http.post(this.connexion.base_url+"routes.transport/addRaison",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  delete_raison(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/delete_raison/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  getOne_raison(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOne_raison/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  updateRaison(formData):Observable<any>{
    
   
    return this.http.post(this.connexion.base_url+"routes.transport/updateRaison",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  getTypeVehicule():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getTypeVehicule/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }
  addVehicule(formData):Observable<any>{
    
   
    return this.http.post(this.connexion.base_url+"routes.transport/addVehicule",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  getOne_vehicule(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOne_vehicule/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

updateVehicule(formData):Observable<any>{
    
   
    return this.http.post(this.connexion.base_url+"routes.transport/updateVehicule",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  addPointVente(formData):Observable<any>{
    
   
    return this.http.post(this.connexion.base_url+"routes.transport/addPointVente",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  getOnePoint(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOnePoint/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  updatePointVente(formData):Observable<any>{
    
   
    return this.http.post(this.connexion.base_url+"routes.transport/updatePointVente",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }
  
  get_users():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/get_users/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  get_points():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/get_points/", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  
  get_users_points(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/get_users_points/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  saves_affectation(formData):Observable<any>{
    
    return this.http.post(this.connexion.base_url+"routes.transport/saves_affectation",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  
  getOne_point(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOne_point/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getInfo_Itineraire_par_type(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getInfo_Itineraire_par_type/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }
  getInfo_Itineraire_par_type1(id,id1):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getInfo_Itineraire_par_type/"+id+"/"+id1, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getCommune_Itineraire(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getCommune_Itineraire/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getZone_Itineraire(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getZone_Itineraire/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getInfo_Itineraire_withoutOrigine(formData):Observable<any>{
 
       
    return this.http.post(this.connexion.base_url+"routes.transport/getInfo_Itineraire_withoutOrigine",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   


  }
  getInfo_Itineraire_withoutOrigine2(formData):Observable<any>{
 
       
    return this.http.post(this.connexion.base_url+"routes.transport/getInfo_Itineraire_withoutOrigine2",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   


  }

  addItineraire(formData):Observable<any>{
 
       
    return this.http.post(this.connexion.base_url+"routes.transport/addItineraire",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   


  }

  getItineraire():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getItineraire", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getOneItineraire(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOneItineraire/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  updateItineraire(formData):Observable<any>{
     
    return this.http.post(this.connexion.base_url+"routes.transport/updateItineraire",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }
  getOneItineraire1(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOneItineraire1/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  
  addItineraire_intermediaire(formData):Observable<any>{
 
       
    return this.http.post(this.connexion.base_url+"routes.transport/addItineraire_intermediaire",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   


  }

  getOneItineraire_intermediaire(id_interm,id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOneItineraire_intermediaire/"+id_interm+"/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  updateItineraire_intermediaire(formData):Observable<any>{
        
    return this.http.post(this.connexion.base_url+"routes.transport/updateItineraire_intermediaire",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  delete_itineraire(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/delete_itineraire/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  delete_itineraire_intermediaire(id,id1):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/delete_itineraire_intermediaire/"+id+"/"+id1, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  getvehicules():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getvehicules", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getUser_raison():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getUser_raison", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  addtrajet(formData):Observable<any>{
    
    return this.http.post(this.connexion.base_url+"routes.transport/addtrajet",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  getItineraireFiltre(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getItineraireFiltre/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getNumber_iti_byType():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getNumber_iti_byType", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }

  getOneTrajet(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getOneTrajet/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  updatetrajet(formData):Observable<any>{
    
    return this.http.post(this.connexion.base_url+"routes.transport/updatetrajet",formData,
     {headers: {"Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID }},
    );   

  }

  getGlobalInfos():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/getGlobalInfos", {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   

  }


  cloturer_trajet(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/cloturer_trajet/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  suspendre_trajet(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/suspendre_trajet/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  check_chauffeur_libre(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/check_chauffeur_libre/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

  check_vehicule_libre(id):Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes.transport/check_vehicule_libre/"+id, {
      headers: {
          "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
      }
    });   
  }

}
