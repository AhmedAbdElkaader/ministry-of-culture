import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-review',
  templateUrl: './car-review.component.html',
  styleUrls: ['./car-review.component.css']
})
export class CarReviewComponent implements OnInit {

  entity = []
  entityActive = []
  entity2R = []
  entity3R = []
  entity4R = []
  entity5R = []
  langId: number
  header = "الجهات التابعة"
  subscription: Subscription;
  EntityId

  SlideOptions = { items:5,
    responsive:{
      0:{
          items:1,
          nav:true
      },
      600:{
          items:3,
          nav:false
      },
      1000:{
          items:5,
          nav:true,
      }
  },
  responsiveClass:true,
    // autoplay: true,
    navText: ["<i class='fa fa-angle-left angleLeftEntity'></i>", "<i class='fa fa-angle-right angleRightEntity'></i>"],
    autoplayHoverPause: true,
    dots: false, nav: true };  
  CarouselOptions = { dots: true, nav: true };  
  Images = [];  

  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.rest.getObsrevalData().subscribe((res: any) => {
      this.entity = res.Entities
      console.log(res , "test")
      if (res.state == "ar") {
        this.header = "الجهات التابعة"
      } else if (res.state == "en") {
        this.header = "Dependent Actors"
      } else if (res.state == "fr") {
        this.header = "Dépendant Acteurs"
      }

      for (let i = 0; i < this.entity.length; i++) {
        this.Images.push(res.Entities[i].Image)
      }

      console.log("entities : ", Image)
    })



  }


}
