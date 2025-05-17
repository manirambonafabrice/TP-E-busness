import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  dtOptions: any = {};
  persons: any = [];

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2,
       
    };

    this.http.get('http://localhost:81/routes/users')
    .subscribe(data => {
      this.persons = (data as any).data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  
  }

}
