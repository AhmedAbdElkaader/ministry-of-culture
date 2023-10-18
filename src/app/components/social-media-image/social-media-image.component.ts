import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-social-media-image',
  templateUrl: './social-media-image.component.html',
  styleUrls: ['./social-media-image.component.css']
})
export class SocialMediaImageComponent implements OnInit {

  subscription: Subscription;
  header:string ;
  constructor(private rest :RestService) { }

  ngOnInit() {

    this.subscription = this.rest.getObsrevalData().subscribe((res : any) =>{
      if(res.state == "ar"){
        this.header = "صور وسائل التواصل الأجتماعى"
      }else if(res.state == "en"){
        console.log(res.state)
        this.header = "social media image"
      }else if(res.state = "fr"){
        this.header = "image des médias sociaux"
      }
    })
  }

}
