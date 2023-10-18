import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage,
   NgxGalleryAnimation,NgxGalleryImageSize } from 'ngx-gallery';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  subscription: Subscription;
  subscriptionTow: Subscription
  sliderImage = []
  showSlider = false

  SlideOptions = { items:2, dots: false, nav: true ,center: true,
    autoplay: true,
    autoplayTimeout:3000,
    smartSpeed:1000,
    margin:20,
    navText: ["<i class='fa fa-angle-left angleLeft'></i>", "<i class='fa fa-angle-right angleRight'></i>"],
    autoplayHoverPause:true,
    loop:true,};  
  CarouselOptions = { dots: true, nav: true };  
  Images = [];  
  item1
  item2
  constructor(private rest: RestService) { }

  ngOnInit() {
    this.subscription = this.rest.getObsrevalData().subscribe((res: any) => {
      res.RecentEvent.Events
       this.item1 = res.RecentEvent.Events[1]
       this.item2 = res.RecentEvent.Events[2]
    })
    this.subscription = this.rest.getObsData().subscribe((res: any) => {
         let news2 = res.LatestNews[1]
         let news3 = res.LatestNews[2]
        let art  = res.ArtWorks[0]
        let art2  = res.ArtWorks[1]

        this.sliderImage.push(news2,news3, art,art2,this.item1,this.item2)
        for(let i = 0 ; i < this.sliderImage.length; i++){
          if(this.sliderImage[i]){
            this.Images.push(this.sliderImage[i].image)
          }
        }
      
      console.log("hello slider" , this.sliderImage)

    })
  }


}
