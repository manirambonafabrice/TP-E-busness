import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FluxCongeComponent } from './flux-conge.component';

const routes: Routes = [
  {
    path: '',
    data: {
    title: 'flux de demande de congé'
    },children: [
      
      {
        path: '',
        component: FluxCongeComponent,
        data: {
        title: ''
        }
        },
        
      ],
    
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FluxCongeRoutingModule { }
