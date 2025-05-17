import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { DefaultLayoutComponent } from '../../../../containers';
import { InfoService } from '../../../../services/info.service';

@Component({
  selector: 'app-update-ou',
  templateUrl: './update-ou.component.html',
  styleUrls: ['./update-ou.component.scss']
})
export class UpdateOuComponent implements OnInit {

  user_form=new FormGroup({
    nom:new FormControl('',Validators.required),
    nom1:new FormControl(''),
    id_ut:new FormControl(''),
    filter:new FormControl(''), 
    
  })

  dtOptions_actif: any = {};
  utilisateurs: any = '';
  utilisateurs_filtre
  ou_old

  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent,private activatedRoute: ActivatedRoute, ) 
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


    this.info_service.getOne_ou(this.activatedRoute.snapshot.url[1].path).subscribe
    (res=>{

      // console.log(res)
      // console.log(res.pwd)

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        // console.log(res)

      this.user_form.get("nom").setValue(res.ouInfo[0].DESCRIPTION);
      this.user_form.get("nom1").setValue(res.ouInfo[0].ABREVIATION);
      this.user_form.get("id_ut").setValue(res.ouInfo[0].ID_UT_CHEF);
      this.ou_old=res.ouInfo[0].DESCRIPTION
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
          this.user_form.controls.nom1.status=='VALID'){
    
          let formData = new FormData();
          // for(var i = 0; i < this.imageChangedEvent.target.files.length; i++) {
          //     formData.append("uploads[]", this.imageChangedEvent.target.files[i], this.imageChangedEvent.target.files[i].name);
          // }
    
          formData.append("id",this.activatedRoute.snapshot.url[1].path)
          formData.append("nom",this.user_form.value.nom)
          formData.append("nom_old",this.ou_old)
          formData.append("abreviation",this.user_form.value.nom1)
          formData.append("id_ut",this.user_form.value.id_ut)
         
         
          var str = JSON.stringify(this.user_form.value.profil);
    
          // console.log(str)
             this.info_service.UpdateOu(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
         
         if(res.response=="non"){
           if (res.message=="exist") {alert("CETTE UNITE D'ORGANISATION EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
         }else{
          alert('ENREGISTREMENT AVEC SUCCES') 
          
            this.router.navigate(['parametrage/ou/list_ou']);
      
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
