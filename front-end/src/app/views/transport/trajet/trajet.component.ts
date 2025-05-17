import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { InfoService } from '../../../services/info.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import {NgbDatepickerConfig,NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ConnexionService } from '../../../services/connexion.service';
import { DefaultLayoutComponent } from '../../../containers';
import { InfoTransportService } from '../../../services/info-transport.service';
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
  selector: 'app-trajet',
  templateUrl: './trajet.component.html',
  styleUrls: ['./trajet.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ],
})
export class TrajetComponent implements OnInit {

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

  trajet_libre=true
  info_type
  itineraire
  itineraire_filtre

  vehicules=[]
  chauffeurs=[]

  heure=['00','01','02','03','04','05','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  // heure=[]

  // min=[0,15,30,45]
  min=[
    {id:'00',value:'00'},
    {id:'15',value:'15'},
    {id:'30',value:'30'},
    {id:'45',value:'45'},
  ]

  constructor(private modalService: NgbModal,private info_service1:InfoTransportService,private config: NgbDatepickerConfig,private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService) {
    
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

    this.user_form.get("type_trajet").setValue(0);
    this.user_form.get("heure").setValue('00');
    this.user_form.get("min").setValue('00');

    this.approot.progressBar=true;

    this.info_service1.getvehicules().subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{

        // console.log(res.vehicule)
        this.vehicules=res.vehicule

      } 
      
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
    })

    this.info_service1.getUser_raison().subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{

        // console.log(res.vehicule)
        
        this.chauffeurs=res.chauff

      } 
      
    },
    error=>{
      console.log(error)
    })

    this.info_service1.getNumber_iti_byType().subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
        // console.log(res)
        this.info_type=res.infos
      }
      
    },
    error=>{
      console.log(error)
    })


    if(JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON>0){ 
    this.dtOptions = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes.transport/list_trajet",
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
      columns: [
        {
          title: '#',
          data: 'num'
        },
        {
          title: 'DATE CREATION',
          data: 'DATE_CR'
        },{
        title: 'DATE DE DEPART',
        data: 'DATE'
      },{
        title: 'ITINERAIRE',
        data: 'ITINERAIRE'
      },
      {
        title: 'VEHICULE',
        data: 'VEHICULE'
      },
      {
        title: 'CHAUFFEUR',
        data: 'CHAUFFEUR'
      },
      {
        title: 'STATUT',
        data: 'STATUT'
      },{
        title: 'Actions',
        data: 'ACTION'
      }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      "order": [],
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES RAISONS SOCIALES'},
      ]
    };

  }else{
    this.dtOptions = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes.transport/list_trajet",
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
            columns: [
              {
                title: '#',
                data: 'num'
              },{
              title: 'RAISON SOCIALE',
              data: 'RAISON'
            },{
              title: 'DATE CREATION',
              data: 'DATE_CR'
            },{
              title: 'DATE DE DEPART',
              data: 'DATE'
            },{
              title: 'ITINERAIRE',
              data: 'ITINERAIRE'
            },
            {
              title: 'VEHICULE',
              data: 'VEHICULE'
            },
            {
              title: 'CHAUFFEUR',
              data: 'CHAUFFEUR'
            },
            {
              title: 'STATUT',
              data: 'STATUT'
            },{
              title: 'Actions',
              data: 'ACTION'
            }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      "order": [],
      buttons: [
        {extend: 'excel', title: 'LISTE DES RAISONS SOCIALES'},
      ]
    };
  }

  var self = this;

  $(document).on( 'click', '.getTrajet', function (event) {
    // alert()

    var id=$(this).attr('id').split("-")

    if (id[0]=="mod") {
      
      self.modifier(id[1]);
    }
    if (id[0]=="susp") {
      // console.log(id)
      if(confirm("Voulez-vous vraiment Suspendre ce ce trajet?")){
        self.suspendre(id[1]);
      }
    }
    if (id[0]=="clo") {
      // console.log(id)
      if(confirm("Voulez-vous vraiment Cloturer ce trajet?")){
        self.cloturer(id[1]);
      }
    }

    event.stopImmediatePropagation();
   
} );
  }


  submit(){

var date=this.user_form.value.date+" "+this.user_form.value.heure+":"+this.user_form.value.min
    if(this.user_form.controls.heure.status=='VALID'&&
          this.user_form.controls.type_trajet.status=='VALID'&&
          this.user_form.controls.min.status=='VALID'&&
          this.user_form.controls.date.status=='VALID'&&
      this.user_form.controls.vehicule.status=='VALID'&&
      this.user_form.controls.itineraire.status=='VALID'&&
      this.user_form.controls.chauffeur.status=='VALID'){

      let formData = new FormData();

      formData.append("date",date)
      formData.append("type_trajet",this.user_form.value.type_trajet)
      formData.append("vehicule",this.user_form.value.vehicule)
      formData.append("chauffeur",this.user_form.value.chauffeur)
      formData.append("itineraire",this.user_form.value.itineraire)

     
var new_date=new Date()
var selected_date=new Date(date)
if((selected_date.getTime()>new_date.getTime())||this.user_form.value.type_trajet==0){

         this.info_service1.addtrajet(formData).subscribe
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
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
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


modifier(id){
  this.router.navigate(['/transport/trajets/'+id]);
}

suspendre(id){
  this.approot.progressBar=true;

  this.info_service1.suspendre_trajet(id).subscribe
  (res=>{
    // console.log(res.response)
    this.approot.progressBar=false;
 
    if(res.response=="non"){
      alert('Problème de connexion au serveur')  
    }else{
      // alert('SUPPRESSION AVEC SUCCES') 
    //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['parametrage/ou/list_ou']);
    // });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });

    }
    
  },
  error=>{
    console.log(error)
    
    this.approot.progressBar=false;
  })

}
cloturer(id){
  this.approot.progressBar=true;

  this.info_service1.cloturer_trajet(id).subscribe
  (res=>{
    // console.log(res.response)
    this.approot.progressBar=false;
 
    if(res.response=="non"){
      alert('Problème de connexion au serveur')  
    }else{
      // alert('SUPPRESSION AVEC SUCCES') 
    //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['parametrage/ou/list_ou']);
    // });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });

    }
    
  },
  error=>{
    console.log(error)
    
    this.approot.progressBar=false;
  })

}

select_type_trajet(objet){
  // console.log(objet.value)

  if(objet.value==1){
    this.trajet_libre=false
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
