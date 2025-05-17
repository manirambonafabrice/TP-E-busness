import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import * as go from 'gojs';
// import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import produce from "immer";
import { AppComponent } from '../../../app.component';
import { DefaultLayoutComponent } from '../../../containers';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-flux-conge',
  templateUrl: './flux-conge.component.html',
  styleUrls: ['./flux-conge.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FluxCongeComponent implements OnInit {

  show_diag=false

  // kkk=sessionStorage.getItem('foto')

constructor(private cdr: ChangeDetectorRef,private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent) {
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
    this.info_service.flux_dem_cong().subscribe
    (res=>{

      if(res.response=="non"){
        alert('Problème de connexion au serveur')  
      }else{
        
        // console.log(res.data.state)
        // sessionStorage.setItem("flux",JSON.stringify(res.data.state));
    
      }
      
    },
    error=>{
      console.log(error)

    })
    // console.log(JSON.parse(sessionStorage.getItem('flux')))
    // this.model.linkFromPortIdProperty = "fromPort"; 
    // this.model.linkToPortIdProperty = "toPort";
  }

  

  title = 'Flux des notifications de demande de congé';

  
  model = 
  new go.GraphLinksModel(
    // JSON.parse(sessionStorage.getItem('array_node')),
    // JSON.parse(sessionStorage.getItem('array_link'))
    [
      
      { key: 1, text: "Alpha", color: "lightblue"  , loc: "0 0" },
      { key: 2, text: "Beta", color: "orange"      , loc: "100 0" },
      { key: 3, text: "Gamma", color: "lightgreen" , loc: "0 100" },
      { key: 4, text: "Delta", color: "pink"       , loc: "100 100" }
    ],
    [
      // { key: -1,from: 1, to: 2 },
      // { key: -2,from: 1, to: 3 },
      // { key: -3,from: 2, to: 2 },
      // { key: -4,from: 3, to: 4 },
      // { key: -5,from: 4, to: 1 }
      { key: -1,from: 1, to: 2 ,fromPort: 't', toPort: 'b'},
      { key: -2,from: 1, to: 3 , fromPort: 't', toPort: 't'},
      // { key: -3,from: 2, to: 2 ,fromPort: 'r', toPort: 'l'},
      { key: -4,from: 3, to: 4 , fromPort: 't', toPort: 't'},
      { key: -5,from: 4, to: 1 , fromPort: 't', toPort: 't'}
    ]
    );

    // model.
    

  @ViewChild('text',{static: true})

  private textField: ElementRef;

  data: any;
  node: go.Node;

  showDetails(node: go.Node | null) {
    this.node = node;
    if (node) {
      // copy the editable properties into a separate Object
      this.data = {
        text: node.data.text,
        color: node.data.color
      };
    } else {
      this.data = null;
    }
  }

  onCommitDetails() {
    if (this.node) {
      const model = this.node.diagram.model;
      // copy the edited properties back into the node's model data,
      // all within a transaction
      model.startTransaction();
      model.setDataProperty(this.node.data, "text", this.data.text);
      model.setDataProperty(this.node.data, "color", this.data.color);
      model.commitTransaction("modified properties");
      
    }

    console.log(this.model)
  }

  onCancelChanges() {
    // wipe out anything the user may have entered
    this.showDetails(this.node);
  }

  onModelChanged(c: go.ChangedEvent) {
    // who knows what might have changed in the selected node and data?
    this.showDetails(this.node);
  }

  diagramModelChange(event){
    alert(event)
  }

}
