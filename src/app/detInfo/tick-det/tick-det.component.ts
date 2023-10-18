import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tick-det',
  templateUrl: './tick-det.component.html',
  styleUrls: ['./tick-det.component.css']
})
export class TickDetComponent implements OnInit {

  dangerousVideoUrl: string;
  shareLink: SafeResourceUrl;


  private currentLanguageId: number;
  id;
  name;
  des;
  image;
  location
  startDate
  endDate;
  TheaterName
  LatestEvent
  TagsLatestEvent
  counter = 0
  Tags
  TicketsType = []
  album = []
  entitiesOrganized = []
  localStorgeTiketsArr = []
  arrOFtikets = []
  entityLatestEvents = []
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  showGallery = false
  userClick = false
  showIframe = false
  urlLink

  SlideOption = {
    items: 1, dots: true, slideTransition: 'linear',
    loop: true,
  };

  CarouselOption = { dots: true, nav: true };
  Image = [];

  SlideOptions = {
    items: 2, dots: false, nav: true,
    autoplay: true,
    slideTransition: 'linear',
    autoplaySpeed: 5000,
    loop: true,
  };
  CarouselOptions = { dots: true, nav: true };
  Images = [];
  form: FormGroup;

  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    public myLanguageService: MyLanguageServiceService,
    private route: Router,
    private sanitizer: DomSanitizer,
    private SpinnerService: NgxSpinnerService,
  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }
  ngOnInit() {
    this.form = new FormGroup({
      item0: new FormControl("", Validators.required),
      item1: new FormControl("", Validators.required),
      item2: new FormControl("", Validators.required),
    })
    this.SpinnerService.show();
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.getData()
  }
  arr = []
  getData() {
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.getEventByTickets(this.id, this.currentLanguageId).subscribe((res: any) => {

        this.showIframe = true
        this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.id}&type=tickets`
        this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);

        this.rest.setTitle(res.Name + " - بوابة الثقافة ");

        setTimeout(() => {
          this.SpinnerService.hide();
        }, 3000);


        console.log(res)
        this.name = res.Name
        this.des = res.Description
        this.image = res.image
        this.location = res.Location
        this.startDate = res.StartDate
        this.endDate = res.EndDate
        this.TheaterName = res.Theater_Name
        this.Tags = res.Tags
        this.LatestEvent = res.CultureLatestEvent
        this.TagsLatestEvent = res.CategoryLatestEvent
        for (let i = 0; i < res.CategoryLatestEvent.length; i++) {
          this.Images.push(res.CategoryLatestEvent[i].Image)
        }
        this.album = res.Album
        this.TicketsType = res.TicketsType
        this.entitiesOrganized = res.EntitiesOrganized
        this.entityLatestEvents = res.entityLatestEvents
        for (let i = 0; i < res.entityLatestEvents.length; i++) {
          this.Image.push(res.entityLatestEvents[i].Image)
        }
        if (this.album != null) {
          for (let i = 0; i < this.album.length; i++) {
            let obj = {
              small: this.album[i].image,
              medium: this.album[i].image,
              big: this.album[i].image
            }
            this.arr.push(obj)
          }
          this.galleryImages = this.arr
          console.log(this.arr)
          this.showGallery = true
        }
      })
    });
  }

  // plus(id) {
  //   this.userClick = true
  //   for (let i = 0; i < this.TicketsType.length; i++) {
  //     if (this.TicketsType[i].id == id) {
  //       this.TicketsType[i].Number = this.TicketsType[i].Number + 1
  //     }
  //   }
  // }

  // mins(id) {
  //   let counter = 0 
  //   for (let i = 0; i < this.TicketsType.length; i++) {
  //     if (this.TicketsType[i].id == id && this.TicketsType[i].Number != 0  ) {
  //       this.TicketsType[i].Number = this.TicketsType[i].Number - 1
  //     }
  //     for(let j = 0; j < this.TicketsType.length; j++){
  //       if(this.TicketsType[i].Number != 0 ){
  //         counter+=1
  //       }
  //     }
  //   }
  //   if(counter == 0 ){
  //     this.userClick = false
  //   }

  // }

  saveEvent() {
    let obj = this.form.value

    let token = localStorage.getItem("tokenData")
    if (token == null) {
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
    } else {

      if (JSON.parse(localStorage.getItem("arrOFTikcts")) == null) {
        for (let i = 0; i < this.TicketsType.length; i++) {
          // if (this.TicketsType[i].Number != 0) {
          if (i == 0 && obj.item0 > 0) {
            this.TicketsType[i].Number = obj.item0
            this.localStorgeTiketsArr.push(this.TicketsType[i])
          } else if (i == 1 && obj.item1 > 0) {
            this.TicketsType[i].Number = obj.item1
            this.localStorgeTiketsArr.push(this.TicketsType[i])
          } else if( i == 2 && obj.item2 > 0) {
            this.TicketsType[i].Number = obj.item2
            this.localStorgeTiketsArr.push(this.TicketsType[i])
          }
          this.TicketsType[i].NameOfEvent = this.name
          this.TicketsType[i].srcOfImage = this.image
        }
        // }
      } else {
        this.localStorgeTiketsArr = JSON.parse(localStorage.getItem("arrOFTikcts"));
        for (let i = 0; i < this.TicketsType.length; i++) {
          // if (this.TicketsType[i].Number != 0) {
          if (i == 0 && obj.item0 > 0) {
            this.TicketsType[i].Number = obj.item0
            this.localStorgeTiketsArr.push(this.TicketsType[i])
          } else if (i == 1 &&  obj.item1 > 0) {
            this.TicketsType[i].Number = obj.item1
            this.localStorgeTiketsArr.push(this.TicketsType[i])
          } else if( i == 2 && obj.item2 > 0) {
            this.TicketsType[i].Number = obj.item2
            this.localStorgeTiketsArr.push(this.TicketsType[i])
          }
          this.TicketsType[i].NameOfEvent = this.name
          this.TicketsType[i].srcOfImage = this.image
          // }
        }
      }
      localStorage.setItem("arrOFTikcts", JSON.stringify(this.localStorgeTiketsArr));
      console.log(this.TicketsType)
      this.route.navigateByUrl(`/cheackOut`);
    }

  }


  goToBooking() {
    this.route.navigateByUrl(`/cheackOut`);
  }

  goToDet(id) {
    this.route.navigate(['/detTickets', id]);
  }

}
