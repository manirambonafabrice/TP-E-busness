import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoTransportService } from '../../../../services/info-transport.service';
import { InfoService } from '../../../../services/info.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute, } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { ConnexionService } from '../../../../services/connexion.service';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';


@Component({
  selector: 'app-update-vehicule',
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.scss']
})
export class UpdateVehiculeComponent implements OnInit {

  user_form=new FormGroup({
  
    plaque:new FormControl('',Validators.required) ,
    type_vehicule:new FormControl('',Validators.required) ,
    nombre:new FormControl('',Validators.required) ,
    foto:new FormControl('') ,
  })
old_plaque
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

    this.info_service1.getOne_vehicule(this.activatedRoute.snapshot.url[1].path).subscribe
    (res=>{

      // console.log(res)
      // console.log(res.pwd)

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        // console.log(res.user)

        this.croppedImage=res.vehicule[0].FOTO?this.connexion.base_url+((res.vehicule[0].FOTO).replace("uploads/","")):null

      this.user_form.get("plaque").setValue(res.vehicule[0].PLAQUE);
      this.user_form.get("type_vehicule").setValue(res.vehicule[0].ID_VEHICULE_TYPE);
      this.user_form.get("nombre").setValue(res.vehicule[0].PLACE);

      this.old_plaque=res.vehicule[0].PLAQUE

      }
      

      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })

    this.info_service1.getTypeVehicule().subscribe
    (res=>{

      // console.log(res)

      if(res.response=="non"){
        
      }else{

        this.typeVehiculeInfo= res.vehicules_types;
 
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })
    


  }


  submit(){

    // plaque:new FormControl('',Validators.required) ,
    // type_vehicule:new FormControl('',Validators.required) ,
    // foto:new FormControl('') ,
    if(this.user_form.controls.plaque.status=='VALID'&&
      this.user_form.controls.type_vehicule.status=='VALID'&&
      this.croppedImage){

      let formData = new FormData();

      formData.append("id",this.activatedRoute.snapshot.url[1].path)
      formData.append("plaque",this.user_form.value.plaque)
      formData.append("nombre",this.user_form.value.nombre)
      formData.append("type_vehicule",this.user_form.value.type_vehicule)
      formData.append("blob",this.croppedImage)
      formData.append("old_plaque",this.old_plaque)

     
      this.info_service1.updateVehicule(formData).subscribe
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
 
        this.router.navigate(['transport/vehicules']);
 
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


