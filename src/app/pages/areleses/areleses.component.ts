import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-areleses',
  templateUrl: './areleses.component.html',
  styleUrls: ['./areleses.component.css']
})
export class ArelesesComponent implements OnInit {

  reslesArr = []
   LangId = 1;
   count = "6"
   current = 1
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

    this.rest.setTitle("الإصدارات - بوابة الثقافة");

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

        if(this.query.length > 1){
          let count = 100
          this.rest.getReleseBySearch(this.currentLanguageId,this.query,count,this.current).subscribe((res: any) => {
            console.log(res)
            if(res.length > 0){
              // for(let i = 0 ; i < res.length ; i++){
              //   res[i].Details = res[i].Details.split(" ").splice(0,10).join(" ");
              // }
              this.reslesArr = res
            }
            console.log(queryFieldValue)
          })
        }
      }
    })  
   
  }
  getData() {
    this.lang = this.rest.checkLang()
    this.rest.getRelessApi(this.count,this.current,this.currentLanguageId).subscribe((res :any )=> {
      console.log(res)
      // for(let i = 0 ; i < res.length ; i++){
      //   res[i].Details = res[i].Details.split(" ").splice(0,10).join(" ");
      // }
      this.reslesArr = res
    })
  }
 
  onScroll() {
    if(this.query.length == 0){
    this.current = this.current + 1
    this.rest.getRelessApi(this.count,this.current,this.currentLanguageId).subscribe((res :any )=> {
      for(let i = 0 ; i < res.length ; i++){
       // res[i].Details = res[i].Details.split(" ").splice(0,10).join(" ");
        this.reslesArr.push(res[i])
      }
    })
  }
  }

  goToDet(id){
    this.router.navigate(['/Relessdetels', id]);
   }

}
