import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  booksArr = []
  bntStyle: string;
  subscription: Subscription;
  header = "الإصدارات"
  dowenLoadState = "تنزيل"
  responsNotEmpthy = false

  SlideOptions = { items: 2.50,
    navText: ["<i class='fa fa-angle-left angleLeftReles'></i>", "<i class='fa fa-angle-right angleRightReles'></i>"],
    dots: false, nav: true , loop:true,};  
  CarouselOptions = { dots: true, nav: true };  
  Images = [];  
  constructor(public restService: RestService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.restService.getObsData().subscribe((res: any) => {
      if (res.Releases.length == 0) {
        this.responsNotEmpthy = false
      } else {
        this.responsNotEmpthy = true
        if (res.state == "ar") {
          this.header = "الأصدارات"
          this.dowenLoadState = "تنزيل"
        } else if (res.state == "en") {
          this.header = "Releses"
          this.dowenLoadState = "Download"
        } else if (res.state == "fr") {
          this.header = "Communiqués"
          this.dowenLoadState = "Télécharger"
        }

      

        for (let i = 0; i < res.Releases.length; i++) {
          this.Images.push(res.Releases[i].image)
          if(res.Releases[i].Description != null){
            res.Releases[i].Description = res.Releases[i].Description.split(' ').splice(0, 20).join(" ");
            res.Releases[i].Description = res.Releases[i].Description.split('<p>')
          }
        }
        this.booksArr = res.Releases
        this.bntStyle = "arabic"
      }
    })
  }

  gottoDet(id) {
    this.router.navigate(['/Relessdetels', id]);
    this.restService.sendRout("releses")
  }

}
