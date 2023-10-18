import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-aevents',
  templateUrl: './aevents.component.html',
  styleUrls: ['./aevents.component.css']
})
export class AeventsComponent implements OnInit {

  eventsArr = []
  current = 1
  LangId = "1";
  count = "6"
  lang = 1
  queryField: FormControl = new FormControl("");
  query
  private currentLanguageId: number;

  constructor(
    public rest: RestService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService
  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.lang = this.currentLanguageId
      this.getData();
    });
  }
  ngOnInit() {

    this.rest.setTitle("الأحداث - بوابة الثقافة");

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
          this.rest.getEventsBySearch(this.currentLanguageId,this.query,count,this.current).subscribe((res: any) => {
            console.log(res)
            if(res.length > 0){
              for(let i = 0 ; i < res.length ; i++){
                res[i].Name = res[i].Name.split(" ").splice(0,5).join(" ");
              }
               this.eventsArr = res
            }
            console.log(queryFieldValue)
          })
        }
      }
    }) 
  }

  getData(){
    this.lang = this.rest.checkLang()
    this.rest.getEventsApi(this.count,this.current,this.currentLanguageId).subscribe((res :any )=> {
      console.log(res)
      for(let i = 0 ; i < res.length ; i++){
        res[i].Name = res[i].Name.split(" ").splice(0,5).join(" ");
      }
       this.eventsArr = res
      console.log(res)
    })
  }

  onScroll() {
    if(this.query.length == 0){
    this.current = this.current + 1
    this.rest.getEventsApi(this.count,this.current,this.currentLanguageId).subscribe((res :any )=> {
      for(let i = 0 ; i < res.length ; i++){
        res[i].Name = res[i].Name.split(" ").splice(0,5).join(" ");
        this.eventsArr.push(res[i])
      }

      console.log(res)
    })
  }
  }

  goToDet(id){
    this.router.navigate(['/Eventsdetels', id]);
   }
}
