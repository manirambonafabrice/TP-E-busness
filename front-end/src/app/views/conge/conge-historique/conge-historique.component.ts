import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-conge-historique',
  templateUrl: './conge-historique.component.html',
  styleUrls: ['./conge-historique.component.scss']
})
export class CongeHistoriqueComponent implements OnInit {

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
                url:this.connexion.base_url+"routes/historique_de_mes_conges/"+JSON.parse(sessionStorage.getItem("usersession")).data.ID,
                type:"GET"
            },
      columns: [{
        title: 'DATE DE DEMANDE',
        data: 'DATE_CREATION'
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
        {extend: 'excel', title: 'LISTE DES UTILISATEURS ACTIFS'},
      ]
    };

    this.approot.progressBar=false;


      
    var self = this;

    $(document).on( 'click', '.getModif_conge', function (event) {

      var id=$(this).attr('id')
      
        self.detail(id);
      

      event.stopImmediatePropagation();
     
  } );

  $(document).on( 'click', '.getModif_conge1', function (event) {

    

    var id=$(this).attr('id')
    
    var id_part=id.split("|")

    if (id_part[0]=='mod') {
     
      self.modifier(id_part[1])
    } else if (id_part[0]=='supp'){
      if(confirm("Voulez-vous vraiment Supprimer cette demande?")){
        self.supprimer(id_part[1]);
      }
      
    }

    

    event.stopImmediatePropagation();
   
} );
  

  }
  detail(index?: any){

    this.router.navigate(['conge/detail/'+index]);
  }

  modifier(index?: any){
    
    this.router.navigate(['conge/modifier/'+index]);
  }


  supprimer(id){
    this.approot.progressBar=true;

    this.info_service.delete_conge_demande(id).subscribe
    (res=>{
      // console.log(res.response)
      this.approot.progressBar=false;
   
      if(res.response=="non"){
        alert('Problème de connexion au serveur')  
      }else{
 
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          console.log(currentUrl);
      });
  
      }
      
    },
    error=>{
      console.log(error)
      
      this.approot.progressBar=false;
    })
  
  }
}
