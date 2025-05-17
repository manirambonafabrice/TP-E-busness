import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxCongeRoutingModule } from './flux-conge-routing.module';
import { FluxCongeComponent } from './flux-conge.component';
// import { InspectorRowComponent } from './inspector/inspector-row.component';


@NgModule({
  declarations: [
    FluxCongeComponent,
    // InspectorRowComponent
  ],
  imports: [
    CommonModule,
    FluxCongeRoutingModule
  ] 
})
export class FluxCongeModule { }
