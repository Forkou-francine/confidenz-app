import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Users } from 'src/app/classes/users';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user?: Users | null;

  constructor( private router: Router,
            private http: HttpService) { 
              this.http.user.subscribe( x=> this.user = x);
            }
          
   logout(){
    this.http.logout();
  }

  onClick(){
    this.router.navigate(['/tabs/tab1'])
  }

  ngOnInit() {
  }

}
