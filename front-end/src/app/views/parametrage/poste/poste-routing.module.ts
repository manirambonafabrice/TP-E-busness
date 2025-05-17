import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateOuComponent } from '../ou/update-ou/update-ou.component';
import { PosteComponent } from './poste.component';
import { UpdatePostComponent } from './update-post/update-post.component';

const routes: Routes = [
  
  {
    path: '',
    data: {
    title: 'Postes list'
    },children: [
      {
        path: '',
        
        redirectTo:'list_posts'
        // component: PosteComponent,
        // data: {
        //   title: 'Liste des postes'
        //   }
      },
      {
        path: 'list_posts',
        component: PosteComponent,
        data: {
        title: 'Liste des postes'
        }
        },
      {
        path: 'update/:id',
        component: UpdatePostComponent,
        data: {
        title: 'update post'
        },
        },
        
      ],
    
   },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosteRoutingModule { }
