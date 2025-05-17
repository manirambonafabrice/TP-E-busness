import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-rapport1',
  templateUrl: './rapport1.component.html',
  styleUrls: ['./rapport1.component.scss']
})
export class Rapport1Component implements OnInit {
  myStyle = {'width.%': 100,'justify-content': 'center','align-items': 'center',}

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  chartCallback: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
        chart.reflow();
    },0);
}

  
  constructor() { }

  ngOnInit(): void {
  }



  chartCallback1: Highcharts.ChartCallbackFunction = function (chart): void {
    setTimeout(() => {
        chart.reflow();
    },0);
}
  

  ngAfterViewInit() {
    setTimeout(() => {
     
    },100);
   }
}



