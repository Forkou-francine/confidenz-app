import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users} from 'src/app/classes/users';
import { HttpService } from './services/http.service';
import { register } from 'swiper/element/bundle';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';



register();


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user!: Users | null;
  userInfos: any;
  constructor( private router: Router,
              private httpService: HttpService,
              private platform: Platform,
              @Optional() private routerOutlet?: IonRouterOutlet) {

    this.router.navigate(['/login']);
    this.user = this.httpService.userValue;
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.routerOutlet!.canGoBack()) {
        App.exitApp();
      }
    });  
  };
    
}
