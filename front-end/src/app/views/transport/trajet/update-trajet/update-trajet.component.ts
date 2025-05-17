import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute, } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { InfoService } from '../../../../services/info.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import {NgbDatepickerConfig,NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ConnexionService } from '../../../../services/connexion.service';
import { DefaultLayoutComponent } from '../../../../containers';
import { InfoTransportService } from '../../../../services/info-transport.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-update-trajet',
  templateUrl: './update-trajet.component.html',
  styleUrls: ['./update-trajet.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
})
export class UpdateTrajetComponent implements OnInit {

  // user_form=new FormGroup({
  //   heure:new FormControl('',Validators.required),
  //   min:new FormControl('',Validators.required),
  //   vehicule:new FormControl('',Validators.required),
  //   chauffeur:new FormControl('',Validators.required),
  //   itineraire:new FormControl('',Validators.required),
  //   filter_iti:new FormControl(''),
  //   type:new FormControl(''),
  //   date:new FormControl(null,Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')),
    
  // })
  user_form=new FormGroup({
    type_trajet:new FormControl('',Validators.required),
    heure:new FormControl('',Validators.required),
    min:new FormControl('',Validators.required),
    vehicule:new FormControl('',Validators.required),
    chauffeur:new FormControl('',Validators.required),
    itineraire:new FormControl('',Validators.required),
    filter_iti:new FormControl(''),
    type:new FormControl(''),
    date:new FormControl(null,Validators.pattern('^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$')),
    
  })
  infos_chauffeur = null;
  nom_chauffeur
  nom_vehicule

  dtOptions: any = {};

  info_type
  itineraire
  itineraire_filtre
  old_chauffeur
  old_vehicule

  trajet_libre=true
  trajet_info


  vehicules=[]
  chauffeurs=[]

  heure=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
  // heure=[]

  // min=[0,15,30,45]
  min=[
    {id:'00',value:'00'},
    {id:'15',value:'15'},
    {id:'30',value:'30'},
    {id:'45',value:'45'},
  ]
  // constructor(private info_service1:InfoTransportService,private config: NgbDatepickerConfig,private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService) {

  constructor(private modalService: NgbModal,private info_service:InfoService,private config: NgbDatepickerConfig,private info_service1:InfoTransportService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService,private activatedRoute: ActivatedRoute ) {
    const current = new Date();
  config.minDate = { year: current.getFullYear(), month: 
  current.getMonth() + 1, day: current.getDate() };
    //config.maxDate = { year: 2099, month: 12, day: 31 };
    // console.log(config)
  config.outsideDays = 'hidden';
// console.log(config)
// //FIN CONTROLE PERMISSION


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

    this.approot.progressBar=true;

    this.info_service1.getvehicules().subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{

        // console.log(res.vehicule)
        this.vehicules=res.vehicule
        this.info_service1.getUser_raison().subscribe
        (res=>{
      
          if(res.response=="non"){
            console.log("PROBLEME DE SERVEUR")
          }else{
    
            console.log(res.vehicule)
            
            this.chauffeurs=res.chauff
    

            this.info_service1.getNumber_iti_byType().subscribe
            (res=>{
          
              if(res.response=="non"){
                console.log("PROBLEME DE SERVEUR")
              }else{
                console.log(res)
                this.info_type=res.infos

                console.log(this.activatedRoute.snapshot.url[1].path)
                this.info_service1.getOneTrajet(this.activatedRoute.snapshot.url[1].path).subscribe
                (res=>{
              
                  if(res.response=="non"){
                    console.log("PROBLEME DE SERVEUR")
                  }else{
                    console.log(res.trajet)
                    console.log(res.iti)
                    this.trajet_info=res.trajet
                    var dt=res.trajet[0].DATE_HEURE_DEPART.split(" ")
                    var h=dt[1].split(":")
                    // console.log(h[1])
                    this.user_form.get("type_trajet").setValue(res.trajet[0].TYPE_TRAJET);
                    this.user_form.get("date").setValue(dt[0]);
                    this.user_form.get("heure").setValue(h[0]);
                    
                    this.user_form.get("vehicule").setValue(res.trajet[0].ID_VEHICULE);
                    this.user_form.get("chauffeur").setValue(res.trajet[0].CHAUFFEUR);
                    
                    this.user_form.get("type").setValue(res.iti[0].TYPE_ITINERAIRE);
                    this.user_form.get("min").setValue(h[1]);
                    this.select_type({value:res.iti[0].TYPE_ITINERAIRE})
                    this.user_form.get("itineraire").setValue(res.trajet[0].ID_ITINERAIRE);
                    this.old_chauffeur=res.trajet[0].CHAUFFEUR
                    this.old_vehicule=res.trajet[0].ID_VEHICULE
                   
                    
                    if(res.trajet[0].TYPE_TRAJET==1){
                      this.trajet_libre=false
                    }else{
                      this.user_form.get("heure").setValue('00');
                      this.user_form.get("min").setValue('00');
                      this.trajet_libre=true
                    }
                  }
                  
                },
                error=>{
                  console.log(error)
                })
                
              }
              
            },
            error=>{
              console.log(error)
            })
            
          } 
          
        },
        error=>{
          console.log(error)
        })

      } 
      
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })






  }

  submit(){

    var date=this.user_form.value.date+" "+this.user_form.value.heure+":"+this.user_form.value.min
        if(this.user_form.controls.heure.status=='VALID'&&
              this.user_form.controls.min.status=='VALID'&&
              this.user_form.controls.date.status=='VALID'&&
          this.user_form.controls.vehicule.status=='VALID'&&
          this.user_form.controls.itineraire.status=='VALID'&&
          this.user_form.controls.chauffeur.status=='VALID'){
    
          let formData = new FormData();
    
          formData.append("id",this.activatedRoute.snapshot.url[1].path)
          formData.append("date",date)
          formData.append("vehicule",this.user_form.value.vehicule)
          formData.append("chauffeur",this.user_form.value.chauffeur)
          formData.append("itineraire",this.user_form.value.itineraire)
          formData.append("old_chauffeur",this.old_chauffeur)
          formData.append("old_vehicule",this.old_vehicule)
    
        //  alert()
    var new_date=new Date()
    var selected_date=new Date(date)
    // if(selected_date.getTime()>new_date.getTime()){
      if((selected_date.getTime()>new_date.getTime())||this.user_form.value.type_trajet==0){
    
             this.info_service1.updatetrajet(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
         
         if(res.response=="non"){
           if (res.message=="vehicule_encour") {
             alert("CE VEHICULE N'A PAS ENCORE CLOTURE LE TRAJET ENTERIEUR") 
            }else if (res.message=="chauffeur_encour") {
              alert("CE CHAUFFEUR N'A PAS ENCORE CLOTURE LE TRAJET ENTERIEUR") 
             }else{
              alert("PROBLEME SERVEUR")
            }
         }else{
          alert('ENREGISTREMENT AVEC SUCCES') 
    
        let currentUrl = this.router.url;
        // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(["transport/trajets"]);
            // console.log(currentUrl);
        // });
         }
         
       },
       error=>{
         console.log(error)
         this.approot.progressBar=false;
       })
      }else{
        alert('CE TEMP CHOISI EST DEJA DEPASSE')
          // console.log(this.user_form.controls)
      }
        }else{
          alert('VERIFIER BIEN VOS CHAMPS')
            console.log(this.user_form.controls)
        }
      }
    
    
      
      onKey(value) { 
    
        // console.log(this.ou_filtre)
        this.itineraire_filtre= []; 
        this.selectSearch(value);       
    }
    
    selectSearch(value:string){
      let filter = value.toLowerCase();
      for ( let i = 0 ; i < this.itineraire.length; i ++ ) {
          let option = this.itineraire[i];
          if (  option.ITINERAIRE.toLowerCase().indexOf(filter) >= 0) {
              this.itineraire_filtre.push( option );
          }
      }
    }
    
    refresh_prov(){
    this.itineraire_filtre= this.itineraire
    }
    
    select_type(objet){
      // alert(id)
      // console.log(objet.value)
      this.info_service1.getItineraireFiltre(objet.value).subscribe
      (res=>{
    
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
          // console.log(res)
          this.itineraire=res.infos_itineraire
          this.itineraire_filtre=res.infos_itineraire
        }
        
      },
      error=>{
        console.log(error)
      })
    }
    
    select_type_trajet(objet){
      // console.log(objet.value)
    
      if(objet.value==1){
        this.trajet_libre=false
        var dt=this.trajet_info[0].DATE_HEURE_DEPART.split(" ")
        var h=dt[1].split(":")
       
        this.user_form.get("heure").setValue(h[0]);
        this.user_form.get("min").setValue(h[1]);
        
      }else{
        
        this.user_form.get("heure").setValue('00');
        this.user_form.get("min").setValue('00');
        this.trajet_libre=true
      } 
    }
    
     select_chauffeur(objet,content){
    
      
      const result = this.chauffeurs.find( ({ ID }) => ID === objet.value );
      // console.log(result)
    
      this.nom_chauffeur=result.NOM+" "+result.PRENOM+"("+result.TELEPHONE+")"
       
      this.info_service1.check_chauffeur_libre(objet.value).subscribe
      (async res=>{
    
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
            //  console.log(res.result_occupe)
            if(res.result_occupe=='occupe'){
              console.log(res.result_info.data)
              if(res.result_info.data.length>0){
                
                this.infos_chauffeur=res.result_info.data
              
                this.modalService.open(content, { size: 'lg' });
              }
              
            }
        }
        
      },
      error=>{
        console.log(error)
      })
    
    }
    
    select_vehicule(objet,content){
    
      
      const result = this.vehicules.find( ({ ID_VEHICULE }) => ID_VEHICULE === objet.value );
      // console.log(result)
    
      this.nom_vehicule=result.PLAQUE
       
      this.info_service1.check_vehicule_libre(objet.value).subscribe
      (async res=>{
    
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
            //  console.log(res.result_occupe)
            if(res.result_occupe=='occupe'){
              console.log(res.result_info.data)
              if(res.result_info.data.length>0){
                
                this.infos_chauffeur=res.result_info.data
              
                this.modalService.open(content, { size: 'lg' });
              }
              
            }
        }
        
      },
      error=>{
        console.log(error)
      })
    
    }
    
    enlever_chauffeur(){
      this.user_form.get("chauffeur").setValue('');
    }
    
    enlever_vehicule(){
      this.user_form.get("vehicule").setValue('');
    }

}
