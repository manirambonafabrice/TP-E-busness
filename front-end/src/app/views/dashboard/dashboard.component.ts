import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router } from '@angular/router';
import { InfoTransportService } from '../../services/info-transport.service';
import { HttpClient } from '@angular/common/http';
import { DefaultLayoutComponent } from '../../containers';
import { ConnexionService } from '../../services/connexion.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  nombre_raisons
  nombre_employes
  nombre_vehicules
  nombre_itineraire

  constructor(private info_service1:InfoTransportService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService) {
    
  }

  ngOnInit(): void {

    this.info_service1.getGlobalInfos().subscribe
  (res=>{

    if(res.response=="non"){
      console.log("PROBLEME DE SERVEUR")
    }else{
console.log(res)

  this.nombre_raisons=res.infos.raisons
  this.nombre_employes=res.infos.employes
  this.nombre_vehicules=res.infos.vehicules
  this.nombre_itineraire=res.infos.itineraires
    } 
    
  },
  error=>{
    console.log(error)
  })
  }
  

}
