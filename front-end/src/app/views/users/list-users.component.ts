import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { InfoService } from '../../services/info.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ConnexionService } from '../../services/connexion.service';
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
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
  
})

export class ListUsersComponent implements OnInit {


  raisonInfo: any = '';
  fonctionInfo: any = '';
  serviceInfo: any = '';
  posteInfo: any = '';
  post1_is_filled=false

  tab=false

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

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  posteInfo_filtre: any = '';


  dtOptions_actif: any = {};
  dtOptions_bloque: any = {};
  id_raison=JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON

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
  


  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService ) 
  { 

// //FIN CONTROLE PERMISSION
this.approot.progressBar=true;

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
    


    this.info_service.inputFill().subscribe
    (res=>{

      // console.log(res)

      if(res.response=="non"){
        
      }else{
        this.myOptions = res.fonctionInfo;
        // console.log(res.fonctionInfo)
        
        this.fonctionInfo = res.fonctionInfo1;
        this.serviceInfo = res.serviceInfo;
        this.posteInfo = res.posteInfo;
        this.posteInfo_filtre= res.posteInfo;
        this.raisonInfo= res.raisons;
        this.user_form.get("id_raison").setValue(JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON);

         this.approot.progressBar=false;
      }

      
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })



    this.dtOptions_actif = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes/users_actifs",
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
      columns: [{
        title: 'RAISON SOCIAL',
        data: 'RAISON'
      },{
        title: 'NOM&PRENOM',
        data: 'NAME'
      }, {
        title: 'MATRICULE',
        data: 'MATRICULE'
      }, {
        title: 'DATE D\'EMBAUCHE',
        data: 'DATE_EMBAUCHE'
      },{
        title: 'POSTE',
        data: 'POSTE'
      },{
        title: 'UNITE D\ORGANISATION',
        data: 'UD'
      }, {
        title: 'TYPE',
        data: 'TYPE'
      },  {
        title: 'TELEPHONE',
        data: 'TEL'
      }, {
        title: 'EMAIL',
        data: 'EMAIL'
      }, {
        title: 'USERNAME',
        data: 'USERNAME'
      }, {
        title: 'ROLES',
        data: 'ROLES'
      }, {
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

    this.dtOptions_bloque = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes/users_bloques",
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
      columns: [
        {
          title: 'RAISON SOCIAL',
          data: 'RAISON'
        },{
        title: 'NOM&PRENOM',
        data: 'NAME'
      }, {
        title: 'MATRICULE',
        data: 'MATRICULE'
      }, {
        title: 'DATE D\'EMBAUCHE',
        data: 'DATE_EMBAUCHE'
      }, {
        title: 'POSTE',
        data: 'POSTE'
      },{
        title: 'UNITE D\ORGANISATION',
        data: 'UD'
      }, {
        title: 'TYPE',
        data: 'TYPE'
      },  {
        title: 'TELEPHONE',
        data: 'TEL'
      }, {
        title: 'EMAIL',
        data: 'EMAIL'
      }, {
        title: 'USERNAME',
        data: 'USERNAME'
      }, {
        title: 'ROLES',
        data: 'ROLES'
      }, {
        title: 'ACTION',
        data: 'ACTION'
      }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES UTILISATEURS BLOQUES'},
      ]
    };
    
  
    var self = this;

    $(document).on( 'click', '.getDetails', function (event) {

      var id=$(this).attr('id').split("-")
      if (id[0]=="detail") {
        self.profile(id[1]);
      }
      if (id[0]=="bloque") {
        if(confirm("Voulez-vous vraiment bloqué cet utilisateur?")){
          self.bloquer(id[1]);
        }
      }

      if (id[0]=="debloque") {
        if(confirm("Voulez-vous vraiment déboquer cet utilisateur?")){
           self.debloquer(id[1]);
        }
      }
      event.stopImmediatePropagation();
     
  } );
  }

  responsive_tb1(){
    // alert();
    this.tab=true

  }

  profile(index?: any){

    this.router.navigate(['users/detail/'+index]);
  }
  bloquer(id){
    this.approot.progressBar=true;
  
    this.info_service.bloquer_user(id).subscribe
    (res=>{
      // console.log(res.response)
      this.approot.progressBar=false;
   
      if(res.response=="non"){
        alert('Problème de connexion au serveur')  
      }else{
        alert('ENREGISTREMENT SUCCES') 
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['users']);
      });
  
      }
      
    },
    error=>{
      console.log(error)
      
      this.approot.progressBar=false;
    })
  
  }
  debloquer(id){
    this.approot.progressBar=true;
  
    this.info_service.debloquer_user(id).subscribe
    (res=>{
      console.log(res.response)
      this.approot.progressBar=false;
   
      if(res.response=="non"){
        alert('Problème de connexion au serveur')  
      }else{
        // alert('ENREGISTREMENT SUCCES') 
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['users']);
      });
  
      }
      
    },
    error=>{
      console.log(error)
      
      this.approot.progressBar=false;
    })
  
  }

  onDropDownChangeChange(value: string) {
    
}

charger_AD(){
  this.approot.progressBar=true;

  this.info_service.chager_AD().subscribe
  (res=>{
    // console.log(res.response)
    this.approot.progressBar=false;
 
    if(res.response=="non"){
      alert('Problème de connexion au serveur')  
    }else{
      alert('CHARGEMENT AVEC SUCCES') 
    //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['users/list_users']);
    // });

    }
    
  },
  error=>{
    console.log(error)
    
    this.approot.progressBar=false;
  })

}

selectPoste1(): void {
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
   
// console.log(this.user_form.controls.service.status)

 
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

   formData.append("nom",this.user_form.value.nom)
   formData.append("prenom",this.user_form.value.prenom)
   formData.append("tel",this.user_form.value.tel)
   formData.append("email",this.user_form.value.email)
   formData.append("username",this.user_form.value.username)
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
     
      var str = JSON.stringify(this.user_form.value.profil);

      // console.log(str)
         this.info_service.addUser(formData).subscribe
   (res=>{

     this.approot.progressBar=false;
     
     if(res.response=="non"){
       if (res.message=="exist") {alert("CE USERNAME EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
     }else{
      alert('ENREGISTREMENT AVEC SUCCES') 
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['users/list_users']);
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

    
    selectFonction(): void {

      console.log(this.user_form.controls['profil'].value)
      if (this.user_form.controls['profil'].value=="0") {
        document.getElementById("profil1").style.display = "";
        document.getElementById("profil1").focus();
      }else{
        
        this.user_form.get("profil1").setValue("");
        document.getElementById("profil1").style.display = "none";
      }     
    }

    selectservice(): void {
      if (this.user_form.controls['service'].value=="0") {
        document.getElementById("service1").style.display = "";
        // document.getElementById("service1").focus();
        
      }else{
        this.user_form.get("poste").setValue('');
        this.user_form.get("service1").setValue("");
        document.getElementById("service1").style.display = "none";
      }     
    }

    selectPoste(): void {
      if (this.user_form.controls['poste'].value=="0") {
        document.getElementById("poste1").style.display = "";
        document.getElementById("poste1").focus();
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
        this.user_form.get("poste1").setValue("");
        document.getElementById("poste1").style.display = "none";
      }     
    }

    onChange() {
      // console.log(this.user_form.value.profil);
    }

    effacer_date(){
     
      this.user_form.get("date").setValue(null);
    }


    keyup_post(){
      // alert()
      if (this.user_form.value.poste1) {
        this.post1_is_filled=true
  
        this.user_form.controls["service"].setValidators(Validators.required);
        // this.user_form.controls.service.updateValueAndValidity();
        this.user_form.controls['service'].updateValueAndValidity()
      }else{
        // alert()
        this.post1_is_filled=false
        this.user_form.controls["service"].setValidators(null);
        this.user_form.controls['service'].updateValueAndValidity()
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
    
