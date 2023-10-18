import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-confernces',
  templateUrl: './confernces.component.html',
  styleUrls: ['./confernces.component.css']
})
export class ConferncesComponent implements OnInit {

  subscription: Subscription;
  conArr = []
  count = "6"
  current = 1
  showMasg:boolean = false
  lang

  private currentLanguageId: number;

  constructor(
    public rest: RestService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService
  ) { 
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }

  ngOnInit() {

    this.rest.setTitle("المؤتمرات - بوابة الثقافة");

    this.getData()
    this.lang = this.rest.checkLang()
  }

  getData(){
    let count = "6"
     this.rest.getConferncesApi(this.currentLanguageId, count, this.current).subscribe((res : any)=>{
       console.log(res)
       if(res.length == 0){
         this.showMasg = true
       }else{
        this.conArr = res
       }
     
     })
   }

   goToDet(id) {
    this.router.navigate(['/condet', id]);
  }

  gotToNextPage() {
    this.current = this.current + 1
    this.getData()
  }
  gotTopPrevPage() {
    if (this.current != 1) {
      this.current = this.current - 1
    } else {
      this.current = 1
    }
    this.getData()
  }

}
