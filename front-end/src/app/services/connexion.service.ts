import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  // base_url="http://transportbackend.investpaytechnologies.com/";
  base_url="http://localhost:82/";
  local_url="http://localhost:4201/#/";
  online_url="http://localhost:4201/#/";
  
  constructor() { }
}
