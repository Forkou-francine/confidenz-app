import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionForm } from '../classes/connexion-form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationFormUser!: FormGroup;
  connexionForm!: ConnexionForm;
  submitted =false;
  loading =false;
  email!: string;

  userInfos: any;
  user: any;
  author: any;
  constructor( private router: Router,
              private http: HttpService,
              public formbuilder: FormBuilder,
              private route: ActivatedRoute) {
            //    const retrieve = localStorage.getItem("registerInfos");
               // this.customer = JSON.parse(retrieve);
            
            //    this.emailReceive = this.user?.email;
                // console.log(this.emailReceive);
               }

               ngOnInit() {
                this.validationFormUser = this.formbuilder.group({
                  email: ['',Validators.compose([ Validators.required,             
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
                  password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
                });
              }         
              
            

  get f(){ return this.validationFormUser.controls; }

  onSubmit(email: string){
   this.submitted = true;
   console.log(this.validationFormUser.value);
   console.log(this.validationFormUser.value.email); 

  if (this.validationFormUser.invalid) {
     return;
   }
   localStorage.setItem("user", JSON.stringify(this.user));

   this.loading= true;
   this.http.login(this.f['email'].value, this.f['password'].value)
   .pipe(first())
   .subscribe({
     next: () => {
       const retunUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigate(['/home']);
       console.log(retunUrl);
       
     },

     error: error => {
       this.loading= false;
     }
   }) 
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
  
}
