


import { ConnexionForm } from './../classes/connexion-form';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from 'src/app/classes/base-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl  = new BaseUrl();

  constructor(private _http :HttpClient) { }
 

  updateCustommer(updateForm: any){
    return this._http.post(this.baseUrl.url+"customer/update", updateForm)
  }
}