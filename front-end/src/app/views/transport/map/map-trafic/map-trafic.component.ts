import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Browser, Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map-trafic',
  templateUrl: './map-trafic.component.html',
  styleUrls: ['./map-trafic.component.scss']
})
export class MapTraficComponent implements OnInit, AfterViewInit {
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() { 
    // -3.4353503,29.8839654

    const initialState = { lng:29.8839654, lat: -3.4353503, zoom: 9 };

    const lefletMap: Map = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);
  
    const isRetina = Browser.retina;
    const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";
    
    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: '',
      apiKey: '1f821b7e3f39438ca1a417d2036ef7a3',
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(lefletMap);
  }


}
