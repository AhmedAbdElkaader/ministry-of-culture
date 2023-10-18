import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-museem-det',
  templateUrl: './museem-det.component.html',
  styleUrls: ['./museem-det.component.css']
})
export class MuseemDetComponent implements OnInit {

  dangerousVideoUrl: string;
  shareLink: SafeResourceUrl;
  currentLanguageId
  id;
  name;
  image;
  des;
  location
  workFrom;
  WorkTo;
  MuseumWorksDays
  MuseumTicktesTypes
  WorkDays
  localStorgeTiketsArr = []
  userClick = false
  showIframe = false
  urlLink
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

  getData() {
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.GetMuseumDet(this.currentLanguageId, this.id).subscribe((res: any) => {
        this.rest.setTitle(res.Name + " / بوابة الثقافة ");

        setTimeout(() => {
          this.SpinnerService.hide();
        }, 3000);

        console.log(res);
        this.showIframe = true
        this.urlLink = `https://share.cg.eg/CallAPI?langId=1&contentId=${this.id}&type=museum`
        this.shareLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlLink);

        this.name = res.Name
        this.des = res.Details
        this.image = res.Image
        this.location = res.Location
        this.workFrom = res.WorkFrom
        this.WorkTo = res.WorkTo
        this.MuseumWorksDays = res.MuseumWorksDays
        this.MuseumTicktesTypes = res.MuseumTicktesTypes
        this.WorkDays = res.MuseumWorksDays
        console.log(res)
      })
    });
  }

  ngOnInit() {

    this.form = new FormGroup({
      item0: new FormControl("", Validators.required),
      item1: new FormControl("", Validators.required),
    })

    this.getData()
  }


  // plus(id) {
  //   this.userClick = true
  //   for (let i = 0; i < this.MuseumTicktesTypes.length; i++) {
  //     if (this.MuseumTicktesTypes[i].Id == id) {
  //       this.MuseumTicktesTypes[i].Number = this.MuseumTicktesTypes[i].Number + 1
  //     }
  //   }
  // }



  // mins(id) {
  //   let counter = 0
  //   for (let i = 0; i < this.MuseumTicktesTypes.length; i++) {
  //     if (this.MuseumTicktesTypes[i].Id == id && this.MuseumTicktesTypes[i].Number != 0  ) {
  //       this.MuseumTicktesTypes[i].Number = this.MuseumTicktesTypes[i].Number - 1
  //     }
  //     for(let j = 0; j < this.MuseumTicktesTypes.length; j++){
  //       if(this.MuseumTicktesTypes[i].Number != 0 ){
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
        for (let i = 0; i < this.MuseumTicktesTypes.length; i++) {

          this.MuseumTicktesTypes[i].NameOfEvent = this.name
          this.MuseumTicktesTypes[i].srcOfImage = this.image

          if (i == 0 && obj.item0 > 0) {
            this.MuseumTicktesTypes[i].Number = obj.item0
            this.localStorgeTiketsArr.push(this.MuseumTicktesTypes[i])
          } else if (i == 1 && obj.item1 > 0) {
            this.MuseumTicktesTypes[i].Number = obj.item1
            this.localStorgeTiketsArr.push(this.MuseumTicktesTypes[i])
          } else if (i == 2 && obj.item2 > 0) {
            this.MuseumTicktesTypes[i].Number = obj.item2
            this.localStorgeTiketsArr.push(this.MuseumTicktesTypes[i])
          }
        }

      } else {
        this.localStorgeTiketsArr = JSON.parse(localStorage.getItem("arrOFTikcts"));
        for (let i = 0; i < this.MuseumTicktesTypes.length; i++) {
          this.MuseumTicktesTypes[i].NameOfEvent = this.name
          this.MuseumTicktesTypes[i].srcOfImage = this.image

          if (i == 0 && obj.item0 > 0) {
            this.MuseumTicktesTypes[i].Number = obj.item0
            this.localStorgeTiketsArr.push(this.MuseumTicktesTypes[i])
          } else if (i == 1 && obj.item1 > 0) {
            this.MuseumTicktesTypes[i].Number = obj.item1
            this.localStorgeTiketsArr.push(this.MuseumTicktesTypes[i])
          } 
        }
      }
      localStorage.setItem("arrOFTikcts", JSON.stringify(this.localStorgeTiketsArr));
      console.log(this.MuseumTicktesTypes)

      this.route.navigateByUrl(`/cheackOut`);

    }

  }

  // goToBooking(){
  //   this.route.navigateByUrl(`/cheackOut`);
  // }


}
