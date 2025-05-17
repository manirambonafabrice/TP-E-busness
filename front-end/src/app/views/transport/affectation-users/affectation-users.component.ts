import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { InfoTransportService } from '../../../services/info-transport.service';
import { InfoService } from '../../../services/info.service';


@Component({
  selector: 'app-affectation-users',
  templateUrl: './affectation-users.component.html',
  styleUrls: ['./affectation-users.component.scss']
})
export class AffectationUsersComponent implements OnInit {

  role
  users
  id_role=1
  nom_role="SUPER ADMIN"
  ses_url=[]
  points=[]
  id_raison=JSON.parse(sessionStorage.getItem("usersession")).data.ID_RAISON
  task = {
    name: 'Cocher Tout',
    completed: false,
    color: 'primary',
    subtasks: [
      
    ],
  };
 


  user_form=new FormGroup({
    nom:new FormControl('',Validators.required),
    points:new FormControl('',Validators.required),
    urls:new FormControl('')
  })
  
  user_form1=new FormGroup({
    nom1:new FormControl('',Validators.required),
    

  })


  constructor(private info_service:InfoService,private info_service1:InfoTransportService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent,private activatedRoute: ActivatedRoute ) 
  { 

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
    this.approot.progressBar=true;
 
    this.info_service1.get_users().subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        // console.log(window.location.href)
        
        this.role=res.role
        this.users=res.users

        this.task.subtasks=res.users
      
        //  this.router.url;
      // console.log(res.role);
      // console.log(res.urls);
      // this.get_urls(this.id_role)
  
      }
      
      this.approot.progressBar=false;
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })

    this.info_service1.get_points().subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        console.log(res.points)
        this.points=res.points
        // this.updateAllComplete()
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })  
  }










      saves_permissions(){

        if(this.user_form.controls.points.status=='VALID'){

                  this.approot.progressBar=true;
            
                  let formData = new FormData();

            
                  formData.append("id_point",""+this.user_form.value.points)
                  formData.append("users",JSON.stringify(this.task.subtasks))

                  console.log(this.task.subtasks)
                
        
                     this.info_service1.saves_affectation(formData).subscribe
               (res=>{
            
                 this.approot.progressBar=false;
                 
                 if(res.response=="non"){
                   if (res.message=="exist") {alert("CE ROLE EXISTE DEJA") }else {alert("PROBLEME SERVEUR")}
                 }else{
                  alert('ENREGISTREMENT AVEC SUCCES') 

                  // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                  //   this.router.navigate(['parametrage/roles']);

                  // });

                 }
                 
               },
               error=>{
                 console.log(error)
                 this.approot.progressBar=false;
               })
              }else{
                alert("VEILLEZ D'ABORD SELECTIONER LE POINT FOCAL")
              }

      }



//MAT-CHECK-BOX
      allComplete: boolean = false;

  updateAllComplete() {
    // alert();
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }


  select_point(objet){
    // alert(id)
    console.log(objet.value)
    if(objet.value>0)
    this.info_service1.get_users_points(objet.value).subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
        console.log(res.points)
        this.ses_url=res.users_id
       var i=0
        res.users_id.forEach(val => {

                Object.assign(this.task.subtasks.find( ({ ID }) => ID === val ),{completed: true});   
                i++
            });
            // console.log(this.task.subtasks)
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })  
    
  }

  Liste(){
    if(this.user_form.controls.points.status=='VALID'){
      this.router.navigate(['transport/affection_users/liste/'+this.user_form.value.points]);
    }else{
      this.router.navigate(['transport/affection_users/liste/0']);
    }
  }
  
}
