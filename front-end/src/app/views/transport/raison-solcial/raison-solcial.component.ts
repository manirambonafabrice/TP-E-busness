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
  selector: 'app-raison-solcial',
  templateUrl: './raison-solcial.component.html',
  styleUrls: ['./raison-solcial.component.scss']
})
export class RaisonSolcialComponent implements OnInit {

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

    if (JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON>0) {
      this.router.navigate(["transport/raison_social/"+JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON]);
    }
    

    this.dtOptions = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes.transport/list_raisons_solciales",
                type:"GET"
            },
      columns: [{
        title: 'RAISON SOCIALE',
        data: 'RAISON'
      },{
        title: 'NIF',
        data: 'NIF'
      },{
        title: 'RC',
        data: 'RC'
      },
      {
        title: 'TEL',
        data: 'TEL'
      },{
        title: 'Actions',
        data: 'ACTION'
      }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES RAISONS SOCIALES'},
      ]
    };
    var self = this;

    $(document).on( 'click', '.getDetailsRaison', function (event) {
      

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

  this.approot.progressBar=false;
  }


  submit(){


    if(this.user_form.controls.NIF.status=='VALID'&&
      this.user_form.controls.raison.status=='VALID'&&
      this.user_form.controls.RC.status=='VALID'&&
      this.user_form.controls.TEL.status=='VALID'){

      let formData = new FormData();

      formData.append("raison",this.user_form.value.raison)
      formData.append("NIF",this.user_form.value.NIF)
      formData.append("RC",this.user_form.value.RC)
      formData.append("TEL",this.user_form.value.TEL)
      formData.append("blob",this.croppedImage)

     
         this.info_service1.addRaison(formData).subscribe
   (res=>{

     this.approot.progressBar=false;
     
     if(res.response=="non"){
       if (res.message=="exist") {alert("CETTE RAISON SOCIALE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
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
    this.router.navigate(['/transport/raison_social/'+id]);
  }

  supprimer(id){
    this.approot.progressBar=true;

    this.info_service1.delete_raison(id).subscribe
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


