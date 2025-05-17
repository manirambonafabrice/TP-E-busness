import { HttpClient } from '@angular/common/http';
import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as go from 'gojs';
import { AppComponent } from '../../../../app.component';
import { InfoService } from '../../../../services/info.service';
@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent implements OnInit {

  user_form=new FormGroup({
    name:new FormControl(''),
    parent:new FormControl(''),
   
  })

  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:AppComponent) { }

  ngOnInit(): void {
  }

  
  public _selectedNode: go.Node;
  public data = {
    name: null,
    parent: null
  };

  @Input()
  public model;

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node) {
    if (node && node != null) {
      this._selectedNode = node;
      this.data.name = this._selectedNode.data.name;
      this.data.parent = this._selectedNode.data.parent;
    } else {
      this._selectedNode = null;
    }
  }

  public onCommitForm() {
    this.model.startTransaction();

    this.model.commitTransaction();

    console.log(this.model.Gc)

    let formData = new FormData();
    // for(var i = 0; i < this.imageChangedEvent.target.files.length; i++) {
    //     formData.append("uploads[]", this.imageChangedEvent.target.files[i], this.imageChangedEvent.target.files[i].name);
    // }


    formData.append("data",JSON.stringify(this.model.Gc))

   
   
    // var str = JSON.stringify(this.user_form.value.profil);

    // console.log(str)
       this.info_service.update_hierarchie(formData).subscribe
 (res=>{

   this.approot.progressBar=false;
   
   if(res.response=="non"){
     alert("PROBLEME SERVEUR")
   }else{
    alert('ENREGISTREMENT AVEC SUCCES') 
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['parametrage/hierarchie']);
  });
   }
   
 },
 error=>{
   console.log(error)
   this.approot.progressBar=false;
 })
  }


}
