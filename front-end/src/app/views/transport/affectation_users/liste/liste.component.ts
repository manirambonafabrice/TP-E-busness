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
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  user_form=new FormGroup({
  
    plaque:new FormControl('',Validators.required) ,
    type_vehicule:new FormControl('',Validators.required) ,
    foto:new FormControl('') ,
  })



title="LISTE DES EMPLOYES AFFECTES AU POINT FOCAL"



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
    this.dtOptions = {
      // serverSide:true,
      // ajax: 'https://l-lin.github.io/angular-datatables/data/data.json',
      ajax: {
                url:this.connexion.base_url+"routes.transport/list_users_point/"+this.activatedRoute.snapshot.url[2].path,
                type:"GET",
                headers: {          
                  "Authorization": 'Bearer '+sessionStorage.getItem("tokenKey")+' '+JSON.parse(sessionStorage.getItem("usersession")).data.ID

                }
            },
      columns: [{
        title: 'NOM & PRENOM',
        data: 'NOM_PRENOM'
      },{
        title: 'TELEPHONE',
        data: 'TEL'
      },
     {
        title: 'POINT FOCAL',
        data: 'APPELATION'
      },
      {
         title: 'LOCALITEL',
         data: 'LOCALITE'
       },
       {
          title: 'ZONE',
          data: 'ZONE'
        },
        {
           title: 'COMMUNE',
           data: 'COMMUNE'
         },
         {
            title: 'PROVINCE',
            data: 'PROVINCE'
          }],
      blengthChange: false,
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: 'lBfrtip',
      // Configure the buttons
      buttons: [
        {extend: 'excel', title: 'LISTE DES EMPLOYES AFFECTES AU POINT FOCAL '},
      ]
    };

    console.log(this.dtOptions)

      this.info_service1.getOne_point(this.activatedRoute.snapshot.url[2].path).subscribe
      (res=>{
  
        if(res.response=="non"){
          console.log("PROBLEME DE SERVEUR")
        }else{
    console.log(res.point.length)
          if(res.point.length>0)this.title="LISTE DES EMPLOYES AFFECTES AU POINT FOCAL "+res.point[0].APPELLATION_POINT+" "+res.point[0].LOCALITE+" de la zone "+res.point[0].ZONE_NAME+" commune "+res.point[0].COMMUNE_NAME
         

          // var self = this;
      
        //   $(document).on( 'click', '.getDetailsvehicule', function (event) {
        //     // alert()
      
        //     var id=$(this).attr('id').split("-")
      
        //     if (id[0]=="mod") {
        //       self.modifier(id[1]);
        //     }
      
        //     event.stopImmediatePropagation();
           
        // } );

        }
        
        this.approot.progressBar=false;
      },
      error=>{
        console.log(error)
        this.approot.progressBar=false;
      })

  }




  
  modifier(id){
    this.router.navigate(['/transport/vehicules/'+id]);
  }

}


