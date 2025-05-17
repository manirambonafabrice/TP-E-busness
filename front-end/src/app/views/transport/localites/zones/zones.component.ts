import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoTransportService } from '../../../../services/info-transport.service';
import { InfoService } from '../../../../services/info.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute, } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { ConnexionService } from '../../../../services/connexion.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements AfterViewInit, OnInit {
  dtOptions_province: any = {};
  dtOptions_commune: any = {};
  utilisateurs: any = '';
  utilisateurs_filtre: any = '';
  provinces
  provinces_filtre
  communes=[]
  commune_filtre=[]
  zones
  id_commune=1
  id_pro:any=0
  id_com:any=0

  user_form=new FormGroup({
  
    province_id:new FormControl(''),
    filter_prov:new FormControl(''), 
    commune_id:new FormControl(''),
    filter_com:new FormControl(''), 
    zone_id:new FormControl('',Validators.required) 
  })
  constructor(private info_service:InfoService,private info_service1:InfoTransportService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent, private connexion:ConnexionService,private activatedRoute: ActivatedRoute ) 
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


  
  this.dtOptions_commune = {
    ajax: {
              url:this.connexion.base_url+"routes.transport/list_zone/"+this.activatedRoute.snapshot.url[2].path,
              type:"GET"
          },
    columns: [{
      title: '#',
      data: 'NUMERO'
    },{
      title: 'ZONE',
      data: 'ZONE'
    },{
      title: 'LONGITUDE',
      data: 'LONGITUDE'
    },{
      title: 'LATITUDE',
      data: 'LATITUDE'
    },{
      title: 'ACTION',
      data: 'ACTION'
    }],
    blengthChange: false,
    responsive: true,
    // Declare the use of the extension in the dom parameter
    dom: 'lBfrtip',
    // Configure the buttons
    buttons: [
      {extend: 'excel', title: 'LISTE DES COMMUNES'},
    ]
  };
  var self = this;
  $(document).on( 'click', '.zone', function (event) {
      

    var id=$(this).attr('id').split("|")

    if (id[0]=="mod") {
      self.modifier(id[1]);
    }
    if (id[0]=="supp") {
      // console.log(id)
      if(confirm("Voulez-vous vraiment Supprimer cet unité d'organisation?")){
        self.supprimer(id[1]);
      }
    }

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

     
  this.communes=[]
  this.info_service1.getCommune(this.activatedRoute.snapshot.url[1].path).subscribe
  (res=>{

    if(res.response=="non"){
      console.log("PROBLEME DE SERVEUR")
    }else{
//  console.log(res.communes)
this.communes=res.communes
this.commune_filtre=res.communes

    }
    
  },
  error=>{
    console.log(error)
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
  
  this.info_service1.getCommune(objet.value).subscribe
  (res=>{

    if(res.response=="non"){
      console.log("PROBLEME DE SERVEUR")
    }else{
 console.log(res.communes)
this.communes=res.communes
this.commune_filtre=res.communes

    }
    
  },
  error=>{
    console.log(error)
  })

if(objet.value==0){
  this.router.navigate(['transport/localite']); 
}else
              this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
              this.router.navigate(['transport/localite/'+objet.value]);
                   sessionStorage.setItem("province_id", objet.value);
               });
        //  this.router.navigate(['transport/localite/'+objet.value]); 
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
    if(objet.value==0){
      this.router.navigate(['transport/localite/'+this.activatedRoute.snapshot.url[1].path]);
    }else
                  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['transport/localite/'+this.activatedRoute.snapshot.url[1].path+'/'+objet.value]);
                   });
 
  
    
  }
  ngAfterViewInit() {
    // console.log(this.activatedRoute.snapshot.url[1].path)
    var id=+this.activatedRoute.snapshot.url[1].path
    var id1=+this.activatedRoute.snapshot.url[2].path
    this.user_form.get("province_id").setValue(id);
    this.user_form.get("commune_id").setValue(id1);
    
  }

 
  submit(){

        if(this.user_form.controls.commune_id.status=='VALID'&&
          this.user_form.controls.zone_id.status=='VALID'){
    
          let formData = new FormData();

          formData.append("user_id",JSON.parse(sessionStorage.getItem("usersession")).data.ID)
          formData.append("commune_id",this.user_form.value.commune_id)
          formData.append("zone",this.user_form.value.zone_id)
         
             this.info_service1.addZone(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
         
         if(res.response=="non"){
           if (res.message=="exist") {alert("CETTE ZONE") }else {alert("PROBLEME SERVEUR")}
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
          alert('VERIFIER BIEN VOS CHAMPS')
            console.log(this.user_form.controls)
        }
      }


      
      modifier(id){
        // console.log(window.location.href) 
        var array_url=window.location.href.split('/')   
        // console.log(array_url) 
        // this.router.navigate(['transport/zone_update/'+this.activatedRoute.snapshot.url[1].path+"/"+this.activatedRoute.snapshot.url[2].path+"/"+id]);
        this.router.navigate(['transport/zone_update/'+array_url[6]+"/"+array_url[7]+"/"+id]);
      }

      supprimer(id){
        this.approot.progressBar=true;
  
        this.info_service1.delete_zone(id).subscribe
        (res=>{
          // console.log(res.response)
          this.approot.progressBar=false;
       
          if(res.response=="non"){
            alert('Problème de connexion au serveur')  
          }else{
            // alert('ENREGISTREMENT SUCCES') 
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
}
