import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs'

const $=go.GraphObject.make
@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParametrageComponent implements OnInit {

  diagram:go.Diagram=null

  constructor() { }

  ngOnInit(): void {
  }


  ngQfterViewInit(){
    this.diagram=$(go.Diagram,'myDiagramDiv')
  }
  
}
