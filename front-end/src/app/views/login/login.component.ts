import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
// import { AppComponent } from 'src/app/app.component';
import { AuthentificationService } from '../../services/authentification.service';
import { ConnexionService } from '../../services/connexion.service';
import { InfoService } from '../../services/info.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 

  imageSrc="assets/logo.png"
  showPasswordOnPress: boolean=false;
  message="";
  probleme=false

  is_threre_users=true


 annee=new Date().getFullYear();
 auth_form=new FormGroup({
   username:new FormControl('',Validators.required),
   pwd:new FormControl('',Validators.required)
 })

 user_form=new FormGroup({
  user_name:new FormControl('',Validators.required),
  pwd:new FormControl('',Validators.required),
  nom:new FormControl('',Validators.required),
  prenom:new FormControl('',Validators.required),
  tel:new FormControl('',Validators.required),
  email:new FormControl('',[Validators.required,Validators.email]),
  pwd1:new FormControl('',Validators.required)
})
 noConnected:boolean=true

 constructor(private info_service:InfoService,private auth_service:AuthentificationService,private approot:AppComponent, private router: Router, private connexion:ConnexionService) { }

 ngOnInit(): void {

  this.auth_service.check_users_exist().subscribe
  (res=>{

    if(res.response=="non"){
      this.is_threre_users=false
    }else{
      this.is_threre_users=true
    }
    
  },
  error=>{
    console.log(error)
    
  })
 }
 submit(){
   this.approot.progressBar=true;

   this.auth_service.onAuth(this.auth_form).subscribe
   (res=>{
    //  console.log(res)
     this.probleme=false
     this.approot.progressBar=false;
     sessionStorage.setItem("usersession", JSON.stringify(res));
     sessionStorage.setItem('debut_session',""+new Date().getTime())

     if(res.response=="non"){
       this.noConnected=false;  
       this. auth_service.isAuth=false  
       if(res.message== "bloqué"){
        this.message="CETTE IDENTIFICATION A ETE BLOQUEE";
       }else  this.message="ECHEC ! VERIFIER VOTRE IDENTIFICATION"
     }else{
       if(res.data.FOTO){
      var foto=this.connexion.base_url+((res.data.FOTO).replace("uploads/",""))
       }else var foto=''
      sessionStorage.setItem("foto",foto);
      sessionStorage.setItem("tokenKey",res.tokenKey);

      // console.log(res.tokenKey)

              this.info_service.flux_dem_cong().subscribe
              (res=>{
          
                if(res.response=="non"){
                  alert('Problème de connexion au serveur')  
                }else{
                  
                  // console.log(res.data.state)
                  sessionStorage.setItem("flux",JSON.stringify(res.data.state));
                  
                  var url=sessionStorage.getItem('url_new');
                  // console.log(url)
                  if(url){
                    window.location.replace(url)
                    sessionStorage.removeItem('url_new');
                  }else{
                    this.router.navigate(['accueil']);
                  }
                  
                  // this.router.navigate(['accueil']);
                  this. auth_service.isAuth=true
              
                }
                
              },
              error=>{
                console.log(error)
          
              })
      
              this.info_service.service_ou_hierarchie().subscribe
              (res=>{
          
                if(res.response=="non"){
                  alert('Problème de connexion au serveur')  
                }else{
                  
                  console.log(res.data.state)
                  // console.log(res.array_link)
                  sessionStorage.setItem("service_ou_hierarchie",JSON.stringify(res.data.state));
                  // sessionStorage.setItem("array_node",JSON.stringify(res.array_node));
                  // sessionStorage.setItem("array_link",JSON.stringify(res.array_link));
                  
                  var url=sessionStorage.getItem('url_new');
                  console.log(url)
                  if(url){
                    window.location.replace(url)
                    sessionStorage.removeItem('url_new');
                  }else{
                    this.router.navigate(['accueil']);
                  }
                  
                  // this.router.navigate(['accueil']);
                  this. auth_service.isAuth=true
              
                }
                
              },
              error=>{
                console.log(error)
          
              })
     }
     
   },
   error=>{
     console.log(error)
     this.probleme=true
     this.approot.progressBar=false;
   })

  
 }


 submit_user_form(){

  if(this.user_form.controls.nom.status=='VALID'&&
  this.user_form.controls.prenom.status=='VALID'&&
  this.user_form.controls.tel.status=='VALID'&&
  this.user_form.controls.email.status=='VALID'&&
  this.user_form.controls.user_name.status=='VALID'&&
  this.user_form.controls.pwd.status=='VALID'&&
  this.user_form.controls.pwd1.status=='VALID'){

    if (this.user_form.value.pwd==this.user_form.value.pwd1) {
  

    let formData = new FormData();



    formData.append("nom",this.user_form.value.nom)
    formData.append("prenom",this.user_form.value.prenom)
    formData.append("tel",this.user_form.value.tel)
    formData.append("email",this.user_form.value.email)
    formData.append("username",this.user_form.value.user_name)
    formData.append("pwd",this.user_form.value.pwd)

  this.approot.progressBar=true;

  this.auth_service.insert_first_user(formData).subscribe
  (res=>{
    
    this.probleme=false
    this.approot.progressBar=false;
    sessionStorage.setItem("usersession", JSON.stringify(res));
    sessionStorage.setItem('debut_session',""+new Date().getTime())
   //  console.log(res.foto)
     var foto=""

    sessionStorage.setItem("foto",foto);

    if(res.response=="non"){
      this.noConnected=false;  
      this. auth_service.isAuth=false  
      if(res.message== "bloqué"){
       this.message="CETTE IDENTIFICATION A ETE BLOQUEE";
      }else  this.message="ECHEC ! VERIFIER VOTRE IDENTIFICATION"
    }else{
      // alert()
      this. auth_service.isAuth=true
     
     
      this.router.navigate(['accueil']);
    }
    
  },
  error=>{
    console.log(error)
    this.probleme=true
    this.approot.progressBar=false;
  })
}else{
  alert('VERIFIER LES MOTS DE PASSE NE SONT PAS CONFORMES')
   
}
}else{
  alert('VERIFIER BIEN VOS CHAMPS')
    // console.log(this.user_form.controls)
}
 
}
 focus(){
  
  document.getElementById("pwd").focus();
 }
}
