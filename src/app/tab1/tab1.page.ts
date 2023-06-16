import { Component } from '@angular/core';
import { Users} from 'src/app/classes/users';
import { HttpService } from '../services/http.service';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user!: Users | null;
  userInfos: any;
  files?: any[] ;
  userfiles?: any[] ;
  file: File | null = null; // Variable to store file


  constructor(private httpService: HttpService,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) {

    this.user = this.httpService.userValue; 
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet!.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit(): void {
    this.httpService.getAll()
    .pipe()
    .subscribe(
      (filess: any) => {
        this.files = filess['fichier']
        console.log("Files received", this.files);
      }
    );
    // this.httpService.getFilesByUser(this.httpService.userValue?.userId)
    // .pipe()
    // .subscribe(
    //   (filess: any) => {
    //     this.userfiles = filess['fichier']
    //     console.log("Files received", this.files);
    //   }
    // )
  }



}
