import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  subscription: Subscription;
  newsArr = []
  count = 6
  current = 1
  lang = 1
  showMasg:boolean = false
  queryField: FormControl = new FormControl("");
  query
  private currentLanguageId: number;

   constructor(
    public rest: RestService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService,
    private titleService: Title,

  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.lang = this.currentLanguageId
      this.getData();
    });
  }

  ngOnInit() {

    this.rest.setTitle("الأخبار - بوابة الثقافة");

    this.queryField.valueChanges.subscribe((queryFieldValue: string) => {
      if (this.queryField.value == undefined) {
        this.query = ""
        this.getData()
     
      }else if(this.queryField.value == ""){
        this.query = ""
        console.log(this.queryField.value)
        this.getData()
      }else {
        this.query = queryFieldValue
        let count = 100
        if(this.query.length > 1){
          this.rest.getNewsBySearch(this.currentLanguageId,this.query,count,this.current).subscribe((res: any) => {
            console.log(res)
            if(res.length > 0){
              for (let i = 0; i < res.length; i++) {
                res[i].Title = res[i].Title.split(" ").splice(0, 5).join(" ");
              }
              this.newsArr = res
            }
            console.log(queryFieldValue)
          })
        }
      }
    })    
  }
  

  getData(){
    console.log('lang : ',this.currentLanguageId)
    this.lang = this.rest.checkLang()
    this.rest.getNewsApi(this.count,this.current,this.currentLanguageId).subscribe((res : any)=>{
       console.log(res) 
        for (let i = 0; i < res.length; i++) {
          res[i].Title = res[i].Title.split(" ").splice(0, 5).join(" ");
        }
        this.newsArr = res
     
     })
     
   }

  goToDet(id) {
    this.router.navigate(['/detels', id]);
  }

  onScroll() {

    if(this.query.length == 0){
      this.current = this.current + 1
      console.log(this.current)
      this.rest.getNewsApi(this.count,this.current,this.currentLanguageId).subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
         // res[i].Details = res[i].Details.split(" ").splice(0, 20).join(" ");
          res[i].Title = res[i].Title.split(" ").splice(0, 5).join(" ");
          this.newsArr.push(res[i])
        }
      
        console.log(res)
      })
    }
   
    }

  

  

}
