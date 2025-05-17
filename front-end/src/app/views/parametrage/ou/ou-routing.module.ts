import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OuComponent } from './ou.component';
import { UpdateOuComponent } from './update-ou/update-ou.component';

const routes: Routes = [
    
      {
        path: '',
        data: {
        title: 'Gestion des unités d\'organisation'
        },children: [
          {
            path: '',
            
        redirectTo:'list_ou'
            // component: OuComponent,
            // data: {
            // title: ''
            // }
          },
          {
            path: 'list_ou',
            component: OuComponent,
            data: {
            title: ''
            }
            },
          {
            path: 'update/:id',
            component: UpdateOuComponent,
            data: {
            title: 'Modification des unités d\'organisation'
            },
            },
            
          ],
        
       },
    
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OuRoutingModule { }
