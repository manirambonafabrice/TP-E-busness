import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoService } from '../../../services/info.service';
import { InfoTransportService } from '../../../services/info-transport.service';
import { HttpClient } from '@angular/common/http';
import {MatAccordion} from '@angular/material/expansion';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-itineraire',
  templateUrl: './itineraire.component.html',
  styleUrls: ['./itineraire.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItineraireComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

 
  isTableExpanded = false;

  STUDENTS_DATA = [];


  dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['id', 'name', 'age', 'address', 'actions'];
  displayedStudentsColumnsList1: string[] = ['#', 'TYPE ITINERAIRE', 'ITINERAIRE', 'PRIX', 'actions','-'];

  data_itineraire=[]

isprovincial=false
iscommunal=false
iszonal=false
isinterpoint=false

  dtOptions_province: any = {};
  dtOptions_commune: any = {};
  utilisateurs: any = '';
  utilisateurs_filtre: any = '';
  provinces
  provinces_filtre
  provinces_filtre1
  communes=[]
  infos=[]
  infos1=[]
  commune_filtre1
  zone_filtre1
  commune_filtre=[]
  zones
  id_commune=0
  id_pro:any=0
  id_com:any=0
  id_delete_iti
  id_delete_iti_interm

  id_itiner=''
  id_interm=''
  it_prix=0
  origine_old
  destination_old
  type_old

  nom_itineraire=''

  nouvel_fom=true
  nouvel_fom_update=false
  nouvel_fom_interm_update=false
  nouvel_fom_interm=false

  user_form=new FormGroup({
  
    type:new FormControl(''),
    origine:new FormControl('',Validators.required), 
    destination:new FormControl('',Validators.required),
    filter_com:new FormControl(''), 
    province_id:new FormControl(''), 
    commune_id:new FormControl(''), 
    filter_prov:new FormControl(''), 
    filter_zone:new FormControl(''), 
    zone_id:new FormControl('',Validators.required),
    prix:new FormControl('',Validators.required) 
  })

  user_form1=new FormGroup({
  
    type:new FormControl(''),
    origine:new FormControl('',Validators.required), 
    destination:new FormControl('',Validators.required),
    filter_com:new FormControl(''), 
    province_id:new FormControl(''), 
    commune_id:new FormControl(''), 
    filter_prov:new FormControl(''), 
    filter_zone:new FormControl(''), 
    zone_id:new FormControl('',Validators.required),
    prix:new FormControl('',Validators.required) 
  })
  user_form2=new FormGroup({
  
    type:new FormControl(''),
    origine:new FormControl('',Validators.required), 
    destination:new FormControl('',Validators.required),
    filter_com:new FormControl(''), 
    province_id:new FormControl(''), 
    commune_id:new FormControl(''), 
    filter_prov:new FormControl(''), 
    filter_zone:new FormControl(''), 
    zone_id:new FormControl('',Validators.required),
    prix:new FormControl('',Validators.required) 
  })
  user_form3=new FormGroup({
  
    type:new FormControl(''),
    origine:new FormControl('',Validators.required), 
    destination:new FormControl('',Validators.required),
    filter_com:new FormControl(''), 
    province_id:new FormControl(''), 
    commune_id:new FormControl(''), 
    filter_prov:new FormControl(''), 
    filter_zone:new FormControl(''), 
    zone_id:new FormControl('',Validators.required),
    prix:new FormControl('',Validators.required) 
  })
  constructor(private info_service:InfoService,private info_service1:InfoTransportService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService ) 
  { 
    var url=window.location.href
    var path=url.split("#")
    let formData = new FormData();
    var path_url=path[1]
    var array_url=path[1].split('/')

    for (let i = array_url.length-1; i >0 ; i--) {
      var isnum = /^\d+$/.test(array_url[i]);
      console.log(array_url[i])
      if(!isnum){
        //  path_url=path[1]
      }else{
         path_url=path_url.replace("/"+array_url[i],'')
      }     
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
    this.dataStudentsList.data = this.STUDENTS_DATA;


    this.info_service1.getItineraire().subscribe
    (res=>{

      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
        console.log(res.infos_itineraire)
      
        this.dataStudentsList.data = res.infos_itineraire;
        this.data_itineraire = res.infos_itineraire;
      }
      
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
    })


    if(JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON>0){
      this.dtOptions_province = {
        // serverSide:true,
        // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
        ajax: {
                  url:this.connexion.base_url+"routes.transport/list_itineraire",
                  type:"GET", 
                    headers: {
                        "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
                    }
                  
              },
        columns: [{
          title: 'PROVINCE',
          data: 'PROVINCE'
        },
        {
          title: 'TYPE',
          data: 'TYPE'
        },
        {
          title: 'ORIGINE',
          data: 'ORIGINE'
        },{
          title: 'DESTINATION',
          data: 'DESTINATION'
        },{
          title: 'CREATEUR',
          data: 'CREATEUR'
        },
        {
           title: 'Actions',
           data: 'ACTION'
         }],
        blengthChange: false,
        responsive: true,
        // Declare the use of the extension in the dom parameter
        dom: 'lBfrtip',
        // Configure the buttons
        buttons: [
          {extend: 'excel', title: 'NOS ITINERAIRES'},
        ]
      };
    }else
    this.dtOptions_province = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes.transport/list_itineraire",
                type:"GET", 
                  headers: {
                      "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID
                  }
                
            },
      columns: [{
        title: 'RAISON SOCIALE',
        data: 'RAISON'
      },{
        title: 'PROVINCE',
        data: 'PROVINCE'
      },
      {
        title: 'TYPE',
        data: 'TYPE'
      },
      {
        title: 'ORIGINE',
        data: 'ORIGINE'
      },{
        title: 'DESTINATION',
        data: 'DESTINATION'
      },{
        title: 'CREATEUR',
        data: 'CREATEUR'
      },
      {
         title: 'Actions',
         data: 'ACTION'
       }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'NOS ITINERAIRES'},
      ]
    };
    var self = this;

    $(document).on( 'click', '.getDetailsOu', function (event) {
      

      // var id=$(this).attr('id').split("-")

      // if (id[0]=="mod") {
      //   self.modifier(id[1]);
      // }
      // if (id[0]=="supp") {
      //   // console.log(id)
      //   if(confirm("Voulez-vous vraiment Supprimer cet unité d'organisation?")){
      //     self.supprimer(id[1]);
      //   }
      // }

      event.stopImmediatePropagation();   
  } );



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
  
  }

  onKey(value) { 

    // console.log(this.ou_filtre)
    this.provinces_filtre= []; 
    this.selectSearch(value);       
}

selectSearch(value:string){
  let filter = value.toLowerCase();
  for ( let i = 0 ; i < this.provinces.length; i ++ ) {
      let option = this.provinces[i];
      if (  option.PROVINCE_NAME.toLowerCase().indexOf(filter) >= 0) {
          this.provinces_filtre.push( option );
      }
  }
}

refresh_prov(){
this.provinces_filtre= this.provinces
}

select_type(objet){
  // alert(id)
  // console.log(objet.value)

this.isprovincial=false
this.iscommunal=false
this.iszonal=false
this.isinterpoint=false

this.user_form.get("province_id").setValue('');
this.user_form.get("commune_id").setValue('');
this.user_form.get("zone_id").setValue('');

  this.infos=[]
  this.provinces_filtre1=[]
  if (objet.value==1) {
    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.infos=res.data
  // this.communes=res.communes
  // this.commune_filtre=res.communes
  // sessionStorage.setItem("communes", objet.value);
      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==2) {
    this.iscommunal=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==3) {
    this.iscommunal=true
    this.iszonal=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==4) {
    this.iscommunal=true
    this.iszonal=true
    this.isinterpoint=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }
  
}


select_type1(objet){
  // alert(objet.value)
  // console.log(objet.value)

this.isprovincial=false
this.iscommunal=false
this.iszonal=false
this.isinterpoint=false

this.user_form1.get("province_id").setValue('');
this.user_form1.get("commune_id").setValue('');
this.user_form1.get("zone_id").setValue('');

  this.infos=[]
  this.provinces_filtre1=[]
  if (objet.value==1) {
    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.infos=res.data
  // this.communes=res.communes
  // this.commune_filtre=res.communes
  // sessionStorage.setItem("communes", objet.value);
      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==2) {
    this.iscommunal=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data
   
  //  this.user_form1.get("province_id").setValue(2);

      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==3) {
    this.iscommunal=true
    this.iszonal=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==4) {
    this.iscommunal=true
    this.iszonal=true
    this.isinterpoint=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }
  
}
select_type2(objet){
  // alert(objet.value)
  // console.log(objet.value)

this.isprovincial=false
this.iscommunal=false
this.iszonal=false
this.isinterpoint=false

this.user_form1.get("province_id").setValue('');
this.user_form1.get("commune_id").setValue('');
this.user_form1.get("zone_id").setValue('');

  // this.infos=[]
  this.provinces_filtre1=[]
  if (objet.value==1) {
    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
  //  this.infos=res.data
  // this.communes=res.communes
  // this.commune_filtre=res.communes
  // sessionStorage.setItem("communes", objet.value);
      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==2) {
    this.iscommunal=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data
   
  //  this.user_form1.get("province_id").setValue(2);

      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==3) {
    this.iscommunal=true
    this.iszonal=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }else if (objet.value==4) {
    this.iscommunal=true
    this.iszonal=true
    this.isinterpoint=true

    this.info_service1.getInfo_Itineraire_par_type(1).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.provinces_filtre1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }
  
}
select_province(objet){

  this.infos=[]

  console.log(this.user_form.value.type)
  if (this.user_form.value.type==2) {
    this.info_service1.getInfo_Itineraire_par_type1(this.user_form.value.type,objet.value).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.infos=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }else {

    this.info_service1.getCommune_Itineraire(objet.value).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
  //  this.infos=res.data
   this.commune_filtre1=res.data
      }
      
    },
    error=>{
      console.log(error)
    })

  }
  
}

select_province1(objet){


  // console.log(this.user_form.value.type)
  if (this.user_form1.value.type==2) {
    this.info_service1.getInfo_Itineraire_par_type1(this.user_form1.value.type,objet.value).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.infos=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }else {

    this.info_service1.getCommune_Itineraire(objet.value).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
  //  this.infos=res.data
   this.commune_filtre1=res.data
      }
      
    },
    error=>{
      console.log(error)
    })

  }
  
}


onKey_com(value) { 

  // console.log(this.ou_filtre)
  this.commune_filtre= []; 
  this.selectSearch_com(value);       
}

selectSearch_com(value:string){
// let filter = value.toLowerCase();
// for ( let i = 0 ; i < this.communes.length; i ++ ) {
//     let option = this.communes[i];
//     if (  option.COMMUNE_NAME.toLowerCase().indexOf(filter) >= 0) {
//         this.commune_filtre.push( option );
//     }
// }
}

refresh_com(){
this.commune_filtre= this.communes
}

  select_commune(objet){
   
  this.infos=[]

  console.log(this.user_form.value.type)
  if (this.user_form.value.type==3) {
    this.info_service1.getInfo_Itineraire_par_type1(this.user_form.value.type,objet.value).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.infos=res.data

      }
      
    },
    error=>{
      console.log(error)
    })
  }else {

    this.info_service1.getZone_Itineraire(objet.value).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
  //  this.infos=res.data
   this.zone_filtre1=res.data
      }
      
    },
    error=>{
      console.log(error)
    })

  }
  
    
  }
  select_commune1(objet){
   
 
  
    // console.log(this.user_form1.value.type)
    if (this.user_form1.value.type==3) {
      this.info_service1.getInfo_Itineraire_par_type1(this.user_form1.value.type,objet.value).subscribe
      (res=>{
    
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
     console.log(res)
     this.infos=res.data
  
        }
        
      },
      error=>{
        console.log(error)
      })
    }else {
  
      this.info_service1.getZone_Itineraire(objet.value).subscribe
      (res=>{
    
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
     console.log(res)
    //  this.infos=res.data
     this.zone_filtre1=res.data
        }
        
      },
      error=>{
        console.log(error)
      })
  
    }
    
      
    }

  select_zone(objet){
   
    this.infos=[]
  
    console.log(this.user_form.value.type)
    // if (this.user_form.value.type==3) {
      this.info_service1.getInfo_Itineraire_par_type1(this.user_form.value.type,objet.value).subscribe
      (res=>{
    
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
     console.log(res)
     this.infos=res.data
  
        }
        
      },
      error=>{
        console.log(error)
      })
         
  }

  select_zone1(objet){
   
    this.infos=[]
  
    // console.log(this.user_form1.value.type)
    // if (this.user_form.value.type==3) {
      this.info_service1.getInfo_Itineraire_par_type1(this.user_form1.value.type,objet.value).subscribe
      (res=>{
    
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
     console.log(res)
     this.infos=res.data
  
        }
        
      },
      error=>{
        console.log(error)
      })
         
  }

  select_origine(objet){

    let formData = new FormData();
      formData.append("province_id",this.user_form.value.province_id)
      formData.append("commune_id",this.user_form.value.commune_id)
      formData.append("zone_id",this.user_form.value.zone_id)
      formData.append("type",this.user_form.value.type)
      formData.append("origine",this.user_form.value.origine)

      this.infos1=[]

    if (this.user_form.value.type) {
    this.info_service1.getInfo_Itineraire_withoutOrigine(formData).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
   console.log(res)
   this.infos1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })

  }
   
  }

  select_origine1(objet){
    // alert()

    let formData = new FormData();
      formData.append("province_id",this.user_form1.value.province_id)
      formData.append("commune_id",this.user_form1.value.commune_id)
      formData.append("zone_id",this.user_form1.value.zone_id)
      formData.append("type",this.user_form1.value.type)
      formData.append("origine",this.user_form1.value.origine)

      this.infos1=[]

    if (this.user_form1.value.type) {
    this.info_service1.getInfo_Itineraire_withoutOrigine(formData).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
  //  console.log(res)
   this.infos1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })

  }
   
  }

  select_origine2(objet){

    let formData = new FormData();
      formData.append("province_id",this.user_form2.value.province_id)
      formData.append("commune_id",this.user_form2.value.commune_id)
      formData.append("zone_id",this.user_form2.value.zone_id)
      formData.append("type",this.user_form2.value.type)
      formData.append("origine",this.user_form2.value.origine)

      this.infos1=[]

      // alert()

    if (this.user_form2.value.type) {
    this.info_service1.getInfo_Itineraire_withoutOrigine2(formData).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
  //  console.log(res)
   this.infos1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })

  }
   
  }

  select_origine3(objet){

    let formData = new FormData();
      formData.append("province_id",this.user_form3.value.province_id)
      formData.append("commune_id",this.user_form3.value.commune_id)
      formData.append("zone_id",this.user_form3.value.zone_id)
      formData.append("type",this.user_form3.value.type)
      formData.append("origine",this.user_form3.value.origine)

      this.infos1=[]

      // alert()

    if (this.user_form3.value.type) {
    this.info_service1.getInfo_Itineraire_withoutOrigine2(formData).subscribe
    (res=>{
  
      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
  //  console.log(res)
   this.infos1=res.data

      }
      
    },
    error=>{
      console.log(error)
    })

  }
   
  }
  select_destination(objet){
   
  }
  onKey_zone(value) {}
  refresh_zone(){}


    // Toggel Rows
    toggleTableRows() {
      this.isTableExpanded = !this.isTableExpanded;
  
      this.dataStudentsList.data.forEach((row: any) => {
        row.isExpanded = this.isTableExpanded;
      })
    }


    submit(){


      if(this.user_form.controls.origine.status=='VALID'&&
        this.user_form.controls.destination.status=='VALID'&&
        this.user_form.controls.prix.status=='VALID'&&
        this.user_form.controls.type.status=='VALID'){
  
        let formData = new FormData();
        formData.append("user_id",JSON.parse(sessionStorage.getItem("usersession")).data.ID)
        formData.append("type",this.user_form.value.type)
        formData.append("prix",this.user_form.value.prix)
        formData.append("destination",this.user_form.value.destination)
        formData.append("origine",this.user_form.value.origine)
  
       
           this.info_service1.addItineraire(formData).subscribe
     (res=>{
  
       this.approot.progressBar=false;
       
       if(res.response=="non"){
         if (res.message=="exist") {alert("CETTE ITINERAIRE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
       }else{
        alert('ENREGISTREMENT AVEC SUCCES') 
  
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          // console.log(currentUrl);
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
  
    retour_nouveau(){
      this.nouvel_fom=true
      this.nouvel_fom_update=false
      this.nouvel_fom_interm_update=false
      this.nouvel_fom_interm=false
    }
    modifier_itin(id){

      this.id_itiner=id
      
      this.nouvel_fom=false
      this.nouvel_fom_update=true
      this.nouvel_fom_interm_update=false
      this.nouvel_fom_interm=false
      this.approot.progressBar=true;

      this.info_service1.getOneItineraire(id).subscribe
      (res=>{
        this.approot.progressBar=false;
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{

        //   console.log(res.itineraire)
          console.log(res)
        this.select_type1({value:res.itineraire[0].TYPE_ITINERAIRE})
          this.user_form1.get("type").setValue(res.itineraire[0].TYPE_ITINERAIRE);
          this.user_form1.get("province_id").setValue(res.lieu.prov);
         this. commune_filtre1=res.lieu1.com1
         this. zone_filtre1=res.lieu1.zone1
         this.  infos=res.iti.orig
         this.  infos1=res.iti.dest

         this.nom_itineraire=res.iti.orig[0].DESCRIPTION+"-"+res.iti.dest[0].DESCRIPTION
        this.origine_old=res.iti.orig[0].ID
        this.destination_old=res.iti.dest[0].ID
        this.type_old=res.itineraire[0].TYPE_ITINERAIRE
        //  console.log(res.orig)
        //  if(res.lieu.prov) this.select_province1({value:res.lieu.prov})
         this.user_form1.get("commune_id").setValue(res.lieu.com);
        //   if(res.lieu.com) 
        //   this.select_commune1({value:res.lieu.com})
          this.user_form1.get("zone_id").setValue(res.lieu.zone);
        //   if(res.lieu.zone) 
        //   this.select_zone1({value:res.lieu.zone})
          

          this.user_form1.get("origine").setValue(res.itineraire[0].ORIGINE);
          this.user_form1.get("destination").setValue(res.itineraire[0].DESTINATION);
          this.user_form1.get("prix").setValue(res.itineraire[0].PRIX);

        //   this.select_origine1({value:res.itineraire[0].ORIGINE}) 

        //   console.log(res.lieu.prov)
        //   this.user_form1.get("province_id").setValue(9);
        }
        
      },
      error=>{
        console.log(error)
      })

    }

    add_interm(id,prix){

      // alert()
      this.id_itiner=id
      this.it_prix=prix
      
      this.nouvel_fom=false
      this.nouvel_fom_update=false
      this.nouvel_fom_interm_update=false
      this.nouvel_fom_interm=true
      this.approot.progressBar=true;

      this.info_service1.getOneItineraire1(id).subscribe
      (res=>{
        this.approot.progressBar=false;
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{

          // console.log(res.iti)
          // console.log(res.iti.orig)
        this.select_type2({value:res.itineraire[0].TYPE_ITINERAIRE})
          this.user_form2.get("type").setValue(res.itineraire[0].TYPE_ITINERAIRE);
          this.user_form2.get("province_id").setValue(res.lieu.prov);
         this. commune_filtre1=res.lieu1.com1
         this. zone_filtre1=res.lieu1.zone1
         this.  infos=res.iti.orig
        //  this.  infos=[]
         this.  infos1=[]

        //  this.nom_itineraire=res.iti.orig[0].DESCRIPTION+"-"+res.iti.dest[0].DESCRIPTION
        // this.origine_old=res.iti.orig[0].ID
        // this.destination_old=res.iti.dest[0].ID
        this.type_old=res.itineraire[0].TYPE_ITINERAIRE
        //  console.log(res.orig)
        //  if(res.lieu.prov) this.select_province1({value:res.lieu.prov})
         this.user_form2.get("commune_id").setValue(res.lieu.com);
        //   if(res.lieu.com) 
        //   this.select_commune1({value:res.lieu.com})
          this.user_form2.get("zone_id").setValue(res.lieu.zone);
        //   if(res.lieu.zone) 
        //   this.select_zone1({value:res.lieu.zone})
          

          // this.user_form2.get("origine").setValue(res.itineraire[0].ORIGINE);
          // this.user_form2.get("destination").setValue(res.itineraire[0].DESTINATION);
          // this.user_form2.get("prix").setValue(res.itineraire[0].PRIX);

        //   this.select_origine1({value:res.itineraire[0].ORIGINE}) 

        //   console.log(res.lieu.prov)
        //   this.user_form1.get("province_id").setValue(9);
        }
        
      },
      error=>{
        console.log(error)
      })

    }
    update_interm(id_interm,id,prix){

      // alert()
      this.id_itiner=id
      this.id_interm=id_interm
      this.it_prix=prix
      
      this.nouvel_fom=false
      this.nouvel_fom_update=false
      this.nouvel_fom_interm_update=true
      this.nouvel_fom_interm=false
      this.approot.progressBar=true;

      this.info_service1.getOneItineraire_intermediaire(id_interm,id).subscribe
      (res=>{
        this.approot.progressBar=false;
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{

          console.log(res)
          // console.log(res.iti.orig)
        this.select_type2({value:res.itineraire[0].TYPE_ITINERAIRE})
          this.user_form3.get("type").setValue(res.itineraire[0].TYPE_ITINERAIRE);
          this.user_form3.get("province_id").setValue(res.lieu.prov);
         this. commune_filtre1=res.lieu1.com1
         this. zone_filtre1=res.lieu1.zone1
         this.  infos=res.iti.orig
        //  this.  infos=[]
         this.  infos1=[]

        //  this.nom_itineraire=res.iti.orig[0].DESCRIPTION+"-"+res.iti.dest[0].DESCRIPTION
        // this.origine_old=res.iti.orig[0].ID
        // this.destination_old=res.iti.dest[0].ID
        
        //  console.log(res.orig)
        //  if(res.lieu.prov) this.select_province1({value:res.lieu.prov})
         this.user_form3.get("commune_id").setValue(res.lieu.com);
        //   if(res.lieu.com) 
        //   this.select_commune1({value:res.lieu.com})
          this.user_form3.get("zone_id").setValue(res.lieu.zone);
          console.log(res.itineraires_intermediaire[0].ORIGINE)
          this.user_form3.get("origine").setValue(res.itineraires_intermediaire[0].ORIGINE);
          this.user_form3.get("prix").setValue(res.itineraires_intermediaire[0].PRIX);
          this.select_origine3({})
          this.user_form3.get("destination").setValue(res.itineraires_intermediaire[0].DESTINATION);

          this.origine_old=res.itineraires_intermediaire[0].ORIGINE
          this.destination_old=res.itineraires_intermediaire[0].DESTINATION
          this.type_old=res.itineraires_intermediaire[0].TYPE_ITINERAIRE
          // console.log(res.itineraires_intermediaire.DESTINATION)
       
        }
        
      },
      error=>{
        console.log(error)
      })

    }

    nouvel_itineraire_interm(id){
      this.nouvel_fom=false
      this.nouvel_fom_update=false
      this.nouvel_fom_interm_update=false
      this.nouvel_fom_interm=true
    }
  

    submit1(){


      if(this.user_form1.controls.origine.status=='VALID'&&
        this.user_form1.controls.destination.status=='VALID'&&
        this.user_form1.controls.prix.status=='VALID'&&
        this.user_form1.controls.type.status=='VALID'){
  
        let formData = new FormData();
        
        formData.append("id",this.id_itiner)
        formData.append("origine_old",this.origine_old)
        formData.append("destination_old",this.destination_old)
        formData.append("type_old",this.type_old)

        formData.append("user_id",JSON.parse(sessionStorage.getItem("usersession")).data.ID)
        formData.append("type",this.user_form1.value.type)
        formData.append("prix",this.user_form1.value.prix)
        formData.append("destination",this.user_form1.value.destination)
        formData.append("origine",this.user_form1.value.origine)
  
       
           this.info_service1.updateItineraire(formData).subscribe
     (res=>{
  
       this.approot.progressBar=false;
       
       if(res.response=="non"){
         if (res.message=="exist") {alert("CETTE ITINERAIRE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
       }else{
        alert('ENREGISTREMENT AVEC SUCCES') 
  
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          // console.log(currentUrl);
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

    submit2(){


      if(this.user_form2.controls.origine.status=='VALID'&&
        this.user_form2.controls.destination.status=='VALID'&&
        this.user_form2.controls.prix.status=='VALID'&&
        this.user_form2.controls.type.status=='VALID'){

          if(this.user_form2.value.prix<this.it_prix){
  
        let formData = new FormData();
        formData.append("user_id",JSON.parse(sessionStorage.getItem("usersession")).data.ID)
        formData.append("id_itiner",this.id_itiner)
        formData.append("type",this.user_form2.value.type)
        formData.append("prix",this.user_form2.value.prix)
        formData.append("destination",this.user_form2.value.destination)
        formData.append("origine",this.user_form2.value.origine)
  
       
           this.info_service1.addItineraire_intermediaire(formData).subscribe
     (res=>{
  
       this.approot.progressBar=false;
       
       if(res.response=="non"){
         if (res.message=="exist") {alert("CETTE ITINERAIRE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
       }else{
        alert('ENREGISTREMENT AVEC SUCCES') 
  
      //  this. retour_nouveau()
        // this.ngOnInit()
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          // console.log(currentUrl);
      });
       }


       
     },
     error=>{
       console.log(error)
       this.approot.progressBar=false;
     })
        }else{
          alert('LE PRIX DE L\'ITINERAIRE INTERMEDIAIRE DOIT ETRE INFERIEUR AU PRIX DE SON ITINERAIRE')
            
        }
      }else{
        alert('VERIFIER BIEN VOS CHAMPS')
          
      }
    }

    submit3(){


      if(this.user_form3.controls.origine.status=='VALID'&&
        this.user_form3.controls.destination.status=='VALID'&&
        this.user_form3.controls.prix.status=='VALID'&&
        this.user_form3.controls.type.status=='VALID'){

          if(this.user_form3.value.prix<this.it_prix){
  
        let formData = new FormData();
        formData.append("user_id",JSON.parse(sessionStorage.getItem("usersession")).data.ID)
        formData.append("id_itiner",this.id_itiner)
        formData.append("id_interm",this.id_interm)
        formData.append("type",this.user_form3.value.type)
        formData.append("prix",this.user_form3.value.prix)
        formData.append("destination",this.user_form3.value.destination)
        formData.append("origine",this.user_form3.value.origine)

        formData.append("origine_old",this.origine_old)
        formData.append("destination_old",this.destination_old)
        formData.append("type_old",this.type_old)
  
       
           this.info_service1.updateItineraire_intermediaire(formData).subscribe
     (res=>{
  
       this.approot.progressBar=false;
       
       if(res.response=="non"){
         if (res.message=="exist") {alert("CETTE ITINERAIRE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
       }else{
        alert('ENREGISTREMENT AVEC SUCCES') 
  
      //  this. retour_nouveau()
        // this.ngOnInit()
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          // console.log(currentUrl);
      });
       }


       
     },
     error=>{
       console.log(error)
       this.approot.progressBar=false;
     })
        }else{
          alert('LE PRIX DE L\'ITINERAIRE INTERMEDIAIRE DOIT ETRE INFERIEUR AU PRIX DE SON ITINERAIRE')
            
        }
      }else{
        alert('VERIFIER BIEN VOS CHAMPS')
          
      }
    }

    gotoTop() {
      window.scroll(0,0);
    }

    check_id_delete_iti(id){
     this.id_delete_iti=id
    }
    check_id_delete_iti_interm(id,id1){
      this.id_delete_iti=id
      this.id_delete_iti_interm=id1
     }

    supprimer_itineraire(){
      this.approot.progressBar=true;
      
  
      this.info_service1.delete_itineraire(this.id_delete_iti).subscribe
      (res=>{
        // console.log(res.response)
        this.approot.progressBar=false;
     
        if(res.response=="non"){
          alert('Problème de connexion au serveur')  
        }else{

          if(res.message=="yes"){
          alert('SUPPRESSION AVEC SUCCES') 

        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
      }else alert('ECHEC! CETTE ITINERAIRE A DEJA CONNU DES TRAJETS DE TRANSPORT') 
    
        }
        
      },
      error=>{
        console.log(error)
        
        this.approot.progressBar=false;
      })
    
    }

    supprimer_itineraire_intermediaire(){
      this.approot.progressBar=true;
      
  
      this.info_service1.delete_itineraire_intermediaire(this.id_delete_iti,this.id_delete_iti_interm).subscribe
      (res=>{
        // console.log(res.response)
        this.approot.progressBar=false;
     
        if(res.response=="non"){
          alert('Problème de connexion au serveur')  
        }else{

          if(res.message=="yes"){
          alert('SUPPRESSION AVEC SUCCES') 

        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
      }else alert('ECHEC! CETTE ITINERAIRE A DEJA CONNU DES TRAJETS DE TRANSPORT') 
    
        }
        
      },
      error=>{
        console.log(error)
        
        this.approot.progressBar=false;
      })
    
    }
}
