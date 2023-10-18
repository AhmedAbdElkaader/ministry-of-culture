import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,NavigationEnd} from '@angular/router';
import { RestService } from '../services/rest.service';
import { MyLanguageServiceService } from '../services/my-language-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { Title } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage,
  NgxGalleryAnimation,NgxGalleryImageSize } from 'ngx-gallery';

@Component({
  selector: 'app-detelis',
  templateUrl: './detelis.component.html',
  styleUrls: ['./detelis.component.css']
})
export class DetelisComponent implements OnInit {

  dangerousVideoUrl: string;
  shareLink: SafeResourceUrl;
  VediosLink: SafeResourceUrl;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  titleOFAlbum = 'معرض الصور';
  titleOFVideo = 'الفديو';
  vidoLink = '';
  imagePath = '';
  title = '';
  desc = '';
  date = '';
  ArticalName = '';
  LatestNews;
  AuthorNews;
  CultureNews;
  categori = ['اخبار ثقافية', 'اخبار سياسية', 'اخبار فنية', 'اخبار عالمية'];
  TagsList;
  CategoryName;
  id;
  commentsArr = [];
  AlbumArray = [];
  showAlbum = false;
  showVideo = false;
  showComments = false;
  Form: FormGroup;
  urlLink 
  showIframe =false
  include: ['facebook', 'twitter', 'google'];
  private currentLanguageId: number;
  SlideOptions = { items:2, dots: false, nav: true ,
    autoplay: true,
    slideTransition: 'linear',
    autoplaySpeed: 5000,
    loop:true,};  
  CarouselOptions = { dots: true, nav: true };  
  Images = [];

  SlideOption = { items:1, dots: true ,
 
    slideTransition: 'linear',
    
    loop:true,};  
  CarouselOption = { dots: true, nav: true };  
  Image = [];

  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    public myLanguageService: MyLanguageServiceService,
    private route: Router,
    private sanitizer: DomSanitizer,
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
    this.urlLink = window.location.href;
    this.Form = new FormGroup({
      CommentDetail: new FormControl('', Validators.required),
    });
     this.getData();
  }
  getData() {
    this.router.params.subscribe(params => {
      this.id = params.id; // (+) converts string 'id' to a numbe
      this.rest.getNewsdetils(this.id, this.currentLanguageId).subscribe((res: any) => {
      
        if (res.Name == null) {
          this.route.navigateByUrl('/home');
        } else {

          this.titleService.setTitle( res.Name + " / بوابة الثقافة " );
          
          setTimeout(() => {
            this.SpinnerService.hide();
          }, 3000);

          console.log(res);
          this.showIframe = true
          this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.id}&type=news`
          this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);
          this.date = res.Date
          this.imagePath = res.image;
          this.title = res.Name;
          this.desc = res.Description;
          this.ArticalName = res.AutherName;
          for (let i = 0; i < res.AutherName.length; i++) {
            this.Images.push(res.AutherName[i].Image)
          }
          this.LatestNews = res.CategoryLatestNews;
          for (let i = 0; i < res.CategoryLatestNews.length; i++) {
            this.Image.push(res.CategoryLatestNews[i].Image)
          }
          this.AuthorNews = res.AutherLatestNews;
          this.CultureNews = res.CultureLatestNews;
          this.TagsList = res.Tags;
          this.CategoryName = res.Category_Name;
          this.commentsArr = res.newsComments;
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
          if (res.Video != null) {
            this.vidoLink = "https://www.youtube.com/watch?v=4acd6vv4qjQ"
            this.VediosLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.vidoLink);
            this.showVideo = true;
          }

          if (this.commentsArr.length > 0) {
            this.showComments = true;
          }

          console.log(this.AuthorNews);
        }
      });
    });
  }

  goToDet(id) {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
    this.route.navigate(['/detels', id]);
  }

  saveComment() {
    const token = localStorage.getItem('tokenData');
    const userName = localStorage.getItem('userName');
    const resultForm = this.Form.value;
    const obj = {
      NewsID: this.id,
      CommentDetail: resultForm.CommentDetail,
      LangId: this.currentLanguageId
    };
    const obj2 = {
      CommentDetail: resultForm.CommentDetail,
      AddedDate: moment().format(),
      UserName: userName
    };
    console.log(obj);
    if (token == null) {
      const elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement;
      elment.click();
    } else {
      this.rest.saveComment(obj, token);
      this.commentsArr.push(obj2);
      this.showComments = true
    }

  }




}
