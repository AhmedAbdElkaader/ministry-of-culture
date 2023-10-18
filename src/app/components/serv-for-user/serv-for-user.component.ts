import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
@Component({
  selector: 'app-serv-for-user',
  templateUrl: './serv-for-user.component.html',
  styleUrls: ['./serv-for-user.component.css']
})
export class ServForUserComponent implements OnInit {

  subscription: Subscription;
  compArr = []
  current = 1
  count = 6
  lang
  private currentLanguageId: number;

  constructor(
   public rest: RestService,
   private route: Router,
   public myLanguageService: MyLanguageServiceService
 ) {
   myLanguageService.languageChangeId$.subscribe((newValue: number) => {
     this.currentLanguageId = newValue;
     this.getData();
   });
 }
  ngOnInit() {

    this.rest.setTitle(" المسابقات - بوابة الثقافة");

    this.getData();
    this.lang = this.rest.checkLang()
  }

  getData(){
    this.subscription = this.rest.getComById( this.count, this.current,this.currentLanguageId).subscribe((res :any) =>{
      console.log('helloComp :: ',res)
      this.compArr = res
    });
  }

  goToDet(id) {
    this.route.navigate(['/serveDet', id]);
  }

  onScroll() {
    this.current = this.current + 1
    this.subscription = this.rest.getComById( this.count, this.current,this.currentLanguageId).subscribe((res :any) =>{
      for (let i = 0; i < res.length; i++) {
        this.compArr.push(res[i])
      }
      console.log(this.compArr)

    });
  }

}
