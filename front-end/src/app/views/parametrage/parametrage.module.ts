import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageRoutingModule } from './parametrage-routing.module';
// import { FluxCongeComponent } from './flux-conge/flux-conge.component';
import { OrganigrammeComponent } from './organigramme/organigramme.component';
import { DiagramComponent } from './organigramme/diagram/diagram.component';
import { InspectorComponent } from './organigramme/inspector/inspector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { PosteComponent } from './poste/poste.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CongeParamComponent } from './conge-param/conge-param.component';
// import { DetailComponent } from './conge-tout/detail/detail.component';

// import { CongeToutComponent } from './conge-tout/conge-tout.component';
// import { CongeSoldeUserComponent } from './conge-solde-user/conge-solde-user.component';
// import { CongeInitComponent } from './conge-init/conge-init.component';
// import { CongeInitModifComponent } from './conge-init/conge-init-modif/conge-init-modif.component';

// import { FonctionComponent } from './fonction/fonction.component';



@NgModule({
  declarations: [
    
    OrganigrammeComponent,
    DiagramComponent,
    InspectorComponent,
    CongeParamComponent,
    // DetailComponent,
    // CongeToutComponent,
    // CongeSoldeUserComponent,
    // CongeInitComponent,
    // CongeInitModifComponent,
    
    // PosteComponent,
    
  ],
  imports: [
    CommonModule,
    ParametrageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule
  ]
})
export class ParametrageModule { }
