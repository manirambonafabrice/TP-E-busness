import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as go from 'gojs';
import { DefaultLayoutComponent } from '../../../../containers';
import { InfoService } from '../../../../services/info.service';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.css']
})
export class DiagramEditorComponent implements OnInit {

  infos
   appComp: DiagramEditorComponent = this;

  private diagram: go.Diagram = new go.Diagram();
  private palette: go.Palette = new go.Palette();

  @ViewChild('diagramDiv',{static:true})
  private diagramRef: ElementRef;

  @ViewChild('paletteDiv',{static:true})
  private paletteRef: ElementRef;


  @ViewChild('canvas',{static:true}) canvas: ElementRef;
 @ViewChild('downloadLink',{static:true}) downloadLink: ElementRef;
  @Input()
  // get model(): go.Model { return this.diagram.model; }
  get model(): go.Model { return this.diagram.model; }

  set model(val: go.Model) { this.diagram.model = val; }

  @Output()
  nodeSelected = new EventEmitter<go.Node|null>();

  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  constructor(private info_service:InfoService,private http: HttpClient, private router: Router,private approot:DefaultLayoutComponent) {
    // console.log(JSON.parse(sessionStorage.getItem('flux')).diagramNodeData)
    const $ = go.GraphObject.make;

    const makePort = function(id: string, spot: go.Spot) {
      return $(go.Shape, 'Circle',
        {
          opacity: .5,
          fill: 'gray', strokeWidth: 0, desiredSize: new go.Size(8, 8),
          portId: id, alignment: spot,
          fromLinkable: true, toLinkable: true
        }
      );
    }


    // define the Node template


    this.diagram.nodeTemplate =
  $(go.Node, "Spot",
    // new go.Binding("location", "loc", go.Point.parse),
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Auto',
    $(go.Shape, 'RoundedRectangle', 
    // { stroke: null },
          { fill: "color",
  portId: "",  // now the Shape is the port, not the whole Node
  // fromSpot: go.Spot.Top,  // port properties go on the port!
  // toSpot: go.Spot.Top||go.Spot.Bottom
},
      new go.Binding('fill', 'color', (c, panel) => {
       
        return c;
      })
    ),
    $(go.TextBlock,
      { margin: 5 },
      new go.Binding("text")
      )
         ) 
         ,
        // Ports
        makePort('t', go.Spot.TopCenter),
        makePort('l', go.Spot.Left),
        makePort('r', go.Spot.Right),
        makePort('b', go.Spot.BottomCenter)
  );

var nodeDataArray = JSON.parse(sessionStorage.getItem('flux')).diagramNodeData
//   var nodeDataArray = [

//   { key: "Alpha",text: "Alpha1",color: "orange", loc: "0 0", highlight: false },
//   { key: "Beta",text: "Beta1", color: "lightgreen", loc: "100 50", highlight: true },
//   { key: "Gamma",text: "Gamma1",color: "pink", loc: "-530 100" }  // highlight property undefined: use defaults
// ];
var linkDataArray = JSON.parse(sessionStorage.getItem('flux')).diagramLinkData
//   var linkDataArray = [
//   { from: "Alpha", to: "Beta", fromPort: 't', toPort: 't' }
// ];

var classe= new go.GraphLinksModel(nodeDataArray, linkDataArray);

this.diagram.initialContentAlignment = go.Spot.Center;

this.diagram.linkTemplate =
$(go.Link,
  // allow relinking
  { relinkableFrom: true, relinkableTo: true },
  $(go.Shape),
  $(go.Shape, { toArrow: "Standard" }),
);


classe.linkFromPortIdProperty="fromPort"
classe.linkToPortIdProperty="toPort"
this.diagram.model=classe



classe.addChangedListener(function(evt) {
  if (evt.isTransactionFinished) {
  // console.log(evt)
  }
});
    var self = this;
    this.diagram.addModelChangedListener(function(evt) {
      // if (evt.isTransactionFinished) saveModel(evt.model);

      if (evt.isTransactionFinished) {self.infos=evt.model; 
        var json = evt.model.toIncrementalJson(evt);
        // var data = evt.model.toIncrementalData(evt);
        // console.log(classe)
      }
    });

    
  }

  ngOnInit() {
    this.diagram.div = this.diagramRef.nativeElement;
    // this.palette.div = this.paletteRef.nativeElement;
  }


  @ViewChild('text',{static: true})

  private textField: ElementRef;

  data: any;
  node: go.Node;

  showDetails(node: go.Node | null) {
    alert()
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


  setSelectedNode(envent){
    alert()
  }

  save(){
// console.log(this.infos.He)

this.approot.progressBar=true;
  var state11 = {
    // Diagram state props
    diagramNodeData: this.infos.He,
    diagramLinkData: this.infos.kf,
 
  };
// console.log(this.state)
sessionStorage.setItem("flux",JSON.stringify(state11)); 
let formData = new FormData();

formData.append("data",JSON.stringify(state11))

   this.info_service.update_flux(formData).subscribe
(res=>{

this.approot.progressBar=false;

if(res.response=="non"){
 alert("PROBLEME SERVEUR")
}else{
alert('ENREGISTREMENT AVEC SUCCES') 
this.router.navigateByUrl('/parametrage/flux_conge', { skipLocationChange: true }).then(() => {
  this.router.navigate(['parametrage/flux_conge']);
});
}

},
error=>{
console.log(error)
this.approot.progressBar=false;
})
  }


   
 downloadImage(){
  html2canvas(this.diagramRef.nativeElement).then(canvas => {
    // this.canvas.nativeElement.src = canvas.toDataURL();
    this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
    this.downloadLink.nativeElement.download = 'flux de notification congé.png';
    this.downloadLink.nativeElement.click();
  });
}
}
