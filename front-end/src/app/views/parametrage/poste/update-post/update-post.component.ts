import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { InfoService } from '../../../../services/info.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  user_form=new FormGroup({
    nom:new FormControl('',Validators.required),
    id_un:new FormControl('',Validators.required), 
    abr:new FormControl(''), 
    filter:new FormControl(''), 
  })

  dtOptions_actif: any = {};
  ou: any = '';
  ou_filtre: any = '';
  post_old



  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:AppComponent,private activatedRoute: ActivatedRoute ) 
  { 
    
    var url=window.location.href
    var path=url.split("#")
    let formData = new FormData();
  
    var array_url=path[1].split('/')
    var isnum = /^\d+$/.test(array_url[array_url.length-1]);
    if(!isnum){
      var path_url=path[1]
    }else{
      var path_url=path[1].replace(array_url[array_url.length-1],'')
    }

formData.append("url",path_url)
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


    this.info_service.getOU().subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
    // console.log(res.users)
        this.ou=res.ou
        this.ou_filtre=res.ou
        
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })


    this.info_service.getOne_poste(this.activatedRoute.snapshot.url[1].path).subscribe
    (res=>{

      // console.log(res)
      // console.log(res.pwd)

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        // console.log(res)

      this.user_form.get("nom").setValue(res.posteInfo[0].DESCRIPTION_POSTE);
      this.user_form.get("id_un").setValue(res.posteInfo[0].ID_SERVICE);
      this.user_form.get("abr").setValue(res.posteInfo[0].ABREVIATION_POSTE);
      this.post_old=res.posteInfo[0].DESCRIPTION_POSTE
      // this.usernameold=res.user[0].USERNAME
      // this.type_user=res.user[0].IEXT


        
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
          this.user_form.controls.id_un.status=='VALID'){
    
          let formData = new FormData();
          // for(var i = 0; i < this.imageChangedEvent.target.files.length; i++) {
          //     formData.append("uploads[]", this.imageChangedEvent.target.files[i], this.imageChangedEvent.target.files[i].name);
          // }
    
          formData.append("id",this.activatedRoute.snapshot.url[1].path)
          formData.append("nom",this.user_form.value.nom)
          formData.append("abr",this.user_form.value.abr)
          formData.append("id_un",this.user_form.value.id_un)
          formData.append("post_old",this.post_old)
          
         
          var str = JSON.stringify(this.user_form.value.profil);
    
          // console.log(str)
             this.info_service.updatePost(formData).subscribe
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


      onKey(value) { 

        // console.log(value)
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
