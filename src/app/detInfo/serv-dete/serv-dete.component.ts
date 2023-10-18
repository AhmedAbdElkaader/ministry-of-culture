import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-serv-dete',
  templateUrl: './serv-dete.component.html',
  styleUrls: ['./serv-dete.component.css']
})
export class ServDeteComponent implements OnInit {

  subscription: Subscription;
  userId = 'null'
  title;
  desc;
  rulesComm
  rules
  startDate
  endDate
  etnites
  CompetitionsDetail
  CompetitionsRoles
  images;
  shareLink: SafeResourceUrl;
  urlLink
  myDate ;
  ApplayForm = false
  private currentLanguageId: number;

  constructor(
    public rest: RestService,
    private route: Router,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe

  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }
  ngOnInit() {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.myDate = this.myDate+"T00:00:00"
    console.log(this.myDate)
    this.SpinnerService.show();
    this.getData()
  }

  getData() {
    let token = localStorage.getItem("tokenData")
    this.router.params.subscribe(params => {
      this.userId = params['id']; // (+) converts string 'id' to a numbe
      this.rest.getComDetById(this.userId, this.currentLanguageId, token).subscribe((res: any) => {
        console.log(res)
        if(this.myDate > res.EndDate){
          this.ApplayForm = false
        }else {
          this.ApplayForm = true
        }
        this.title = res.CompetitionsTitle
        this.desc = res.CompetitionsDetail
        this.rules = res.CompetitionsRoles
        this.rulesComm = res.CompetitionsCommiteRoles
        this.startDate = res.StartDate
        this.endDate = res.EndDate
        this.etnites = res.Entities
        this.images =  res.Image
        this.CompetitionsDetail = res.CompetitionsDetail
        this.CompetitionsRoles = res.CompetitionsRoles
        this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.userId}&type=Competition`
        this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);
        setTimeout(() => {
          this.SpinnerService.hide();
        }, 4000);
      })
    });

  }
  //let elment: HTMLElement = document.getElementById('myModala') as HTMLElement
  //elment.click()

  goToDet() {
    let token = localStorage.getItem("tokenData")
    if (token == null) {
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
      this.rest.getToken().subscribe(res => {
        console.log(res)
        this.route.navigate(['/compDet', this.userId]);
      })
    }else{
    this.route.navigate(['/compDet', this.userId]);
    }
  }

  
}
