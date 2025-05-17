import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { NgxDatesPickerModule } from 'ngx-dates-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap'; 
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';


const APP_CONTAINERS = [
  DefaultLayoutComponent
]; 

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ConnexionService } from './services/connexion.service';
import { SettingsService } from './services/settings.service';
import { AuthGuard } from './services/auto-guard.service';
import { AuthService } from './services/auth.service';
import { AuthentificationService } from './services/authentification.service';
import { ListUsersComponent } from './views/users/list-users.component';
import { DataTablesModule } from "angular-datatables";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailUserComponent } from './views/users/detail-user/detail-user.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ParametrageComponent } from './views/parametrage/parametrage.component';
import { NgFlowchartModule } from '@joelwenzel/ng-flowchart';
import { OuComponent } from './views/parametrage/ou/ou.component';
import { UpdateOuComponent } from './views/parametrage/ou/update-ou/update-ou.component';
import { PosteComponent } from './views/parametrage/poste/poste.component';
import { UpdatePostComponent } from './views/parametrage/poste/update-post/update-post.component';
import { FonctionComponent } from './views/parametrage/fonction/fonction.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MesCongesComponent } from './views/conge/mes-conges/mes-conges.component';
import { CongeHistoriqueComponent } from './views/conge/conge-historique/conge-historique.component';
import { CongeInitComponent } from './views/parametrage/conge-init/conge-init.component';
import { CongeInitModifComponent } from './views/parametrage/conge-init/conge-init-modif/conge-init-modif.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ModifierCongeComponent } from './views/conge/modifier-conge/modifier-conge.component';
import { DetailCongeComponent } from './views/conge/detail-conge/detail-conge.component';
import { PdfCongeComponent } from './views/conge/pdf-conge/pdf-conge.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { NotificationCongeComponent } from './views/notifications/notification-conge/notification-conge.component';
import { TraiterCongeComponent } from './views/notifications/traiter-conge/traiter-conge.component';
import { CongeSoldeUserComponent } from './views/parametrage/conge-solde-user/conge-solde-user.component';
import { CongeToutComponent } from './views/parametrage/conge-tout/conge-tout.component';
import { DetailComponent } from './views/parametrage/conge-tout/detail/detail.component';
import { PresenceComponent } from './views/presence/presence.component';
import { LocalitesComponent } from './views/transport/localites/localites.component';
import { ParkingsComponent } from './views/transport/parkings/parkings.component';
import { VehiculesComponent } from './views/transport/vehicules/vehicules.component';
import { TrajetComponent } from './views/transport/trajet/trajet.component';
import { AffectationUsersComponent } from './views/transport/affectation-users/affectation-users.component';
import { AffectationVehiculesComponent } from './views/transport/affectation-vehicules/affectation-vehicules.component';

import { CommunesComponent } from './views/transport/localites/communes/communes.component';
import { ZonesComponent } from './views/transport/localites/zones/zones.component';
import { ZonesUpdateComponent } from './views/transport/localites/zones-update/zones-update.component';
import { RaisonSolcialComponent } from './views/transport/raison-solcial/raison-solcial.component';
import { RaisonSocialUpdateComponent } from './views/transport/raison_solcial/raison-social-update/raison-social-update.component';
import { UpdateVehiculeComponent } from './views/transport/vehicules/update-vehicule/update-vehicule.component';

import { CommunesPointComponent } from './views/transport/point_de_vente/communes-point/communes-point.component';
import { ZonePointComponent } from './views/transport/point_de_vente/zone-point/zone-point.component';
import { PointFocalComponent } from './views/transport/point_de_vente/point-focal/point-focal.component';
import { ProvincePointComponent } from './views/transport/point_de_vente/province-point/province-point.component';
import { PointFocalUpdateComponent } from './views/transport/point_de_vente/point-focal-update/point-focal-update.component';
import { ListeComponent } from './views/transport/affectation_users/liste/liste.component';
import { ItineraireComponent } from './views/transport/itineraire/itineraire.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule} from '@angular/material/button';
import { UpdateTrajetComponent } from './views/transport/trajet/update-trajet/update-trajet.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { Rapport1Component } from './views/transport/rapports/rapport1/rapport1.component';
import { Rapport2Component } from './views/transport/rapports/rapport2/rapport2.component';
import { MapTraficComponent } from './views/transport/map/map-trafic/map-trafic.component';
import { GoogleMapsModule } from '@angular/google-maps'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,FormsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule,
    ModalModule,
    DataTablesModule,
    ImageCropperModule,
    NgxBootstrapMultiselectModule,
    NgxDatesPickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatMomentDateModule,
    MatSelectModule,
    MatIconModule,
    NgbModule,
    MatFileUploadModule,
    NgbPaginationModule, NgbAlertModule,
    NgFlowchartModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    SignaturePadModule,
    PdfJsViewerModule,
    MatExpansionModule,
    MatButtonModule,
    HighchartsChartModule,
    GoogleMapsModule,
    ChartModule,
    
    
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    ListUsersComponent,
    DetailUserComponent,
    ProfileComponent,
    ParametrageComponent,
    OuComponent,
    UpdateOuComponent,
    PosteComponent,
    UpdatePostComponent,
    FonctionComponent,
    MesCongesComponent,
    CongeHistoriqueComponent,
      CongeInitComponent,
    CongeInitModifComponent,
    ModifierCongeComponent,
    DetailCongeComponent,
    PdfCongeComponent,
    NotificationCongeComponent,
    TraiterCongeComponent,
    CongeSoldeUserComponent,
    CongeToutComponent,
    DetailComponent,
    PresenceComponent,
    LocalitesComponent,
    ParkingsComponent,
    VehiculesComponent,
    TrajetComponent,
    AffectationUsersComponent,
    AffectationVehiculesComponent,
    CommunesComponent,
    ZonesComponent,
    ZonesUpdateComponent,
    RaisonSolcialComponent,
    RaisonSocialUpdateComponent,
    UpdateVehiculeComponent,
    CommunesPointComponent,
    ZonePointComponent,
    PointFocalComponent,
    ProvincePointComponent,
    PointFocalUpdateComponent,
    ListeComponent,
    ItineraireComponent,
    UpdateTrajetComponent,
    Rapport1Component,
    Rapport2Component,
    MapTraficComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    ConnexionService,
    SettingsService,
    AuthService,
    AuthentificationService,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
