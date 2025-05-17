import { INavData } from '@coreui/angular';
// import { DefaultLayoutComponent } from './containers';

// DefaultLayoutComponent
//  defo:DefaultLayoutComponent
export const navItems: INavData[] = [
  {
    name: "Home",
    url: '/accueil',
    icon: 'icon-home',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'General'
  },
  
  // {
  //   name: 'Présences',
  //   url: '/presence',
  //   icon: 'icon-user'
  // },
  {
    name: 'Repporting',
    url: '/conge/list',
    icon: 'icon-chart',
    children: [
      {
        name: 'Rapport1',
        url: '/transport/rapport1',
        icon: '  '
      },{
        name: 'Rapport2',
        url: '/transport/rapport2',
        icon: '  '
      },
    ]
  },
  {
    name: 'Maps',
    url: '/transport',
    icon: 'icon-map',
    children: [
      {
        name: 'Map des traffics',
        url: '/transport/map_trafic',
        icon: '  '
      },
      // {
      //   name: 'Historique de congé',
      //   url: '/conge/historique',
      //   icon: '  '
      // },
    ]
  }

 

];
