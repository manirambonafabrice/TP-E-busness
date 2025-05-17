import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  colorSetting;
  constructor(private http:HttpClient,private connexion:ConnexionService) { 
    // this.colorSetting=this.http.post(this.connexion.base_url+"Parametrage/collors","");
    this.colorSetting=this.http.get(this.connexion.base_url+"routes/collors");
    
    // console.log(this.colorSetting);
  }
  
  // setting():Observable<any>{
   
  //   return this.http.post(this.connexion.base_url+"Login/do_login/","");   

  // }
}
