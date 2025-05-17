import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongeInitModifComponent } from './conge-init/conge-init-modif/conge-init-modif.component';
import { CongeInitComponent } from './conge-init/conge-init.component';
import { CongeParamComponent } from './conge-param/conge-param.component';
import { CongeSoldeUserComponent } from './conge-solde-user/conge-solde-user.component';
import { CongeToutComponent } from './conge-tout/conge-tout.component';
import { DetailComponent } from './conge-tout/detail/detail.component';

import { FluxCongeComponent } from './flux-conge/flux-conge.component';
import { FonctionComponent } from './fonction/fonction.component';
import { OrganigrammeComponent } from './organigramme/organigramme.component';

import { ParametrageComponent } from './parametrage.component';

const routes: Routes = [
    {
        path: '',
        
      children: [
        {
            path: 'ou',
            loadChildren: () => import('./ou/ou.module').then(m => m.OuModule)
          },
          {
            path: 'poste',
            loadChildren: () => import('./poste/poste.module').then(m => m.PosteModule)
          },
          {
            path: 'hierarchie',
            component: OrganigrammeComponent,
            data: {
            title: 'Hierarchie de nos unités d\'organisation'
            },
           },
           {
             path: 'flux_conge',
             
            loadChildren: () => import('./flux-conge/flux-conge.module').then(m => m.FluxCongeModule),
            },
             {
               path: 'roles',
               component: FonctionComponent,
               data: {
               title: 'Gestion des Rôles'
               },
              },{
                path: 'conge_param',
                component: CongeParamComponent,
                data: {
                title: 'Parametrage des droits aux congés'
                },
               }
               ,  {
                path: 'conge_init',
                
                data: {
                title: ''
                },children: [

                  {
                    path: '',
                    data: {
                    title: 'Les congés restant'
                    },children: [

                      {
                        path: '',
                        redirectTo:'list'
                      
                      },
                      {
                        path: 'list',
                        component: CongeInitComponent,
                        data: {
                        title: ''
                        }
                        },
                    
                      {
                        path: 'modif/:id',
                        component: CongeInitModifComponent,
                        data: {
                        title: 'Update'
                        },
                        },
                    ]
                  }

                  
                    
                  ],
                
               },{
                path: 'conge_solde_user',
                component: CongeSoldeUserComponent,
                data: {
                title: 'Solde des congés'
                },
               },{
                path: 'conge_tout',
                // component: CongeToutComponent,
                data: {
                title: 'Tous les demandes de congés'
                },children: [

                      {
                        path: '',
                        redirectTo:'list'
                      
                      },
                      {
                        path: 'list',
                        component: CongeToutComponent,
                        data: {
                        title: 'Tous les demandes de congés'
                        }
                        },
                    
                      {
                        path: 'detail/:id',
                        component: DetailComponent,
                        data: {
                        title: 'Update'
                        },
                        },
                    ]
               }
               
              //  {
              //   path: 'conge_init',
              //   component: CongeInitComponent,
              //   data: {
              //   title: 'Les congés restant'
              //   },
              //  }, {
              //   path: 'conge_init_modif/:id',
              //   component: CongeInitModifComponent,
              //   data: {
              //   title: 'Modification des unités d\'organisation'
              //   },
              //   },

        ]
    }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrageRoutingModule { }
