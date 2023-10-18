import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reles-det',
  templateUrl: './reles-det.component.html',
  styleUrls: ['./reles-det.component.css']
})
export class RelesDetComponent implements OnInit {
  dangerousVideoUrl: string;
  shareLink: SafeResourceUrl;
  urlLink 
  showIframe =false
  id;
  name;
  image;
  des;
  ebook;
  catg;
  dar;
  date;
  catLast;
  authorLast;
  culLast;
  categories;
  showAuthorLast = false
  dowenloadOrPay = "تنزيل";
  price
  notPayed = true;
  response
  ArticalName
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
    this.SpinnerService.show();
  this.getData()
 }

 getData(){
  this.router.params.subscribe(params => {
    this.id = params['id']; // (+) converts string 'id' to a numbe
    this.rest.getRelesDetils(this.id,this.currentLanguageId).subscribe((res : any) =>{
      if (res.Name == null) {
        this.route.navigateByUrl('/home');
      } else {
        console.log(res)
        this.response = res
        this.titleService.setTitle(res.Name + " - بوابة الثقافة " );
          this.name = res.Name
          if(res.Authors.length != 0){
            this.ArticalName = res.Authors[0].Name
          }else{
            this.ArticalName = "لا يوجد"
          }
          this.des = res.Description
          this.image = res.image
          this.dar = res.DarAlnasher
          this.date = res.Date
          this.ebook = res.Ebook
          this.catg = res.Category_Name
          this.catLast = res.categoryLatestRelease
          if(res.categoryLatestRelease != null){
            for (let i = 0; i < res.categoryLatestRelease.length; i++) {
              this.Image.push(res.categoryLatestRelease[i].Image)
            }
          }
        
          this.authorLast = res.Authors
          this.price = res.Price
          if(this.price == 0){
            this.dowenloadOrPay = "تنزيل";
            this.notPayed = true
          }else{
            this.dowenloadOrPay = "شراء";
            this.notPayed = false
          }
          this.culLast = res.cultureLatestRelease
          this.showIframe = true
          this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.id}&type=releases`
          this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);
          setTimeout(() => {
            this.SpinnerService.hide();
          }, 3000);
          if(res.Authors.length == 0 ){
            this.showAuthorLast = false
          }else{
            this.showAuthorLast = true
          }
      }
    })
 });
 }

 goToDet(id){
  this.SpinnerService.show();
  setTimeout(() => {
    this.SpinnerService.hide();
  }, 4000);
    this.route.navigate(['/Relessdetels', id]);
  }

  goToPay(){
  let token = localStorage.getItem("tokenData")
  if(token == null){
    let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
   elment.click()
   }else{
     let dummArr = []
     let obj ={
       ID: this.id,
       Name : this.name,
       Price : 5,
       Number : 1
     }
     dummArr.push(obj)
    if (JSON.parse(localStorage.getItem("arrOFTikcts")) == null) {
      localStorage.setItem("arrOFTikcts", JSON.stringify(dummArr));
    }else{
      dummArr = JSON.parse(localStorage.getItem("arrOFTikcts"));
      dummArr.push(obj)
    }
    localStorage.setItem("arrOFTikcts", JSON.stringify(dummArr));
    this.route.navigateByUrl(`/cheackOut`);
   }
  }
}
