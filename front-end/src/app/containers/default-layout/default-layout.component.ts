import {Component, OnDestroy, OnInit,ViewChild} from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { navItems } from '../../_nav';
import { AppComponent } from '../../app.component';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'; 
import { SettingsService } from '../../services/settings.service';

import { AuthentificationService } from '../../services/authentification.service';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { InfoService } from '../../services/info.service';
// import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

  hide=false

  notification=0
  notification_array=[]

  progressBar=false
  sub: any;
  public sidebarMinimized = false;
  public navItems = navItems;
  public settingColor;
  public bodyColor;
  public menuColor;
  public titleColor;
  private logos;

  session
  nom 
  prenom 
  foto
  class=0

  test_var="yyy"
   usersession=JSON.parse(sessionStorage.getItem('usersession'))
   permission_url=this.usersession.data.paths

   menu_user
   menu_ou
   menu_poste
   menu_hierarchie
   menu_flux_conge
   menu_role
   menu_conge_param
   menu_conge_init
   menu_localite
   menu_raison
   menu_vehicule
   menu_point_focal
   menu_affectation_employe
   menu_itineraire
   utilisateur_conge_solde
   tous_les_conges

  // settingColor.body_style.CODE_COULEUR
  event$
  currentRoute: string;
  tabIndex = -1;

onTabClick(index){
    this.tabIndex = index;
}
  constructor(private info_service:InfoService,private setting:SettingsService,private approot:AppComponent, private router: Router, private connexion:ConnexionService,private auth_service:AuthentificationService) {

  //  this.navItems=[]
// console.log(navItems)
    this.currentRoute = "";
    this.router.events.subscribe((event) => {
        // if (event instanceof NavigationStart) {
        //     // Show loading indicator
        //     console.log('Route change detected');
        // }

                    if(event instanceof NavigationStart) {
                      // alert()
                      if (sessionStorage.getItem("usersession")) {

                        // console.log(JSON.parse(sessionStorage.getItem("usersession")).data.ID)
                       
                      this.info_service.getNotification(JSON.parse(sessionStorage.getItem("usersession")).data.ID).subscribe
                      (res=>{
                  
                        if(res.response=="non"){
                          alert("PROBLEME DE SERVEUR")
                        }else{
                         var n=0
                          res.data.forEach(val => {
                            n+=val.value
                           });

                          //  console.log(res.data)

                         this.notification=n
                         this.notification_array=res.data

                        }
                        
                      },
                      error=>{
                        console.log(error)
                      })

                       
                    }

             const LAST= sessionStorage.getItem('debut_session')      
             const CURRENT= new Date().getTime()
             
             const TIME=CURRENT-parseInt(LAST)
             const PERIODE=TIME/3600000

              // console.log(PERIODE);

              if(PERIODE>1)this.seDecoonecter()
              // console.log(window.location.href) 
              // var url=window.location.href.split("#")
              var url=window.location.href

              var path=url.split("#")
              var path_url=path[1]
              var array_url=path[1].split('/')          

              if (this.usersession) {
             
              // console.log(this.usersession.data.paths)
              this. permission_url=this.usersession.data.paths
              // console.log(permission_url)
              var isnum = /^\d+$/.test(array_url[array_url.length-1]);
              // console.log(isnum)
              for (let i = array_url.length-1; i >0 ; i--) {
                var isnum = /^\d+$/.test(array_url[i]);
                // console.log(array_url[i])
                if(!isnum){
                  //  path_url=path[1]
                }else{
                   path_url=path_url.replace("/"+array_url[i],'')
                }     
              }
          
              
              // console.log(path_url)
              // console.log(this.permission_url.filter(s => s.includes(path_url)).length)
              if (this.permission_url.filter(s => s.includes(path_url)).length==0) {
                console.log(path_url)
                // if(path_url!="/login"&&path_url!="/RefreshComponent")
                // this.seDecoonecter()
              }

            }

            sessionStorage.setItem('debut_session',""+new Date().getTime())
          }


        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
        }
    });


 
   }

  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
    
  }

  ngOnInit(): void {
 
 
//DROIT SUE MENU DROITES
    if (this.permission_url.filter(s => s.includes('/parametrage/roles')).length==0) {
      this.menu_role=false
       }else{
        this.menu_role=true
    }
    if (this.permission_url.filter(s => s.includes('/users/list_users')).length==0) {
      this.menu_user=false
       }else{
        this.menu_user=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/ou/list_ou')).length==0) {
      this.menu_ou=false
       }else{
        this.menu_ou=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/poste/list_posts')).length==0) {
      this.menu_poste=false
       }else{
        this.menu_poste=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/hierarchie')).length==0) {
      this.menu_hierarchie=false
       }else{
        this.menu_hierarchie=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/flux_conge')).length==0) {
      this.menu_flux_conge=false
       }else{
        this.menu_flux_conge=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/conge_param')).length==0) {
      this.menu_conge_param=false
       }else{
        this.menu_conge_param=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/conge_init')).length==0) {
      this.menu_conge_init=false
       }else{
        this.menu_conge_init=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/conge_solde_user')).length==0) {
      this.utilisateur_conge_solde=false
       }else{
        this.utilisateur_conge_solde=true
    }
    if (this.permission_url.filter(s => s.includes('/parametrage/conge_tout/list')).length==0) {
      this.tous_les_conges=false
       }else{
        this.tous_les_conges=true
    }
    if (this.permission_url.filter(s => s.includes('/transport/localite')).length==0) {
      this.menu_localite=false
       }else{
        this.menu_localite=true
    }
    if (this.permission_url.filter(s => s.includes('/transport/raison_social')).length==0) {
      this.menu_raison=false
       }else{
        this.menu_raison=true
    }
    if (this.permission_url.filter(s => s.includes('/transport/vehicules')).length==0) {
      this.menu_vehicule=false
       }else{
        this.menu_vehicule=true
    }
    if (this.permission_url.filter(s => s.includes('/transport/point_de_vente')).length==0) {
      this.menu_point_focal=false
       }else{
        this.menu_point_focal=true
    }
    if (this.permission_url.filter(s => s.includes('/transport/affection_users')).length==0) {
      this.menu_affectation_employe=false
       }else{
        this.menu_affectation_employe=true
    }
    if (this.permission_url.filter(s => s.includes('/transport/itineraires')).length==0) {
      this.menu_itineraire=false
       }else{
        this.menu_itineraire=true
    }
//FIN DROIT SUE MENU DROITES

    
    // var jsonPerson = '{"first_name":"billy", "age":23}';
    this.session = JSON.parse(sessionStorage.getItem('usersession')); 
    this.foto=sessionStorage.getItem('foto')

    // console.log(this.foto)
    this.sub =this.setting.colorSetting.subscribe
    (res=>{
      // console.log(res.data.body_style[0].CODE_COULEUR )
     this.settingColor=res ; 
     this.bodyColor=  res.data.body_style[0].CODE_COULEUR 
     this.menuColor=  res.data.Menu_style[0].CODE_COULEUR 
     this.titleColor=  res.data.Bar_style[0].CODE_COULEUR 
     if(JSON.parse(sessionStorage.getItem("usersession")).data.RAISON_LOGO){
      if(JSON.parse(sessionStorage.getItem("usersession")).data.RAISON_LOGO==null){
        this.logos=  this.connexion.base_url+res.data.Logo[0].CODE_COULEUR 
      }else
      
      this.logos=  this.connexion.base_url+((JSON.parse(sessionStorage.getItem("usersession")).data.RAISON_LOGO).replace("uploads/",""))
     }else
     this.logos=  this.connexion.base_url+res.data.Logo[0].CODE_COULEUR 
     
    //  console.log(this.logos)
    },
    error=>{
      console.log(error)  
    })
    
    var self=this

$(document).on( 'click', '.d-lg-none', function (event) {
  

  $(document).removeClass("new_class"+self.class)

  self.class+=1
  $(this).addClass("new_class"+self.class)
//  if($( document ).width()<700) appasidemenutoggler
          // $('.appasidemenutoggler,.d-lg-none').trigger('click');
          // $('.new_class').trigger('click');
          // $('.d-lg-none').trigger('click');
          // d-lg-none navbar-toggler ng-star-inserted

          // alert()

      event.stopPropagation();
     
  } );
  $(document).on( 'click', '.menus', function (event) {

    if($( document ).width()<700)
    $('.d-lg-none.new_class'+self.class).trigger('click');
        event.stopPropagation();
       
    } );

}

  ngOnDestroy() {
    // this.sub.unsubscribe()
  }

  seDecoonecter(){
    sessionStorage.setItem('debut_session',""+new Date().getTime())
    
    this.auth_service.isAuth=false
sessionStorage.removeItem('usersession');
this.router.navigate(['/login']);

  }


}
