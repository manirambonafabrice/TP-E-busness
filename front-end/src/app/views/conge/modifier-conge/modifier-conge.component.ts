import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { InfoService } from '../../../services/info.service';





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
  selector: 'app-modifier-conge',
  templateUrl: './modifier-conge.component.html',
  styleUrls: ['./modifier-conge.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
})
export class ModifierCongeComponent implements OnInit {

  this_year=new Date().getFullYear();
  new_date=new Date()
  this_date=("0" + (this.new_date.getDate())).slice(-2)+"/"+("0" + (this.new_date.getMonth()+1)).slice(-2)+"/"+this.new_date.getFullYear()
  next_year=new Date().getFullYear()+1;
  myOptions: IMultiSelectOption[] = [];
  array_anne = [];

  signatureImg=""
  non_faute=false
  date_engagement


  displayedColumns: string[] = [ 'EXERCICE', 'SOLDE'];
  dataSource = [
    {}
  ];
 
  

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
  congeInfo: any = '';
  congeInfo_filtre: any = '';
  fonctionInfo: any[] =  [];
  serviceInfo: any = '';
  usernameold
  type_user
 

  posts;
  user_form=new FormGroup({
    adresse:new FormControl('',Validators.required),
    nombre:new FormControl('',Validators.required),
    type_conge:new FormControl('',Validators.required),
    matricule:new FormControl('',Validators.required),
    exercice:new FormControl('',Validators.required),
    date:new FormControl(null,Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')),
    date1:new FormControl(null,Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')),
    date2:new FormControl(null,Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')),
    filter:new FormControl(''), 
    motif:new FormControl('',Validators.required), 
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
    // console.log(this.activatedRoute.snapshot.url[1].path)
    //  console.log(JSON.parse(sessionStorage.getItem("usersession")).data)
    this.info_service.getConge(this.activatedRoute.snapshot.url[1].path).subscribe
    (res=>{
    
      // console.log(res)
      // console.log(res.pwd)
    
      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{

        // this.this_date=res.ce_conge[0].DATE_CREATION
        // console.log(res.ce_conge[0].DATE_DEBUT)
        this.user_form.get("adresse").setValue(res.ce_conge[0].ADRESSE_CONGE);
        this.user_form.get("nombre").setValue(res.ce_conge[0].DUREE);
        this.user_form.get("type_conge").setValue(res.ce_conge[0].ID_TYPE_CONGE);
        // this.user_form.get("matricule").setValue(res.ce_conge[0].NOM);
        this.user_form.get("exercice").setValue(res.ce_conge[0].EXERCICES);
        // this.user_form.get("date").setValue(res.ce_conge[0].DATE_DEBUT);
        this.user_form.get("date").setValue(res.ce_conge[0].DATE_DEBUT);
        this.user_form.get("date1").setValue(res.ce_conge[0].DATE_FIN);
        this.user_form.get("date2").setValue(res.ce_conge[0].DATE_RETOUR);
        // this.user_form.get("filter").setValue(res.ce_conge[0].NOM);
        this.user_form.get("motif").setValue(res.ce_conge[0].MOTIF);
       
   
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })



  // console.log(this.activatedRoute.snapshot.url[1].path)
  this.info_service.getOne(JSON.parse(sessionStorage.getItem("usersession")).data.ID).subscribe
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
  
      if(res.user[0].SIGNATURE){
        this.signatureImg=this.connexion.base_url+((res.user[0].SIGNATURE).replace("uploads/",""))
      }

  
      res.roles.forEach(val => {
        this.roles+=val['DESCRIPTION_ROLE']+", "
    });
    // console.log(this.roles)

    var r=[]
    res.roles.forEach(val => {
        r.push(val['ID_ROLE'])
    });
    // this.user_form.controls['profil'].setValue(r)
  
    this.fonctionInfo = res.fonctionInfo;
      this.serviceInfo = res.serviceInfo;

      var date_ambauche=new Date(res.user[0].DATE_EMBAUCHE);
      this.date_engagement=  ("0" + (date_ambauche.getDate())).slice(-2)+"/"+("0" + (date_ambauche.getMonth()+1)).slice(-2)+"/"+date_ambauche.getFullYear()


      var anne_ambauche=new Date(res.user[0].DATE_EMBAUCHE).getFullYear();
      var new_this_year=this.this_year+1
      for (var i = anne_ambauche; i <= new_this_year; i++) {
       
        this.array_anne.push(i)
        
      }
     
 
    }
    
  },
  error=>{
    console.log(error)
    this.approot.progressBar=false;
  })

  this.info_service.getSoldeConge(JSON.parse(sessionStorage.getItem("usersession")).data.ID).subscribe
  (res=>{

    if(res.response=="non"){
      // console.log(res.message)
      if(res.message=='no_solde_param'){
        alert("VOTRE SOLDE DE CONGE N'EST PAS ENCORE CONFIGURE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME")
      }else
      if(res.message=='no_date_embauche'){
        alert("VOTRE DATE D'EMBAUCHE N'EST PAS ENCORE REMPLIE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME")
      }else
      if(res.message=='no_signature'){
        alert("ECHEC! VEUILLEZ D'ABORD REMPLIR TA SIGNATURE SUR TON PROFIL")
      }else
      if(res.message=='no_poste'){
        alert("ECHEC! VOUS N'ETES PAS ENCORE AFFECTER A UN POSTE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME")
      }else
      if(res.message=='no_droit_cetteanne'){
        alert("ECHEC! A CETTE ANNEE D'EXERCICE VOUS N'AVEZ PAS ENCORE DROIT AU CONGE ANNUEL")
      }else
      if(res.message=='no_solde_suffisant'){
        alert("ECHEC! SOLDE DE CONGE INSUFFISANT POUR CETTE ANNEE D'EXERCICE, VOUS N'AVEZ QUE "+res.solde+" JOUR(S)")
      }else
      alert("PROBLEME DE SERVEUR")
      
    }else{
     this. non_faute=true
      this.dataSource=res.data
      // console.log(res)
    }
    
  },
  error=>{
    console.log(error)
    this.approot.progressBar=false;
  })


  this.info_service.getTypeConge().subscribe
  (res=>{
  
    // console.log(res)
    // console.log(res.pwd)
  
    if(res.response=="non"){
      alert("PROBLEME DE SERVEUR")
    }else{
      // console.log(res.type_conges)
      this.congeInfo = res.type_conges;
      this.congeInfo_filtre= res.type_conges;
    }
    
  },
  error=>{
    console.log(error)
    this.approot.progressBar=false;
  })
    }

    submit(){


      if(this.user_form.controls.adresse.status=='VALID'&&
      this.user_form.controls.type_conge.status=='VALID'&&
      this.user_form.controls.nombre.status=='VALID'&&
      this.user_form.controls.exercice.status=='VALID'&&
      this.user_form.controls.motif.status=='VALID'&&
      this.user_form.controls.date.status=='VALID'&&
      this.user_form.controls.date1.status=='VALID'&&
      this.user_form.controls.date2.status=='VALID'){
   
       let formData = new FormData();
         formData.append("id",JSON.parse(sessionStorage.getItem("usersession")).data.ID)
         formData.append("id_conge_demande",this.activatedRoute.snapshot.url[1].path)
         formData.append("adresse",this.user_form.value.adresse)
         formData.append("type_conge",this.user_form.value.type_conge)
         formData.append("nombre",this.user_form.value.nombre)
         formData.append("exercice",this.user_form.value.exercice)
         formData.append("motif",this.user_form.value.motif)
         formData.append("date",this.user_form.value.date)
         formData.append("date1",this.user_form.value.date1)
         formData.append("date2",this.user_form.value.date2)
      
      //  console.log(this.user_form.value.date1)
       this.info_service.demande_conge_update(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
        //  console.log(res.response)
         if(res.response=="non"){
          if(res.message=='no_solde_param'){
            alert("VOTRE SOLDE DE CONGE N'EST PAS ENCORE CONFIGURE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME")
          }else
          if(res.message=='no_date_embauche'){
            alert("VOTRE DATE D'EMBAUCHE N'EST PAS ENCORE REMPLIE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME")
          }else
          if(res.message=='no_signature'){
            alert("ECHEC! VEUILLEZ D'ABORD REMPLIR TA SIGNATURE SUR TON PROFIL")
          }else
          if(res.message=='no_poste'){
            alert("ECHEC! VOUS N'ETES PAS ENCORE AFFECTER A UN POSTE, VEUILLEZ CONTACTER L'ADMINISTRATEUR DU SYSTEME")
          }else
          if(res.message=='no_droit_cetteanne'){
            alert("ECHEC! A CETTE ANNEE D'EXERCICE VOUS N'AVEZ PAS ENCORE DROIT AU CONGE ANNUEL")
          }else
          if(res.message=='no_solde_suffisant'){
            alert("ECHEC! SOLDE DE CONGE INSUFFISANT POUR CETTE ANNEE D'EXERCICE, VOUS N'AVEZ QUE "+res.solde+" JOUR(S)")
          }else
          if(res.message=='conge_encour'){
            alert("ECHEC! VOUS AVEZ DEJA UNE AUTRE DEMANDE DE CONGE ANNUEL ENCOURS")
          }else
          if(res.message=='verifier_date'){
            alert("ECHEC! VEUILLEZ VERIFIER BIEN LES DATES ET LE NOMBRE DE JOUR")
          }else
          if(res.message=='solde_anterieur'){
            alert("ECHEC! VOUS AVEZ ENCORE DE SOLDE CONGE POUR LES ANNEES ANTERIEUR, VEILLEZ D'ABORD LES EPUISER")
          }else
          if(res.message=='verifier_exercice'){
            alert("ECHEC! VEUILLEZ VERIFIER BIEN ANNE D'EXERCICE")
          }else
          alert("PROBLEME DE SERVEUR")
         }else{
          alert('ENREGISTREMENT AVEC SUCCES') 
          this.router.navigate(['conge/historique']);
         }
         
       },
       error=>{
         console.log(error)
         this.approot.progressBar=false;
       })
      }else alert("VERIFIER BIEN VOS CHAMPS DE SAISIE")
   }
   


    onKey(value) { 

      // console.log(value)
      this.congeInfo_filtre= []; 
      this.selectSearch(value);       
    }
    
    selectSearch(value:string){
      // console.log(value)
    let filter = value.toLowerCase();
    for ( let i = 0 ; i < this.congeInfo.length; i ++ ) {
        let option = this.congeInfo[i];
        
        if (  option.DESCRIPTION_CONGE.toLowerCase().indexOf(filter)>= 0 ) {
         
            this.congeInfo_filtre.push( option );
        }
    }
    }
    
    refresh(){
    this.congeInfo_filtre= this.congeInfo
    }

    // arra_anne() {
    //   var anne_ambauche=new Date(this.user[0].DATE_EMBAUCHE).getFullYear();
    //   for (var i = anne_ambauche; i <= this.this_year; i++) {
    //     this.arr[i]=i;
    //     this.arr.push(i)
        
    //   }
    //   return this.arr;
    // }

}
