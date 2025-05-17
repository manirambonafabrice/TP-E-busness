import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: 'app.component.html',
  // template: '<mat-progress-bar  *ngIf="progressBar" mode="indeterminate" class="progress"  ></mat-progress-bar><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
  providers: [IconSetService],
})
export class AppComponent implements OnInit {

  session = JSON.parse(sessionStorage.getItem('usersession')!);
  progressBar=false

  // <mat-progress-bar *ngIf="progressBar"  mode="indeterminate">
  constructor(
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
