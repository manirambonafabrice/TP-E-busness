import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { ListUsersComponent } from './list-users.component';

const routes: Routes = [

  {
    path: '',
    data: {
    title: 'Users list'
    },children: [
      {
        path: '',
        redirectTo:'list_users'
        // component: ListUsersComponent,
        // data: {
        // title: ''
        // }
      },
      {
        path: 'list_users',
        component: ListUsersComponent,
        data: {
        title: ''
        }
        },
      {
        path: 'detail/:id',
        component: DetailUserComponent,
        data: {
        title: 'Detail user'
        },
        },
        
      ],
    
   },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUsersRoutingModule { }
