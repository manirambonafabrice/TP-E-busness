// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ConnexionService } from '../../services/connexion.service';
import { InfoService } from '../../services/info.service';

import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SignaturePad } from 'angular2-signaturepad';
import { DefaultLayoutComponent } from '../../containers';
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
 @Injectable()
 export class CustomAdapter extends NgbDateAdapter<string> {
 
   readonly DELIMITER = '-';
 
   fromModel(value: string | null): NgbDateStruct | null {
     if (value) {
      //  console.log(value)
       const date = value.split(this.DELIMITER);
       var day = parseInt(date[2], 10)
       var month = parseInt(date[1], 10)
       var year = parseInt(date[0], 10)
       if (day<10) {
         
       }
       return {
         day : parseInt(date[2], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[0], 10)
       };
     }
     return null;
   }
 
   toModel(date: NgbDateStruct | null): string | null {
    //  return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
     return date ? (date.year + this.DELIMITER + (date.month<10 ? "0"+date.month:date.month) + this.DELIMITER + (date.day<10 ? "0"+date.day:date.day)) : null;
    // return "222"
   }
 }
 
 /**
  * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
  */
 @Injectable()
 export class CustomDateParserFormatter extends NgbDateParserFormatter {
 
   readonly DELIMITER = '/';
 
   parse(value: string): NgbDateStruct | null {
     if (value) {
       const date = value.split(this.DELIMITER);
       return {
         day : parseInt(date[0], 10),
         month : parseInt(date[1], 10),
         year : parseInt(date[2], 10)
       };
     }
     return null;
   }
 
   format(date: NgbDateStruct | null): string {
    var m=null
    var d=null
    if (date!=null) {
      if (date.month<10) {
         m="0"+date.month
      }
      
      if (date.day<10) {
         d="0"+date.day
      }
    }

     return date ? ((date.day<10 ? "0"+date.day:date.day) + this.DELIMITER + (date.month<10 ? "0"+date.month:date.month) + this.DELIMITER + date.year) : '';
    // return "555"
   }
 }

@Component({
  selector: 'app-detail-user',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
})
export class ProfileComponent implements OnInit {

  // SIGNATURE
  title = 'Angular signature example';
  signatureImg: string;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  width=340
  // this.width=document.getElementById('sign').clientWidth

  signaturePadOptions: Object = { 
    'minWidth': 0.5,
    'maxWidth': 0.5,
    'canvasWidth': 340,
    'canvasHeight': 200,
    'penColor': 'blue'
  };

  signature=""
  //

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  mySettings: IMultiSelectSettings = {
  
    dynamicTitleMaxItems:10,
      checkedStyle: 'fontawesome',
      // buttonClasses: 'btn btn-primary  dropdown-toggle',
      buttonClasses: 'btn btn-outline-primary',
     
  };
  myTexts: IMultiSelectTexts = {
    defaultTitle: 'Select'
  };
  
  myOptions: IMultiSelectOption[] = [];

  user:any=[{
CONNECTED:"",
DATE_CONNECT:"",
DATE_EMBAUCHE:"",
EMAIL:"",
FOTO:"",
ID:"",
ID_ADMIN:"",
ID_OU:"",
ID_POSTE:"",
ID_SERVICE:"",
INTERNE_EXTERNE:"",
MATRICULE:"",
NOM:"",
PRENOM:"",
PWD:"",
STATUT:"",
TELEPHONE:"",
USERNAME:"",
DESCRIPTION_POSTE:""


  }]
  url
  foto
  roles=''
  posteInfo: any = '';
  fonctionInfo: any[] =  [];
  serviceInfo: any = '';
  usernameold
  type_user
 

  posts;
  user_form=new FormGroup({
    nom:new FormControl('',Validators.required),
    prenom:new FormControl('',Validators.required),
    tel:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    username:new FormControl('',Validators.required),
    genre:new FormControl('',Validators.required),
    pwd:new FormControl(''),
    profil:new FormControl(''),
    service:new FormControl(''),
    poste:new FormControl(''),
    matricule:new FormControl('',[Validators.minLength(8), Validators.maxLength(8)]),
    date:new FormControl(null,Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')),
    foto:new FormControl('',Validators.required),
  })


  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent,
     private activatedRoute: ActivatedRoute,private connexion:ConnexionService) {  
     
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
    
    this.approot.progressBar=true;

    this.info_service.getOne(this.activatedRoute.snapshot.url[0].path).subscribe
    (res=>{

      // console.log(document.getElementById('sign').clientWidth)
      // console.log(res.pwd)

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        // console.log(res.user)
        this.user=res.user
        if(res.user[0].FOTO==null){
          this.foto=this.connexion.base_url+res.user[0].FOTO
        }else
        this.foto=this.connexion.base_url+((res.user[0].FOTO).replace("uploads/",""))

        if(res.user[0].SIGNATURE){
          this.signatureImg=this.connexion.base_url+((res.user[0].SIGNATURE).replace("uploads/",""))
        }

        this.croppedImage=this.foto
        sessionStorage.setItem("foto",this.foto);

        res.roles.forEach(val => {
          this.roles+=val['DESCRIPTION_ROLE']+", "
      });
      // console.log(this.roles)

    

      this.user_form.get("nom").setValue(res.user[0].NOM);
      this.user_form.get("prenom").setValue(res.user[0].PRENOM);
      this.user_form.get("tel").setValue(res.user[0].TELEPHONE);
      this.user_form.get("email").setValue(res.user[0].EMAIL);
      this.user_form.get("username").setValue(res.user[0].USERNAME);
      this.user_form.get("genre").setValue(res.user[0].GENRE);
      // this.user_form.get("username").setValue(res.user[0].USERNAME);
      this.user_form.get("matricule").setValue(res.user[0].MATRICULE);
      this.user_form.get("date").setValue(res.user[0].DATE_EMBAUCHE);
      // console.log(res.user[0].DATE_EMBAUCHE)
      this.user_form.get("pwd").setValue(res.pwd);
      this.user_form.controls['poste'].setValue(res.user[0].ID_POSTE)
      this.user_form.controls['service'].setValue(res.user[0].ID_SERVICE)
      this.usernameold=res.user[0].USERNAME
      this.type_user=res.user[0].IEXT

      // console.log(res.user[0].IEXT)
      var r=[]
      res.roles.forEach(val => {
          r.push(val['ID_ROLE'])
      });
      this.user_form.controls['profil'].setValue(r)

      this.fonctionInfo = res.fonctionInfo;
        this.serviceInfo = res.serviceInfo;
        this.posteInfo = res.posteInfo;
        
      }
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })

    
   
  }


  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    // console.log(event.target.files[0])
    
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    
}
imageLoaded(image: LoadedImage) {
    // show cropper
}
cropperReady() {
    // cropper ready
    // console.log('this.croppedImage')
}
loadImageFailed() {
    // show message
}

selectPoste(id): void {
  // console.log(id)
}

submit(){
   


   if(this.user_form.controls.nom.status=='VALID'&&
   this.user_form.controls.prenom.status=='VALID'&&
   this.user_form.controls.tel.status=='VALID'&&
   this.user_form.controls.email.status=='VALID'&&
   this.user_form.controls.username.status=='VALID'&&
   this.user_form.controls.pwd.status=='VALID'&&
   this.user_form.controls.profil.status=='VALID'&&
   this.user_form.controls.service.status=='VALID'&&
   this.user_form.controls.genre.status=='VALID'&&
   this.user_form.controls.matricule.status=='VALID'&&
   this.user_form.controls.poste.status=='VALID'){

    this.approot.progressBar=true;

    let formData = new FormData();

      formData.append("id",this.activatedRoute.snapshot.url[0].path)
      formData.append("nom",this.user_form.value.nom)
      formData.append("prenom",this.user_form.value.prenom)
      formData.append("tel",this.user_form.value.tel)
      formData.append("email",this.user_form.value.email)
      formData.append("username",this.user_form.value.username)
      formData.append("usernameold",this.usernameold)
      formData.append("pwd",this.user_form.value.pwd)
      formData.append("profil",JSON.stringify(this.user_form.value.profil))
      formData.append("service",this.user_form.value.service)
      formData.append("poste",this.user_form.value.poste)
      formData.append("date",this.user_form.value.date)
      formData.append("matricule",this.user_form.value.matricule)
      formData.append("genre",this.user_form.value.genre)
      formData.append("blob",this.croppedImage)
      formData.append("signature",this.signature)
   
    // console.log(this.activatedRoute.snapshot.url[0].path)
    this.info_service.updateUser(formData).subscribe
    (res=>{
 
      this.approot.progressBar=false;
      
      if(res.response=="non"){
        if (res.message=="exist") {alert("CE USERNAME EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
      }else{
       alert('MODIFICATION AVEC SUCCES') 

      //  console.log(res.foto)
      if(res.foto==null){
        this.foto=this.connexion.base_url+res.foto
      }else
       this.foto=this.connexion.base_url+((res.foto).replace("uploads/",""))

        sessionStorage.setItem("foto",this.foto);
    //    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //      this.router.navigate(['profile/'+this.activatedRoute.snapshot.url[0].path]);
    //  });
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })
   }else alert('ECHEC! VERIFIER BIEN VOS CHAMPS')
}





// SIGNATURE

ngAfterViewInit() {
  // this.signaturePad is now available
  this.signaturePad.set('minWidth', 0.5); 
  this.signaturePad.set('maxWidth', 0.5); 

  this.signaturePad.set('canvasWidth', 340); 
  this.signaturePad.set('canvasHeight', 200); 
  this.signaturePad.set('penColor', 'blue'); 
  this.signaturePad.clear(); 

  
}

drawComplete() {
  console.log(this.signaturePad.toDataURL());
  console.log('begin drawing');
}

drawStart() {
  console.log('begin drawing');
}

clearSignature() {
  this.signaturePad.clear();
}

savePad() {
  if (this.signaturePad.isEmpty()) {
    // console.log("Empty!");
alert("ECHEC! VEUILLEZ D'ABORD SIGNER")
  }else{
  const base64Data = this.signaturePad.toDataURL();
  this.signatureImg = base64Data;
  this.signature=base64Data
  }
}

refaire(){

  this.signatureImg =""
  this.signature=""


//   'minWidth': 0.5,
//   'maxWidth': 0.5,
// 'penColor': 'blue', 
  
//   'canvasWidth': document.getElementById('sign').clientWidth,
//   'canvasHeight': 200
}
}

