import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { InfoService } from '../../../services/info.service';
import { takeUntil, take } from 'rxjs/operators';
import { ConnexionService } from '../../../services/connexion.service';
import { DefaultLayoutComponent } from '../../../containers';

@Component({
  selector: 'app-ou',
  templateUrl: './ou.component.html',
  styleUrls: ['./ou.component.scss']
})
export class OuComponent implements OnInit {

  user_form=new FormGroup({
    nom:new FormControl('',Validators.required),
    nom1:new FormControl(''),
    id_ut:new FormControl(''), 
    filter:new FormControl(''), 
  })

  dtOptions_actif: any = {};
  utilisateurs: any = '';
  utilisateurs_filtre: any = '';



  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService ) 
  { 
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

    this.dtOptions_actif = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes/list_ou",
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
      columns: [{
        title: 'RAISON SOCIAL',
        data: 'RAISON'
      },{
        title: 'DESCRIPTION',
        data: 'NAME'
      },{
        title: 'ABREVIATION',
        data: 'ABRE'
      },{
        title: 'CHEF',
        data: 'CHEF'
      },{
        title: 'Actions',
        data: 'ACTION'
      }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES UNITES D\'ORGANISATION'},
      ]
    };
    var self = this;

    $(document).on( 'click', '.getDetailsOu', function (event) {
      

      var id=$(this).attr('id').split("-")

      if (id[0]=="mod") {
        self.modifier(id[1]);
      }
      if (id[0]=="supp") {
        // console.log(id)
        if(confirm("Voulez-vous vraiment Supprimer cet unité d'organisation?")){
          self.supprimer(id[1]);
        }
      }

      event.stopImmediatePropagation();
     
  } );


    this.info_service.getUtil().subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
    // console.log(res.users)
        this.utilisateurs=res.users
        this.utilisateurs_filtre=res.users
        
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })
  
  }

  submit(){
   
    // console.log(this.user_form.value.date)
    
        if(this.user_form.controls.nom.status=='VALID'&&
          this.user_form.controls.nom1.status=='VALID'){
    
          let formData = new FormData();
          // for(var i = 0; i < this.imageChangedEvent.target.files.length; i++) {
          //     formData.append("uploads[]", this.imageChangedEvent.target.files[i], this.imageChangedEvent.target.files[i].name);
          // }
    
    
          formData.append("nom",this.user_form.value.nom)
          formData.append("abreviation",this.user_form.value.nom1)
          formData.append("id_ut",this.user_form.value.id_ut)
         
         
          var str = JSON.stringify(this.user_form.value.profil);
    
          // console.log(str)
             this.info_service.addOu(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
         
         if(res.response=="non"){
           if (res.message=="exist") {alert("CETTE UNITE D'ORGANISATION EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
         }else{
          alert('ENREGISTREMENT AVEC SUCCES') 
        //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        //     this.router.navigate(['parametrage/ou/list_ou']);
        // });

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
    
        }else{
          alert('VERIFIER BIEN VOS CHAMPS')
            console.log(this.user_form.controls)
        }
      }


      modifier(id){
        this.router.navigate(['parametrage/ou/update/'+id]);
      }

      supprimer(id){
        this.approot.progressBar=true;
  
        this.info_service.delete_ou(id).subscribe
        (res=>{
          // console.log(res.response)
          this.approot.progressBar=false;
       
          if(res.response=="non"){
            alert('Problème de connexion au serveur')  
          }else{
            // alert('ENREGISTREMENT SUCCES') 
          //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          //     this.router.navigate(['parametrage/ou/list_ou']);
          // });
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

      onKey(value) {  

        // console.log(value)
        this.utilisateurs_filtre= []; 
        this.selectSearch(value);       
    }

    selectSearch(value:string){
      let filter = value.toLowerCase();
      for ( let i = 0 ; i < this.utilisateurs.length; i ++ ) {
          let option = this.utilisateurs[i];
          if (  option.NOM.toLowerCase().indexOf(filter) >= 0||option.PRENOM.toLowerCase().indexOf(filter) >= 0||option.TELEPHONE.toLowerCase().indexOf(filter) >= 0) {
              this.utilisateurs_filtre.push( option );
          }
      }
  }

  refresh(){
    this.utilisateurs_filtre= this.utilisateurs
  }
}
