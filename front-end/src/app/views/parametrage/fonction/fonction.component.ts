import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit {

  role
  urls
  id_role=1
  nom_role="SUPER ADMIN"
  ses_url=[]
  id_raison=JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON
  task = {
    name: 'Cocher Tout',
    completed: false,
    color: 'primary',
    subtasks: [
      
    ],
  };
 


  user_form=new FormGroup({
    nom:new FormControl('',Validators.required),
    urls:new FormControl('')
  })
  
  user_form1=new FormGroup({
    nom1:new FormControl('',Validators.required),
    

  })


  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent,private activatedRoute: ActivatedRoute ) 
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

    
    this.info_service.get_roles().subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
    // console.log(window.location.href)
    
    this.role=res.role
    this.urls=res.urls

    this.task.subtasks=res.urls
  
    //  this.router.url;
  // console.log(res.role);
  // console.log(res.urls);
  this.get_urls(this.id_role)
  
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })
  }



  submit(){
   
    // console.log(this.user_form.value.date)
    
        if(this.user_form.controls.nom.status=='VALID'){
    
          let formData = new FormData();
          // for(var i = 0; i < this.imageChangedEvent.target.files.length; i++) {
          //     formData.append("uploads[]", this.imageChangedEvent.target.files[i], this.imageChangedEvent.target.files[i].name);
          // }
    
    
          formData.append("nom",this.user_form.value.nom)
        

             this.info_service.addRole(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
         
         if(res.response=="non"){
           if (res.message=="exist") {alert("CE ROLE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
         }else{
          alert('ENREGISTREMENT AVEC SUCCES') 
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['parametrage/roles']);
        });
         }
         
       },
       error=>{
         console.log(error)
         this.approot.progressBar=false;
       })
    
        }else{
          alert('VERIFIER BIEN VOS CHAMPS')
            
        }
      }



      submit_modification(){
   
        // console.log(this.user_form.value.date)
        
            if(this.user_form1.controls.nom1.status=='VALID'){
              this.approot.progressBar=true;
        
              let formData = new FormData();
              // for(var i = 0; i < this.imageChangedEvent.target.files.length; i++) {
              //     formData.append("uploads[]", this.imageChangedEvent.target.files[i], this.imageChangedEvent.target.files[i].name);
              // }
        
        
              formData.append("nom",this.user_form1.value.nom1)
              formData.append("nom_old",this.nom_role)
              formData.append("id",""+this.id_role)
            
    
                 this.info_service.updateRole(formData).subscribe
           (res=>{
        
             this.approot.progressBar=false;
             
             if(res.response=="non"){
               if (res.message=="exist") {alert("CE ROLE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
             }else{
              alert('MODIFICATION AVEC SUCCES') 
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['parametrage/roles']);
            });
             }
             
           },
           error=>{
             console.log(error)
             this.approot.progressBar=false;
           })
        
            }else{
              alert('VERIFIER BIEN VOS CHAMPS')
                
            }
          }
      handleChange(id,nom){
// alert(id)

this.id_role=id
this.user_form1.get("nom1").setValue(nom);
this.nom_role=nom
this.get_urls(id)

      }

get_urls(id){
        
  this.approot.progressBar=true;

  this.info_service.get_url_role(id).subscribe
  (res=>{
    this.approot.progressBar=false;
    if(res.response=="non"){
      alert("PROBLEME DE SERVEUR")
    }else{
      // console.log(res.urls)
      // console.log(id)
      this.ses_url=res.urls
      // console.log(res.urls);
      this.task.subtasks.forEach(val => {
        
        if(this.ses_url.includes(val.ID_URL)){
          val.completed = true;
        }else val.completed = false;
        
    });
    }
    
  },
  error=>{
    console.log(error)
    this.approot.progressBar=false;
  })

}


      supprime_role(){
        this.approot.progressBar=true;
  
        this.info_service.delete_role(this.id_role).subscribe
        (res=>{
          // console.log(res.response)
          this.approot.progressBar=false;
       
          if(res.response=="non"){
            alert('Problème de connexion au serveur')  
          }else{
            alert('SUPPRESSION AVEC SUCCES') 
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['parametrage/roles']);
          });
      
          }
          
        },
        error=>{
          console.log(error)
          
          this.approot.progressBar=false;
        })
 
      }

      saves_permissions(){

                  this.approot.progressBar=true;
            
                  let formData = new FormData();

            
                  formData.append("id_role",""+this.id_role)
                  formData.append("urls",JSON.stringify(this.task.subtasks))

                  // console.log(this.task.subtasks)
                
        
                     this.info_service.saves_permissions(formData).subscribe
               (res=>{
            
                 this.approot.progressBar=false;
                 
                 if(res.response=="non"){
                   if (res.message=="exist") {alert("CE ROLE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
                 }else{
                  alert('ENREGISTREMENT AVEC SUCCES') 

                  // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                  //   this.router.navigate(['parametrage/roles']);

                  // });

                 }
                 
               },
               error=>{
                 console.log(error)
                 this.approot.progressBar=false;
               })
            

      }



//MAT-CHECK-BOX
      allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

}
