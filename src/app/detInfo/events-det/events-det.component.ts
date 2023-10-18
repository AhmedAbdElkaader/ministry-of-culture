import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { Title } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage,
  NgxGalleryAnimation,NgxGalleryImageSize } from 'ngx-gallery';
@Component({
  selector: 'app-events-det',
  templateUrl: './events-det.component.html',
  styleUrls: ['./events-det.component.css']
})
export class EventsDetComponent implements OnInit {

  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;
  shareLink: SafeResourceUrl;
  showIframe = false
  urlLink
  id;
  langId = "1"
  name;
  descrption;
  image
  startDate;
  endDate
  location;
  desc: string
  private currentLanguageId: number;
  lastEvents = []
  cultureEvents = []
  imageAlbum: any;
  showAlbum = false
  showVideo = false
  entityLatestEvents = []
  Tag_Name
  lang
  VedioLink
  videoId
  showEntityLatestEvents = false
  follow = ""
  lastE = ""
  simE = ""
  from = ""
  to = ""
  sideE = ""
  comm = ""
  works = ""
  send = ""
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  AlbumArray=[]
  SlideOption = {
    items: 1, dots: true,

    slideTransition: 'linear',

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
  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    public myLanguageService: MyLanguageServiceService,
    private sanitizer: DomSanitizer,
    private route: Router,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title,

  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }


  ngOnInit() {

    this.galleryOptions = [
      {
        width: '100%',
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

    this.SpinnerService.show();
    this.getData()
    this.lang = this.rest.checkLang();
    if (this.lang === 1) {
      this.follow = "تابعنا"
      this.lastE = "اخر الأحداث"
      this.simE = "أحداث مماثلة"
      this.from = "من"
      this.to = "الى"
      this.sideE = "احداث الجهات"
      this.comm = "اترك تعليق"
      this.works = "اعمال"
      this.send = "ارسال"
    } else if (this.lang === 2) {
      this.follow = "Follow Us"
      this.lastE = "Latest Events"
      this.simE = "Similar Events"
      this.from = "From"
      this.to = "To"
      this.sideE = "Side Events"
      this.comm = "Leave a comment"
      this.works = "Works"
      this.send = "Send"
    } else if (this.lang === 3) {
      this.follow = "Suivez nous"
      this.lastE = "Derniers évènements"
      this.simE = "Evènements similaires"
      this.from = "De"
      this.to = "tome"
      this.sideE = "Événements événements"
      this.comm = "laissez un commentaire"
      this.works = "Affaires"
      this.send = "Envoyer"
    }
  }

  getData() {
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.getEventsDetils(this.id, this.currentLanguageId).subscribe((res: any) => {
        console.log(res)
        if (res.Name == null) {
          this.route.navigateByUrl('/home');
        } else {

          this.titleService.setTitle(res.Name + " - بوابة الثقافة ");

          this.name = res.Name
          this.descrption = res.Description
          this.image = res.image
          this.location = res.Location
          this.startDate = res.StartDate
          this.endDate = res.EndDate
          this.lastEvents = res.CategoryLatestEvent
          this.cultureEvents = res.CultureLatestEvent

          for (let i = 0; i < res.CultureLatestEvent.length; i++) {
            this.Image.push(res.CultureLatestEvent[i].Image)
          }
          this.imageAlbum = res.Album
          if (res.Album != null) {
            this.showAlbum = true;
            this.AlbumArray = res.Album;
            let arr = []
            for (let i = 0; i <  this.AlbumArray.length; i++) {
              let obj = {
                small: this.AlbumArray[i].image,
                medium: this.AlbumArray[i].image,
                big: this.AlbumArray[i].image
              }
              arr.push(obj)
            }
            this.galleryImages = arr
          }
          this.Tag_Name = res.Tag_Name
          this.entityLatestEvents = res.entityLatestEvents
          for (let i = 0; i < res.entityLatestEvents.length; i++) {
            this.Images.push(res.entityLatestEvents[i].Image)
          }
          this.showIframe = true
          this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.id}&type=events`
          this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);
          setTimeout(() => {
            this.SpinnerService.hide();
          }, 3000);
        }
        // if (res.Album == null) {
        //   this.showAlbum = false
        // } else {
        //   this.showAlbum = true
        // }
        if (res.entityLatestEvents.length == 0) {
          this.showEntityLatestEvents = false
        } else {
          this.showEntityLatestEvents = true
        }
        if (res.VedioLink == null) {
          this.showVideo = false
        } else {
          this.showVideo = true
          this.VedioLink = res.VedioLink
          const videoId = this.getId(this.VedioLink);
          console.log(videoId)
          const videoUrlDnger = '//www.youtube.com/embed/' + videoId
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrlDnger);

          console.log('Video ID:', videoId)
        }


      })
    });
  }


  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  goToDet(id){
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
      this.route.navigate(['/Eventsdetels', id]);
  }

}
