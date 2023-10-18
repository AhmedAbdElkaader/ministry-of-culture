import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-videos-det',
  templateUrl: './videos-det.component.html',
  styleUrls: ['./videos-det.component.css']
})
export class VideosDetComponent implements OnInit {
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  currentLanguageId 
  id
  name
  Details
  Date
  YouTubeLink
  bookImage
  link
  videos = false
  books = false
  LatestculturalTreasure
  CategoryName
  
  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    private route :Router,
    private sanitizer: DomSanitizer,
    public myLanguageService: MyLanguageServiceService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,

  ) { 
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }

  ngOnInit() {
    this.SpinnerService.show();
    this.getData()
  }
  getData() {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.rest.getCulturalTreasureDet(this.currentLanguageId, this.id).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.titleService.setTitle(res.Name + " - بوابة الثقافة " );

          this.YouTubeLink = res.Link
          console.log(this.YouTubeLink)
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.YouTubeLink);
          console.log(this.videoUrl)
          this.name = res.Name
          this.Details = res.Details
          this.Date = res.Date
          console.log(res)
          this.videos = true
          this.books = false
          this.CategoryName = res.Type
          this.LatestculturalTreasure = res.LatestculturalTreasure
      })
    });
  }

  goToDet(id) {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);
    this.route.navigate(['/Videosdet', id]);
  }

}
