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
  selector: 'app-raison-social-update',
  templateUrl: './raison-social-update.component.html',
  styleUrls: ['./raison-social-update.component.scss']
})
export class RaisonSocialUpdateComponent implements OnInit {


  user_form=new FormGroup({
  
    raison:new FormControl('',Validators.required) ,
    NIF:new FormControl('',Validators.required) ,
    RC:new FormControl('',Validators.required) ,
    TEL:new FormControl('',Validators.required) ,
    foto:new FormControl('') ,
  })

  imageChangedEvent: any = '';
croppedImage: any = '';
canvasRotation = 0;
rotation = 0;
scale = 1;
showCropper = false;
containWithinAspectRatio = false;
transform: ImageTransform = {};
posteInfo_filtre: any = '';



  old_raison
  old_RC
  old_NIF
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
    
    this.info_service1.getOne_raison(this.activatedRoute.snapshot.url[1].path).subscribe
    (res=>{

      // console.log(res)
      // console.log(res.pwd)

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        console.log(res)
        

      this.user_form.get("TEL").setValue(res.raisonInfo[0].TEL);
      this.user_form.get("RC").setValue(res.raisonInfo[0].RC);
      this.user_form.get("NIF").setValue(res.raisonInfo[0].NIF);
      this.user_form.get("raison").setValue(res.raisonInfo[0].RAISON_SOCIAL);

      this.old_raison=res.raisonInfo[0].RAISON_SOCIAL
      this.old_RC=res.raisonInfo[0].RC
      this.old_NIF=res.raisonInfo[0].NIF

      // this.ou_old=res.ouInfo[0].DESCRIPTION
      // this.usernameold=res.user[0].USERNAME
      // this.type_user=res.user[0].IEXT
        
      }
      
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })

  }


  submit(){


    if(this.user_form.controls.NIF.status=='VALID'&&
      this.user_form.controls.raison.status=='VALID'&&
      this.user_form.controls.RC.status=='VALID'&&
      this.user_form.controls.TEL.status=='VALID'){

      let formData = new FormData();

      formData.append("id",this.activatedRoute.snapshot.url[1].path)
      formData.append("raison",this.user_form.value.raison)
      formData.append("NIF",this.user_form.value.NIF)
      formData.append("RC",this.user_form.value.RC)
      formData.append("TEL",this.user_form.value.TEL)
      formData.append("old_raison",this.old_raison)
      formData.append("old_RC",this.old_RC)
      formData.append("old_NIF",this.old_NIF)
      formData.append("blob",this.croppedImage)

     
         this.info_service1.updateRaison(formData).subscribe
   (res=>{

     this.approot.progressBar=false;
     
     if(res.response=="non"){
       if (res.message=="exist") {alert("CETTE RAISON SOCIALE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
     }else{
      alert('ENREGISTREMENT AVEC SUCCES') 

    let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['transport/raison_social']);
        // console.log(currentUrl);
    // });
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
}


