import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';

import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DefaultLayoutComponent } from '../../../containers';
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
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
})
export class DetailUserComponent implements OnInit {

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
  raisonInfo: any = '';
  
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
  posteInfo_filtre: any = '';
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
    id_raison:new FormControl('',Validators.required),
    filter:new FormControl(''), 
  })
  id_raison=JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON

  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent,
     private activatedRoute: ActivatedRoute,private connexion:ConnexionService) {  

          // CONTROLE PERMISSION



//FIN CONTROLE PERMISSION

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
    
// console.log(this.activatedRoute.snapshot.url[1].path)
    this.info_service.getOne(this.activatedRoute.snapshot.url[1].path).subscribe
    (res=>{

      // console.log(res)
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

        this.croppedImage=this.foto

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
      this.user_form.get("id_raison").setValue(res.user[0].ID_RAISON);
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
        this.posteInfo_filtre= res.posteInfo;
        this.raisonInfo= res.raisons;
        
        
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

selectPoste(): void {
      if (this.user_form.controls['poste'].value=="0") {
        // document.getElementById("poste1").style.display = "";
        // document.getElementById("poste1").focus();
      }else{
    var id
    this.user_form.get("service").setValue('');
        if(this.user_form.controls['poste'].value){
          id=this.user_form.controls['poste'].value
        }else  id=0
        

        this.info_service.select_his_ou(id).subscribe
        (res=>{

          if(res.response=="non"){
          
          }else{
          //  console.log(res) 
            this.user_form.get("service").setValue(res.ouInfo[0].ID_SERVICE);
          }
          
        },
        error=>{
          console.log(error)
          this.approot.progressBar=false;
        })
        
      
      }     
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
   this.user_form.controls.poste.status=='VALID'&&
   this.user_form.controls.matricule.status=='VALID'&&
   this.user_form.controls.id_raison.status=='VALID'&&
   this.user_form.controls.genre.status=='VALID'){
    this.approot.progressBar=true;
    // console.log(this.user_form.value.date)
    let formData = new FormData();

      formData.append("id",this.activatedRoute.snapshot.url[1].path)
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
      formData.append("id_raison",this.user_form.value.id_raison)
      formData.append("blob",this.croppedImage)
      formData.append("signature","")

      
      
  
    // console.log(this.activatedRoute.snapshot.url[0].path)
    this.info_service.updateUser(formData).subscribe
    (res=>{
   
      this.approot.progressBar=false;
      
      if(res.response=="non"){
        if (res.message=="exist") {alert("CE USERNAME EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
      }else{
       alert('MODIFICATION AVEC SUCCES') 
    //    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
         this.router.navigate(['users/list_users']);
    //  });
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })
   }
}



onKey(value) { 

  // console.log(value)
  this.posteInfo_filtre= []; 
  this.selectSearch(value);       
}

selectSearch(value:string){
  // console.log(value)
let filter = value.toLowerCase();
for ( let i = 0 ; i < this.posteInfo.length; i ++ ) {
    let option = this.posteInfo[i];
    
    if (  option.DESCRIPTION_POSTE.toLowerCase().indexOf(filter)>= 0 ) {
     
        this.posteInfo_filtre.push( option );
    }
}
}

refresh(){
this.posteInfo_filtre= this.posteInfo
}
}
