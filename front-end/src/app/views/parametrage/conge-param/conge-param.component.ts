import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-conge-param',
  templateUrl: './conge-param.component.html',
  styleUrls: ['./conge-param.component.scss']
})
export class CongeParamComponent implements OnInit {

  auth_form=new FormGroup({
    nb_jour:new FormControl('',Validators.required),
    nb_jour_ajout:new FormControl('',Validators.required),
    nb_annee:new FormControl('',Validators.required),
    regulier:new FormControl(''),
    nb_jour_ajout1:new FormControl(''),
    nb_annee1:new FormControl(''),
    nb_jour_ajout2:new FormControl(''),
    nb_annee2:new FormControl(''),
    nb_jour_ajout3:new FormControl(''),
    nb_annee3:new FormControl(''),
    nb_jour_ajout4:new FormControl(''),
    nb_annee4:new FormControl(''),
    temps:new FormControl('',Validators.required),
  })

  add1=false
  add2=false
  add3=false
  add4=false
 infos
 check
checked=false


  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent ) 
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

    
    this.info_service.conge_param().subscribe
    (res=>{

      if(res.response=="non"){
        alert("PROBLEME DE SERVEUR")
      }else{
    // console.log(res.result)
this.infos=res.result
this.check=res.result[0].STATUT_REPETION
if(res.result[0].STATUT_REPETION==1){
  this.checked=true
}

this.auth_form.get("nb_jour").setValue(res.result[0].NOMBRE_JOUR_INTILIALE);
this.auth_form.get("nb_jour_ajout").setValue(res.result[0].NOMBRE);
this.auth_form.get("nb_annee").setValue(res.result[0].ANS);
this.auth_form.get("temps").setValue(res.result[0].MOIS_MINIMUM);
        
// console.log(res.result)
var i=0
res.result.forEach(val => {
  if(i==1){
    this.add1=true
    this.auth_form.get("nb_jour_ajout1").setValue(val['NOMBRE']);
    this.auth_form.get("nb_annee1").setValue(val['ANS']);
  }
  if(i==2){
    this.add2=true
    this.auth_form.get("nb_jour_ajout2").setValue(val['NOMBRE']);
    this.auth_form.get("nb_annee2").setValue(val['ANS']);
  }
  if(i==3){
    this.add3=true
    this.auth_form.get("nb_jour_ajout3").setValue(val['NOMBRE']);
    this.auth_form.get("nb_annee3").setValue(val['ANS']);
  }
  if(i==4){
    this.add4=true
    this.auth_form.get("nb_jour_ajout4").setValue(val['NOMBRE']);
    this.auth_form.get("nb_annee4").setValue(val['ANS']);
  }

  i++
});
      }
      
    },
    error=>{
      console.log(error)
      this.approot.progressBar=false;
    })
  }



  controle_input(type,id){
// alert(id)
    if(type=='add'){
      switch(id){
        case 1:this.add1=true 
        break
        case 2:this.add2=true 
        break
        case 3:this.add3=true 
        break
        case 4:this.add4=true 
        break
        default:
      }
    }
    if(type=='remove'){
      switch(id){
        case 1:this.add1=false 
        this.auth_form.get("nb_jour_ajout1").setValue("");
        this.auth_form.get("nb_annee1").setValue("");
        break
        case 2:this.add2=false 
        this.auth_form.get("nb_jour_ajout2").setValue("");
        this.auth_form.get("nb_annee2").setValue("");
        break
        case 3:this.add3=false 
        this.auth_form.get("nb_jour_ajout3").setValue("");
        this.auth_form.get("nb_annee3").setValue("");
        break
        case 4:this.add4=false 
        this.auth_form.get("nb_jour_ajout4").setValue("");
        this.auth_form.get("nb_annee4").setValue("");
        break
        default:
      }
    }
  }


  handleChange(){
    // alert(this.auth_form.value.regulier)
    if(this.auth_form.value.regulier){
      this.checked=true
      this.add1=false
      this.add2=false
      this.add3=false
      this.add4=false

      this.auth_form.get("nb_jour_ajout1").setValue("");
      this.auth_form.get("nb_annee1").setValue("");
      this.auth_form.get("nb_jour_ajout2").setValue("");
      this.auth_form.get("nb_annee2").setValue("");
      this.auth_form.get("nb_jour_ajout3").setValue("");
      this.auth_form.get("nb_annee3").setValue("");
      this.auth_form.get("nb_jour_ajout4").setValue("");
      this.auth_form.get("nb_annee4").setValue("");
    }else
    this.checked=false
  }

  
  submit_form(){
   
    // console.log(this.user_form.controls.service.status)
    
        if(this.auth_form.controls.nb_jour.status=='VALID'&&
        this.auth_form.controls.nb_jour_ajout.status=='VALID'&&
        this.auth_form.controls.temps.status=='VALID'&&
        this.auth_form.controls.nb_annee.status=='VALID'){
    
          let formData = new FormData();
    
    
    
          formData.append("nb_jour",this.auth_form.value.nb_jour)
          formData.append("nb_jour_ajout",this.auth_form.value.nb_jour_ajout)
          formData.append("nb_annee",this.auth_form.value.nb_annee)
          formData.append("temps",this.auth_form.value.temps)
          formData.append("regulier",this.auth_form.value.regulier)
          formData.append("nb_jour_ajout1",this.auth_form.value.nb_jour_ajout1)
          formData.append("nb_annee1",this.auth_form.value.nb_annee1)
          formData.append("nb_jour_ajout2",this.auth_form.value.nb_jour_ajout2)
          formData.append("nb_annee2",this.auth_form.value.nb_annee2)
          formData.append("nb_jour_ajout3",this.auth_form.value.nb_jour_ajout3)
          formData.append("nb_annee3",this.auth_form.value.nb_annee3)
          formData.append("nb_jour_ajout4",this.auth_form.value.nb_jour_ajout4)
          formData.append("nb_annee4",this.auth_form.value.nb_annee4)

          // console.log(str)
             this.info_service.change_conge_param(formData).subscribe
       (res=>{
    
         this.approot.progressBar=false;
         
         if(res.response=="non"){
           alert("PROBLEME SERVEUR")
         }else{
          alert('ENREGISTREMENT AVEC SUCCES') 
          
         }
         
       },
       error=>{
         console.log(error)
         this.approot.progressBar=false;
       })
    
        }else{
          alert('VERIFIER BIEN VOS CHAMPS')
            
        }
      }
}
