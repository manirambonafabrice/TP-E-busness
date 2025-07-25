import { Component, OnInit } from '@angular/core';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoService } from '../../../services/info.service';
import { InfoTransportService } from '../../../services/info-transport.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-localites',
  templateUrl: './localites.component.html',
  styleUrls: ['./localites.component.scss']
})
export class LocalitesComponent implements OnInit {

 
  dtOptions_province: any = {};
  dtOptions_commune: any = {};
  utilisateurs: any = '';
  utilisateurs_filtre: any = '';
  provinces
  provinces_filtre
  communes=[]
  commune_filtre=[]
  zones
  id_commune=0
  id_pro:any=0
  id_com:any=0

  user_form=new FormGroup({
  
    province_id:new FormControl(''),
    filter_prov:new FormControl(''), 
    commune_id:new FormControl(''),
    filter_com:new FormControl(''), 
    zone_id:new FormControl('',Validators.required) 
  })
  constructor(private info_service:InfoService,private info_service1:InfoTransportService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService ) 
  { 

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
    // this.approot.progressBar=true;

    this.info_service1.getProvince().subscribe
    (res=>{

      if(res.response=="non"){
        console.log("PROBLEME DE SERVEUR")
      }else{
  //  console.log(res.provinces)
  this.provinces=res.provinces
  this.provinces_filtre=res.provinces
      }
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
    })

    this.dtOptions_province = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes.transport/list_province",
                type:"GET"
            },
      columns: [{
        title: '#',
        data: 'NUMERO'
      },{
        title: 'PROVINCE',
        data: 'PROVINCE'
      },{
        title: 'LONGITUDE',
        data: 'LONGITUDE'
      },{
        title: 'LATITUDE',
        data: 'LATITUDE'
      }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES PROVINCES'},
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

select_province(objet){
  // alert(id)
  // console.log(objet.value)

 
  this.communes=[]
  this.info_service1.getCommune(objet.value).subscribe
  (res=>{

    if(res.response=="non"){
      console.log("PROBLEME DE SERVEUR")
    }else{
 console.log(res.communes)
this.communes=res.communes
this.commune_filtre=res.communes
sessionStorage.setItem("communes", objet.value);
    }
    
  },
  error=>{
    console.log(error)
  })


    //  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
         this.router.navigate(['transport/localite/'+objet.value]);
    //      sessionStorage.setItem("province_id", objet.value);
    //  });
  
}



onKey_com(value) { 

  // console.log(this.ou_filtre)
  this.commune_filtre= []; 
  this.selectSearch_com(value);       
}

selectSearch_com(value:string){
let filter = value.toLowerCase();
for ( let i = 0 ; i < this.communes.length; i ++ ) {
    let option = this.communes[i];
    if (  option.COMMUNE_NAME.toLowerCase().indexOf(filter) >= 0) {
        this.commune_filtre.push( option );
    }
}
}

refresh_com(){
this.commune_filtre= this.communes
}

  select_commune(objet){
    // alert(id)
    // console.log(objet.value)
    this.id_commune=objet.value
    
  }
}
