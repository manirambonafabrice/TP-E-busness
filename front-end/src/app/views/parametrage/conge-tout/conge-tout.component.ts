import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-conge-tout',
  templateUrl: './conge-tout.component.html',
  styleUrls: ['./conge-tout.component.scss']
})
export class CongeToutComponent implements OnInit {


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
                url:this.connexion.base_url+"routes/conge_tout",
                type:"GET"
            },
      columns: [{
        title: 'DATE DE DEMANDE',
        data: 'DATE_CREATION'
      }, {
        title: 'NOM & PRENOM',
        data: 'NOMPRENOM'
      }, {
        title: 'TYPE',
        data: 'TYPE_CONGE'
      },{
        title: 'MOTIF',
        data: 'MOTIF'
      },{
        title: 'EXERCICES',
        data: 'EXERCICES'
      },{
        title: 'DATE DEBUT',
        data: 'DATE_DEBUT'
      }, {
        title: 'DATE FIN',
        data: 'DATE_FIN'
      }, {
        title: 'DATE RETOUR',
        data: 'DATE_RETOUR'
      }, {
        title: 'NOMBRE DE JOURS',
        data: 'NOMBRE'
      }, {
        title: 'ADRESSE',
        data: 'ADRESSE_CONGE'
      }, {
        title: 'STATUT',
        data: 'STATUT'
      },{
        title: 'ACTION',
        data: 'ACTION'
      }],
      blengthChange: false,
      responsive: true,
      order: [[ 0, "desc" ]],
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES DEMANDES DE CONGE A TRAITER'},
      ]
    };

    this.approot.progressBar=false;


      
    var self = this;

    $(document).on( 'click', '.traiter', function (event) {

      var id=$(this).attr('id')
      
        self.traiter(id);
      

      event.stopImmediatePropagation();
     
  } );

  }
  traiter(index?: any){
// alert()
    this.router.navigate(['parametrage/conge_tout/detail/'+index]);
  }



}