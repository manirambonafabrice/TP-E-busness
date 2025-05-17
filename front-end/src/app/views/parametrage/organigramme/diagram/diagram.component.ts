import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as go from 'gojs';
import { DefaultLayoutComponent } from '../../../../containers';
import { InfoService } from '../../../../services/info.service';
import html2canvas from 'html2canvas';
const $ = go.GraphObject.make;
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  infos
  appComp: DiagramComponent = this;

 private diagram: go.Diagram = new go.Diagram();
 private palette: go.Palette = new go.Palette();

 @ViewChild('diagramDiv',{static:true})
 private diagramRef: ElementRef;

 @ViewChild('paletteDiv',{static:true})
 private paletteRef: ElementRef;
 
//  @ViewChild('diagramDiv',{static:true}) screen: ElementRef;
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
         { name: 'SHAPE',fill: "color",
 portId: "",  // now the Shape is the port, not the whole Node
 fromSpot: go.Spot.BottomCenter,  // port properties go on the port!
//  toSpot: go.Spot.Top,
 toSpot: go.Spot.TopSide ,
 fromLinkable: true, toLinkable: true,
 alignment: go.Spot.Center,
//  strokeWidth: 0,

//  width: 100, height: 100,
 
},
     new go.Binding('fill', 'color', (c, panel) => {
      
       return c;
     })
     
   ),
   $(go.Panel, "Table",
          { margin: 1,
            //  minSize: new go.Size(50, NaN),
             maxSize: new go.Size(150, NaN) 
            },
          // the two TextBlocks in column 0 both stretch in width
          // but align on the left side
          $(go.RowColumnDefinition,
            {
              column: 0,
              stretch: go.GraphObject.Horizontal,
              alignment: go.Spot.Center
            }),
   $(go.TextBlock,
     { margin: 2,textAlign: "center" , wrap: go.TextBlock.WrapDesiredSize},
     new go.Binding("text"),
     
     )
        ) 
        ) 
       
 );
 

var nodeDataArray = JSON.parse(sessionStorage.getItem('service_ou_hierarchie')).diagramNodeData
//   var nodeDataArray = [

//   { key: "Alpha",text: "Alpha1",color: "orange", loc: "0 0", highlight: false },
//   { key: "Beta",text: "Beta1", color: "lightgreen", loc: "100 50", highlight: true },
//   { key: "Gamma",text: "Gamma1",color: "pink", loc: "-530 100" }  // highlight property undefined: use defaults
// ];
var linkDataArray = JSON.parse(sessionStorage.getItem('service_ou_hierarchie')).diagramLinkData
//   var linkDataArray = [
//   { from: "Alpha", to: "Beta", fromPort: 't', toPort: 't' }
// ];

var classe= new go.GraphLinksModel(nodeDataArray, linkDataArray);

this.diagram.initialContentAlignment = go.Spot.Center;

this.diagram.linkTemplate =
$(go.Link, 
  { routing: go.Link.AvoidsNodes ,corner: 10 },
  { corner: 5, relinkableFrom: true, relinkableTo: true },
  $(go.Shape, { strokeWidth: 2, stroke: "blue" }));  // the link shape
// $(go.Link,
//  { relinkableFrom: true, relinkableTo: true },
//  $(go.Shape,{ strokeWidth: 3, stroke: "#333" }),
// //  $(go.Shape, { toArrow: "Standard" }),
// );


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
console.log(state11)
sessionStorage.setItem("service_ou_hierarchie",JSON.stringify(state11)); 
let formData = new FormData();

formData.append("data",JSON.stringify(state11))

  this.info_service.update_service_ou_hierarchie(formData).subscribe
(res=>{

this.approot.progressBar=false;

if(res.response=="non"){
alert("PROBLEME SERVEUR")
}else{
alert('ENREGISTREMENT AVEC SUCCES') 
this.router.navigateByUrl('/parametrage/hierarchie', { skipLocationChange: true }).then(() => {
 this.router.navigate(['parametrage/hierarchie']);
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
    this.downloadLink.nativeElement.download = 'Organigramme.png';
    this.downloadLink.nativeElement.click();
  });
}
}
