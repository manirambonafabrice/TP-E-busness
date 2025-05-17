import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './services/auto-guard.service';
import { CongeHistoriqueComponent } from './views/conge/conge-historique/conge-historique.component';
import { DetailCongeComponent } from './views/conge/detail-conge/detail-conge.component';
import { MesCongesComponent } from './views/conge/mes-conges/mes-conges.component';
import { ModifierCongeComponent } from './views/conge/modifier-conge/modifier-conge.component';
import { PdfCongeComponent } from './views/conge/pdf-conge/pdf-conge.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { NotificationCongeComponent } from './views/notifications/notification-conge/notification-conge.component';
import { TraiterCongeComponent } from './views/notifications/traiter-conge/traiter-conge.component';
import { PresenceComponent } from './views/presence/presence.component';
import { AffectationUsersComponent } from './views/transport/affectation-users/affectation-users.component';
import { ListeComponent } from './views/transport/affectation_users/liste/liste.component';
import { ItineraireComponent } from './views/transport/itineraire/itineraire.component';
import { CommunesComponent } from './views/transport/localites/communes/communes.component';
import { LocalitesComponent } from './views/transport/localites/localites.component';
import { ZonesUpdateComponent } from './views/transport/localites/zones-update/zones-update.component';
import { ZonesComponent } from './views/transport/localites/zones/zones.component';
import { MapTraficComponent } from './views/transport/map/map-trafic/map-trafic.component';
import { CommunesPointComponent } from './views/transport/point_de_vente/communes-point/communes-point.component';
import { PointFocalUpdateComponent } from './views/transport/point_de_vente/point-focal-update/point-focal-update.component';
import { PointFocalComponent } from './views/transport/point_de_vente/point-focal/point-focal.component';
import { ProvincePointComponent } from './views/transport/point_de_vente/province-point/province-point.component';
import { ZonePointComponent } from './views/transport/point_de_vente/zone-point/zone-point.component';
import { RaisonSolcialComponent } from './views/transport/raison-solcial/raison-solcial.component';
import { RaisonSocialUpdateComponent } from './views/transport/raison_solcial/raison-social-update/raison-social-update.component';
import { Rapport1Component } from './views/transport/rapports/rapport1/rapport1.component';
import { Rapport2Component } from './views/transport/rapports/rapport2/rapport2.component';
import { TrajetComponent } from './views/transport/trajet/trajet.component';
import { UpdateTrajetComponent } from './views/transport/trajet/update-trajet/update-trajet.component';
import { UpdateVehiculeComponent } from './views/transport/vehicules/update-vehicule/update-vehicule.component';
import { VehiculesComponent } from './views/transport/vehicules/vehicules.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',canActivate: [AuthGuard],
    // path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'accueil',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/list-users.module').then(m => m.ListUsersModule)
      },
      
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'parametrage',
        loadChildren: () => import('./views/parametrage/parametrage.module').then(m => m.ParametrageModule)
      },
      {
        path: 'conge',
        
        data: {
        title: ''
        }
        ,children: [
          
          // {
          //   path: '',
          //   redirectTo:'list'
          
          // },
          {
            path: 'demande',
            component: MesCongesComponent,
            data: {
            title: 'Demande de congé'
            }
          },
          {
            path: 'historique',
            component: CongeHistoriqueComponent,
            data: {
            title: 'Historique de mes congé'
            }
          },{
            path: 'modifier/:id',
            component: ModifierCongeComponent,
            data: {
            title: 'Modification d\'une demande congé'
            }
          },{
            path: 'detail/:id',
            component: DetailCongeComponent,
            data: {
            title: 'Détail d\'une demande congé'
            }
          },{
            path: 'pdf/:id',
            component: PdfCongeComponent,
            data: {
            title: 'PDF d\'une demande congé'
            }
          }
        ]
        },
        {
          path: 'notifications',
          
          data: {
          title: ''
          }
          ,children: [
            
            // {
            //   path: '',
            //   redirectTo:'list'
            
            // },
            {
              path: 'notification_conge',
              component: NotificationCongeComponent,
              data: {
              title: 'Notifications des demandes de congé'
              }
            
            },{
              path: 'traiter_conge/:id',
              component: TraiterCongeComponent,
              data: {
              title: 'Traitement d\'une demande de congé'
              }
            
            }
          ]
          },
          {
            path: 'transport',
            
            data: {
            title: ''
            }
            ,children: [
              
              // {
              //   path: '',
              //   redirectTo:'list'
              
              // },
              {
                path: 'localite',
                component: LocalitesComponent,
                data: {
                title: 'Listes des provinces'
                }
              
              },{
                path: 'localite/:id',
                component: CommunesComponent,
                data: {
                title: 'listes des communes'
                }
              
              },{
                path: 'localite/:id/:id',
                component: ZonesComponent,
                data: {
                title: 'listes des zones'
                }
              
              },{
                path: 'zone_update/:id/:id/:id',
                component: ZonesUpdateComponent,
                data: {
                title: 'listes des zones'
                }
              
              },
              {
                path: 'raison_social',
                component: RaisonSolcialComponent,
                data: {
                title: 'Listes des raisons sociales'
                }
              
              },
              {
                path: 'raison_social/:id',
                component: RaisonSocialUpdateComponent,
                data: {
                title: 'Modification raison sociale'
                }
              
              },
              {
                path: 'vehicules',
                component: VehiculesComponent,
                data: {
                title: 'Listes des vehicules'
                }
              
              },
              {
                path: 'vehicules/:id',
                component: UpdateVehiculeComponent,
                data: {
                title: 'Modification vehicule'
                }
              
              },
              {
                path: 'point_de_vente',
                component: PointFocalComponent,
                data: {
                title: 'Les points focaux (Bureaux)'
                }
              
              }
              ,
              {
                path: 'point_de_vente/:id',
                component: ProvincePointComponent,
                data: {
                title: 'Les points  focaux (Bureaux) de la Province'
                }
              
              },
              {
                path: 'point_de_vente/:id/:id',
                component: CommunesPointComponent,
                data: {
                title: 'Les points  focaux (Bureaux) de la Commune'
                }
              
              }
              ,
              {
                path: 'point_de_vente/:id/:id/:id',
                component: ZonePointComponent,
                data: {
                title: 'Les points  focaux (Bureaux) de la Zone'
                }
              
              },
              {
                path: 'point_de_vente/:id/:id/:id/:id',
                component: PointFocalUpdateComponent,
                data: {
                title: 'Modification point du  focal (Bureau)'
                }
              
              },
              {
                path: 'affection_users',
                component: AffectationUsersComponent,
                data: {
                title: 'Affectation des employés'
                }
              
              },
              {
                path: 'affection_users/liste/:id',
                component: ListeComponent,
                data: {
                title: 'Affectation des employés'
                }
              
              },
              {
                path: 'itineraires',
                component: ItineraireComponent,
                data: {
                title: 'Nos itineraires'
                }
              
              },
              {
                path: 'trajets',
                component: TrajetComponent,
                data: {
                title: 'Plannifications des trajets'
                }
              
              },
              {
                path: 'trajets/:id',
                component: UpdateTrajetComponent,
                data: {
                title: 'Plannifications des trajets'
                }
              
              },
              {
                path: 'rapport1',
                component: Rapport1Component,
                data: {
                title: 'Plannifications des trajets'
                }
              
              },
              {
                path: 'rapport2',
                component: Rapport2Component,
                data: {
                title: 'Plannifications des trajets'
                }
              
              },
              {
                path: 'map_trafic',
                component: MapTraficComponent,
                data: {
                title: 'Plannifications des trajets'
                }
              
              }
            ]
            },{
            path: 'presence',
            component: PresenceComponent,
            data: {
            title: 'Présence'
            }
          
          }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
