import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';

import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { AppComponent } from '../../../../app.component';
import { DefaultLayoutComponent } from '../../../../containers';
import { ConnexionService } from '../../../../services/connexion.service';
import { InfoService } from '../../../../services/info.service';

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
  selector: 'app-conge-init-modif',
  templateUrl: './conge-init-modif.component.html',
  styleUrls: ['./conge-init-modif.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
})
export class CongeInitModifComponent implements OnInit {


    
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
    nombre:new FormControl('',Validators.required),
    matricule:new FormControl('',Validators.required),
    date:new FormControl(null,Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')),
  
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

  //  console.log(JSON.parse(sessionStorage.getItem("usersession")).data.ID)
    
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

   

    res.roles.forEach(val => {
      this.roles+=val['DESCRIPTION_ROLE']+", "
  });
  // console.log(this.roles)

  // this.user_form.get("username").setValue(res.user[0].USERNAME);
  this.user_form.get("matricule").setValue(res.user[0].MATRICULE);
  this.user_form.get("date").setValue(res.user[0].DATE_EMBAUCHE);
  this.user_form.get("nombre").setValue(res.user[0].SOLDE_CONGE_INITIAL);
  // console.log(res.user[0].DATE_EMBAUCHE)
  // this.user_form.get("pwd").setValue(res.pwd);
  // this.user_form.controls['poste'].setValue(res.user[0].ID_POSTE)
  // this.user_form.controls['service'].setValue(res.user[0].ID_SERVICE)
  // this.usernameold=res.user[0].USERNAME
  // this.type_user=res.user[0].IEXT

  // console.log(res.user[0].IEXT)
  var r=[]
  res.roles.forEach(val => {
      r.push(val['ID_ROLE'])
  });
  // this.user_form.controls['profil'].setValue(r)

  this.fonctionInfo = res.fonctionInfo;
    this.serviceInfo = res.serviceInfo;
    this.posteInfo = res.posteInfo;
    this.posteInfo_filtre= res.posteInfo;
    
  }
  
},
error=>{
  console.log(error)
  this.approot.progressBar=false;
})
  }



  submit(){
    this.approot.progressBar=true;
  
  
     if(this.user_form.controls.matricule.status=='VALID'&&
     this.user_form.controls.nombre.status=='VALID'&&
     this.user_form.controls.date.status=='VALID'){
      // console.log(this.user_form.controls)
      let formData = new FormData();
  
      formData.append("id",this.activatedRoute.snapshot.url[1].path)
        formData.append("nombre",this.user_form.value.nombre)
        formData.append("date",this.user_form.value.date)
        formData.append("matricule",this.user_form.value.matricule)
        formData.append("USER_ID",JSON.parse(sessionStorage.getItem("usersession")).data.ID)
        

      this.info_service.conge_init(formData).subscribe
      (res=>{
     
        this.approot.progressBar=false;
        
        if(res.response=="non"){
          if (res.message=="mois_minimum>mois_travail") {
            alert("ECHEC! CETTE EMPLOYE N'A PAS ENCORE DROITS AUX CONGES ANNUELLES")
           }else if (res.message=="demande>total") {
            alert("ECHEC! LE NOMBRE DE JOUR INITIAL MENTIONNE EST SUPERIEUR AU NOMBRE DE JOUR TOTAL, CE QUI N'EST PAS LOGIQUE. VEUILLEZ CONSULTER LES PARAMETRAGES DES DROITS AUX CONGES")
           }else {
             alert("PROBLEME SERVEUR")
            }
        }else{
         alert('MODIFICATION AVEC SUCCES') 
      //    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      //      this.router.navigate(['users/list_users/'+this.activatedRoute.snapshot.url[0].path]);
      //  });
      this.router.navigate(['parametrage/conge_init']);
        }
        
      },
      error=>{
        console.log(error)
        this.approot.progressBar=false;
      })
     }
  }

}
