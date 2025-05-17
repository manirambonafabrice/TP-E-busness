import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {

  user_form=new FormGroup({
    nom:new FormControl('',Validators.required),
    id_un:new FormControl('',Validators.required), 
    abr:new FormControl('',Validators.required), 
    filter:new FormControl(''), 
  })

  dtOptions_actif: any = {};
  ou: any = '';
  ou_filtre: any = '';



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
                url:this.connexion.base_url+"routes/list_post",
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
      columns: [{
        title: 'RAISON SOCIAL',
        data: 'RAISON'
      },{
        title: 'POSTE',
        data: 'NAME'
      },{
        title: 'ABREVIATION',
        data: 'ABR'
      },{
        title: 'UNITE D\'ORGANISATION',
        data: 'OU'
      }
      // ,{
      //   title: 'CHEF',
      //   data: 'CHEF'
      // }
      ,{
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

    $(document).on( 'click', '.getDetailsPost', function (event) {

      var id=$(this).attr('id').split("-")
      if (id[0]=="mod") {
        self.modifier(id[1]);
      }
      if (id[0]=="supp") {
        if(confirm("Voulez-vous vraiment Supprimer cet unité d'organisation?")){
          self.supprimer(id[1]);
        }
      }

      event.stopImmediatePropagation();
     
  } );


    this.info_service.getOU().subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
        console.log(res)
      }else{
    // console.log(res.ou)
        this.ou=res.ou
        this.ou_filtre=res.ou
        
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
          this.user_form.controls.abr.status=='VALID'&&
          this.user_form.controls.id_un.status=='VALID'){
    
          let formData = new FormData();
          // for(var i = 0; i < this.imageChangedEvent.target.files.length; i++) {
          //     formData.append("uploads[]", this.imageChangedEvent.target.files[i], this.imageChangedEvent.target.files[i].name);
          // }
    
    
          formData.append("nom",this.user_form.value.nom)
          formData.append("id_un",this.user_form.value.id_un)
          formData.append("abr",this.user_form.value.abr)
         
         
          var str = JSON.stringify(this.user_form.value.profil);
    
          // console.log(str)
             this.info_service.addPost(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
         
         if(res.response=="non"){
           if (res.message=="exist") {alert("CE POSTE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
         }else{
          alert('ENREGISTREMENT AVEC SUCCES') 
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['parametrage/poste']);
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
        this.router.navigate(['parametrage/poste/update/'+id]);
      }

      supprimer(id){
        console.log(id)
        this.approot.progressBar=true;
  
        this.info_service.delete_poste(id).subscribe
        (res=>{
          // console.log(res.response)
          this.approot.progressBar=false;
       
          if(res.response=="non"){
            alert('Problème de connexion au serveur')  
          }else{
            // alert('ENREGISTREMENT SUCCES') 
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['parametrage/poste']);
          });
      
          }
          
        },
        error=>{
          console.log(error)
          
          this.approot.progressBar=false;
        })
      
      }

      onKey(value) { 

        // console.log(this.ou_filtre)
        this.ou_filtre= []; 
        this.selectSearch(value);       
    }

    selectSearch(value:string){
      let filter = value.toLowerCase();
      for ( let i = 0 ; i < this.ou.length; i ++ ) {
          let option = this.ou[i];
          if (  option.DESCRIPTION.toLowerCase().indexOf(filter) >= 0) {
              this.ou_filtre.push( option );
          }
      }
  }

  refresh(){
    this.ou_filtre= this.ou
  }
}
