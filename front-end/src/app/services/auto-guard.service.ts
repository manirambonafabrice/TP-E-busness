import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthentificationService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
    if(this.authService.isAuth) {
      return true;
    } else {
      

     
      var url=sessionStorage.getItem('url_new');
     
      if(!url){
      url=""
      }
      if(!url.includes("login")){
      sessionStorage.setItem("url_new", window.location.href)
      }
    
      this.router.navigate(['/login']);
     
      return false
    }
  }
}