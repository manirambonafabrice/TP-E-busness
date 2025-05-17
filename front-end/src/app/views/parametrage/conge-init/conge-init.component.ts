import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-conge-init',
  templateUrl: './conge-init.component.html',
  styleUrls: ['./conge-init.component.scss']
})
export class CongeInitComponent implements OnInit {

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
                url:this.connexion.base_url+"routes/list_users_conge",
                type:"GET"
            },
      columns: [{
        title: 'NOM&PRENOM',
        data: 'NAME'
      }, {
        title: 'MATRICULE',
        data: 'MATRICULE'
      },{
        title: 'DATE D\'EMBAUCHE',
        data: 'DATE_EMBAUCHE'
      },{
        title: 'NOMBRE DE JOURS INITIAL',
        data: 'SOLDE'
      }, {
        title: 'DATE CHANGEMENT',
        data: 'DATE_SOLDE'
      },{
        title: 'ACTION',
        data: 'ACTION'
      }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES UTILISATEURS ACTIFS'},
      ]
    };

    this.approot.progressBar=false;


      
    var self = this;

    $(document).on( 'click', '.getModif', function (event) {

      var id=$(this).attr('id')
      
        self.profile(id);
      

      event.stopImmediatePropagation();
     
  } );
  

  }
  profile(index?: any){

    this.router.navigate(['parametrage/conge_init/modif/'+index]);
  }

}
