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
  selector: 'app-art-works-det',
  templateUrl: './art-works-det.component.html',
  styleUrls: ['./art-works-det.component.css']
})
export class ArtWorksDetComponent implements OnInit {

  id;
  langId ="1"
  imageSru:string
  catgeori:string
  place:string
  name:string
  dataForm:string
  dateTo:string
  desc:string
  CultureLatestArtworks
  album
  showIframe =false
  dangerousVideoUrl: string;
  shareLink: SafeResourceUrl;
  urlLink 

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  SlideOption = { items:1, dots: true ,
 
    slideTransition: 'linear',
    
    loop:true,};  
  CarouselOption = { dots: true, nav: true };  
  Image = [];

  private currentLanguageId: number;

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
    this.getData();

 }
 getData(){
  this.router.params.subscribe(params => {
    this.id = params['id']; // (+) converts string 'id' to a number
    this.rest.getArtWorksDetils(this.id,this.currentLanguageId).subscribe((res : any) =>{
      if (res.Name == null) {
        this.route.navigateByUrl('/home');
      }else{
        
        this.titleService.setTitle(res.Name + " - بوابة الثقافة " );

      this.imageSru = res.DigitalCopy
      this.catgeori = res.artWorksTypesName
      this.place = res.ShowPlace
      this.name = res.Name
      this.dataForm = res.from
      this.dateTo = res.to
      this.CultureLatestArtworks = res.CultureLatestArtworks
      for (let i = 0; i < res.CultureLatestArtworks.length; i++) {
        this.Image.push(res.CultureLatestArtworks[i].Image)
      }
      this.album = res.Album

      if (res.Album != null) {
        //this.showAlbum = true;
        //this.AlbumArray = res.Album;
        let arr = []
        for (let i = 0; i <  res.Album.length; i++) {
          let obj = {
            small: res.Album[i].image,
            medium: res.Album[i].image,
            big: res.Album[i].image
          }
          arr.push(obj)
        }
        this.galleryImages = arr
      }

      this.showIframe = true
      this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.id}&type=artWorks`
      this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);
      setTimeout(() => {
        this.SpinnerService.hide();
      }, 3000);
      console.log(res)
      }
    })
 });
 }

 goToDet(id){
  this.route.navigate(['/Artdetels', id]);
 }

}
