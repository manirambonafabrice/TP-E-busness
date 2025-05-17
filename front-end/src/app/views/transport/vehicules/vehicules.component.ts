import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoTransportService } from '../../../services/info-transport.service';
import { InfoService } from '../../../services/info.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute, } from '@angular/router';
import { DefaultLayoutComponent } from '../../../containers';
import { ConnexionService } from '../../../services/connexion.service';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss'] 
})
export class VehiculesComponent implements OnInit {

  user_form=new FormGroup({
  
    plaque:new FormControl('',Validators.required) ,
    type_vehicule:new FormControl('',Validators.required) ,
    nombre:new FormControl('',Validators.required) ,
    foto:new FormControl('') ,
  })

  typeVehiculeInfo: any = '';
imageChangedEvent: any = '';
croppedImage: any = '';
canvasRotation = 0;
rotation = 0;
scale = 1;
showCropper = false;
containWithinAspectRatio = false;
transform: ImageTransform = {};
posteInfo_filtre: any = '';



  dtOptions: any = {};
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


    this.info_service1.getTypeVehicule().subscribe
    (res=>{

      // console.log(res)

      if(res.response=="non"){
        
      }else{

        this.typeVehiculeInfo= res.vehicules_types;
 
      }
      
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })
    

    this.dtOptions = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes.transport/list_vehicules",
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
      columns: [{
        title: 'RAISON SOCIALE',
        data: 'RAISON'
      },{
        title: 'PLAQUE',
        data: 'PLAQUE'
      },{
        title: 'TYPE VEHICULE',
        data: 'TYPE'
      },{
        title: 'PLACES',
        data: 'PLACE'
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
        {extend: 'excel', title: 'LISTE DES VEHICULES'},
      ]
    };
    var self = this;

    $(document).on( 'click', '.getDetailsvehicule', function (event) {
      // alert()

      var id=$(this).attr('id').split("-")

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
  }


  submit(){

    // plaque:new FormControl('',Validators.required) ,
    // type_vehicule:new FormControl('',Validators.required) ,
    // foto:new FormControl('') ,
    if(this.user_form.controls.plaque.status=='VALID'&&
      this.user_form.controls.type_vehicule.status=='VALID'&&
      this.user_form.controls.nombre.status=='VALID'&&
      this.croppedImage){

      let formData = new FormData();

      formData.append("plaque",this.user_form.value.plaque)
      formData.append("type_vehicule",this.user_form.value.type_vehicule)
      formData.append("nombre",this.user_form.value.nombre)
      formData.append("blob",this.croppedImage)

     
         this.info_service1.addVehicule(formData).subscribe
   (res=>{

     this.approot.progressBar=false;
     
     if(res.response=="non"){
       if (res.message=="exist") {
         alert("CETTE VEHICULE EXISTE DEJA") 
        }else if (res.message=="non_correspond") {
          alert("ECHEC! CE NE NOMBRE NE CORRESPOND PAS AU TYPE DE VEHICULE CHOISI") 
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
      alert('VERIFIER BIEN VOS CHAMPS')
        console.log(this.user_form.controls)
    }
  }

  
  modifier(id){
    this.router.navigate(['/transport/vehicules/'+id]);
  }

  supprimer(id){
    // this.approot.progressBar=true;

    // this.info_service1.delete_raison(id).subscribe
    // (res=>{
    //   // console.log(res.response)
    //   this.approot.progressBar=false;
   
    //   if(res.response=="non"){
    //     alert('Problème de connexion au serveur')  
    //   }else{
    //     // alert('SUPPRESSION AVEC SUCCES') 
    //   //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //   //     this.router.navigate(['parametrage/ou/list_ou']);
    //   // });
    //   let currentUrl = this.router.url;
    //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //       this.router.navigate([currentUrl]);
    //       console.log(currentUrl);
    //   });
  
    //   }
      
    // },
    // error=>{
    //   console.log(error)
      
    //   this.approot.progressBar=false;
    // })
  
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
}


