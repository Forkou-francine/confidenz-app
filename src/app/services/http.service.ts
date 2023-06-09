import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable } from 'rxjs';

import { ConnexionForm } from '../classes/connexion-form';
import { Router } from '@angular/router';

import {map} from 'rxjs/operators'
import { BaseUrl } from 'src/app/classes/base-url';
import { environment } from 'src/environments/environment';
import { Users } from '../classes/users';


@Injectable({
  providedIn: 'root'
})

export class HttpService {
  baseUrl  = new BaseUrl();
  userInfos:any;

  private userSubject!: BehaviorSubject<Users | null>;
    public user: Observable<Users | null>;
    public file!: Observable<File | null>;

  
  constructor( private _http: HttpClient,
              private router: Router,
             ) {
                this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
                console.log("Yoooo", this.userSubject);
                
                this.user = this.userSubject.asObservable();
   }


   public get userValue(){
    return this.userSubject.value;
    console.log(this.userSubject.value);
    
   }

  
login(email: string, password: string) {
  return this._http.post<Users>(`${environment.apiUrl}/user/login/`, { email, password })
      .pipe(map(user => {
        console.log(user);
        
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          console.log(user);

          this.userSubject.next(user);
          return user; 
      }));
}

  
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getFilesByUser(id: string){
    return this._http.get(this.baseUrl.url + "file/user/" +id);
  }

  getAll(){
    return this._http.get(this.baseUrl.url + "file/all/")
  }
  
 
}
