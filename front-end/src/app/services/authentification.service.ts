import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable , OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService implements OnInit {

  session= JSON.parse(sessionStorage.getItem('usersession'));
  
  isAuth = false;

  headers = new HttpHeaders({ 'Authorization': 'Bearer ' + "tokenKey" });
  
  
  constructor(private http:HttpClient,private connexion:ConnexionService) {
    if (this.session) {
      if (this.session.response) {
        this.isAuth = true;
      }
      
    }
   
  }

   ngOnInit(): void {

  }
 

  onAuth(formInfo:FormGroup):Observable<any>{
    
    return this.http.post(this.connexion.base_url+"routes/auth",formInfo.value
    , {
      headers: {
          "Authorization": 'Token token="1111"',
      }
    }
    );   

  }
    
  check_users_exist():Observable<any>{
 
    return this.http.get(this.connexion.base_url+"routes/check_users_exist/");   

  }

  insert_first_user(formData):Observable<any>{
 
   
    return this.http.post(this.connexion.base_url+"routes/insert_first_user",formData);   

  }

  deconnecter(){
    
  }
}
