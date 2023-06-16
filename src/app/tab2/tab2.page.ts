import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '../classes/file';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  files?: any[] ;
  file: File | null = null; // Variable to store file


  constructor(private httpService: HttpService,
            private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.httpService.getAll()
    .pipe()
    .subscribe(
      (filess: any) => {
        this.files = filess['fichier']
        console.log("Files received", this.files);
      }
    )
  }

  


}
