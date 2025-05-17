import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-conge-solde-user',
  templateUrl: './conge-solde-user.component.html',
  styleUrls: ['./conge-solde-user.component.scss']
})
export class CongeSoldeUserComponent implements OnInit {

  dtOptions_actif: any = {};

  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService) {
    var url=window.location.href
    var path=url.split("#")
    let formData = new FormData();
  
    formData.append("url",path[1])
    // console.log(path[1])
      this.info_service.addUrl(formData).subscribe
      (res=>{
  
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
    
        }
        
      },
      error=>{
        console.log(error)
      })
   }

  ngOnInit(): void {
    this.approot.progressBar=true;


    this.dtOptions_actif = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes/users_conge_solde",
                type:"GET"
            },
      columns: [{
        title: 'NOM&PRENOM',
        data: 'NOM_PRENOM'
      }, {
        title: 'MATRICULE',
        data: 'MATRICULE'
      },{
        title: 'DATE D\'EMBAUCHE',
        data: 'DATE_EMBAUCHE'
      },{
        title: 'SOLDE',
        data: 'SOLDE'
      }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES UTILISATEURS ACTIFS ET LEURS SOLDES DES CONGES'},
      ]
    };

    this.approot.progressBar=false;
  

  }
  profile(index?: any){

    this.router.navigate(['parametrage/conge_init/modif/'+index]);
  }

}
