import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InfoTransportService } from '../../../../services/info-transport.service';
import { InfoService } from '../../../../services/info.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute, } from '@angular/router';
import { DefaultLayoutComponent } from '../../../../containers';
import { ConnexionService } from '../../../../services/connexion.service';

@Component({
  selector: 'app-zones-update',
  templateUrl: './zones-update.component.html',
  styleUrls: ['./zones-update.component.scss']
})
export class ZonesUpdateComponent implements OnInit {
  user_form=new FormGroup({
  
    zone_id:new FormControl('',Validators.required) ,
    latitude:new FormControl('',Validators.required) ,
    longitude:new FormControl('',Validators.required) ,
  })

  old_zone
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

    this.info_service1.getOne_zone(this.activatedRoute.snapshot.url[3].path).subscribe
    (res=>{

      // console.log(res)
      // console.log(res.pwd)

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        console.log(res)
        

      this.user_form.get("zone_id").setValue(res.zoneInfo[0].ZONE_NAME);
      this.user_form.get("latitude").setValue(res.zoneInfo[0].ZONE_LATITUDE);
      this.user_form.get("longitude").setValue(res.zoneInfo[0].ZONE_LONGITUDE);

      this.old_zone=res.zoneInfo[0].ZONE_NAME

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

    if(this.user_form.controls.latitude.status=='VALID'&&
      this.user_form.controls.longitude.status=='VALID'&&
      this.user_form.controls.zone_id.status=='VALID'){

      let formData = new FormData();

      formData.append("id",this.activatedRoute.snapshot.url[3].path)
      formData.append("longitude",this.user_form.value.longitude)
      formData.append("latitude",this.user_form.value.latitude)
      formData.append("zone",this.user_form.value.zone_id)
      formData.append("old_zone",this.old_zone)
      formData.append("tokenKey",sessionStorage.getItem('tokenKey'))
     
         this.info_service1.updateZone(formData).subscribe
   (res=>{

     this.approot.progressBar=false;
     
     if(res.response=="non"){
       if (res.message=="exist") {alert("CETTE ZONE") }else {alert("PROBLEME SERVEUR")}
     }else{
      alert('ENREGISTREMENT AVEC SUCCES') 

    let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/transport/localite/'+this.activatedRoute.snapshot.url[1].path+'/'+this.activatedRoute.snapshot.url[2].path]);
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
}


