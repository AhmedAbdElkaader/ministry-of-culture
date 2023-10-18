import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videosArr = []
  latestsvideos = []
  showHightLighted = true
   LangId = 1;
   count = "6"
   current = 1
   lang = 1
   arrayNotEmpty = false
   queryField: FormControl = new FormControl("");
   query
   private currentLanguageId: number;

  constructor(  public rest: RestService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService) { 
      myLanguageService.languageChangeId$.subscribe((newValue: number) => {
        this.currentLanguageId = newValue;
        this.lang = this.currentLanguageId
        this.getData();
      });
    }

  ngOnInit() {

    this.rest.setTitle(" الفديوهات - بوابة الثقافة");

    this.queryField.valueChanges.subscribe((queryFieldValue: string) => {
      if (this.queryField.value == undefined) {
        this.query = ""
        this.getData()
        this.showHightLighted = true
     
      }else if(this.queryField.value == ""){
        this.query = ""
        console.log(this.queryField.value)
        this.getData()
        this.showHightLighted = true
      }else {
        this.query = queryFieldValue

        if(this.query.length > 1){
          this.rest.searchCultureVideos(this.currentLanguageId, queryFieldValue,this.count,this.current).subscribe((res: any) => {
            console.log(res)
            if(res.length > 0){
              this.showHightLighted = false
              this.videosArr = res
            }
            console.log(queryFieldValue)
          })
        }
      }
    })  
  }
  getData() {
    this.latestsvideos = []
    this.current = 1
    this.lang = this.rest.checkLang()
    this.rest.getVideos(this.count,this.current,this.currentLanguageId).subscribe((res :any )=> {
      if(res.Heighlited.length != 0 && res.Normal.length != 0){
        console.log('myVideos' , res)
        this.videosArr = res.Normal
        for(let i = 0 ; i < 3 ; i++){
          this.latestsvideos.push(res.Heighlited[i])
        }
        this.arrayNotEmpty = false
      }else{
        this.arrayNotEmpty = true
        console.log('myVideos')
       this.router.navigateByUrl("/home");
      }
 
    })
  }
 
  // onScroll() {
  //   if(this.query.length == 0){
  //   this.current = this.current + 1
  //   this.rest.getRelessApi(this.count,this.current,this.currentLanguageId).subscribe((res :any )=> {
  //     for(let i = 0 ; i < res.length ; i++){
  //      // res[i].Details = res[i].Details.split(" ").splice(0,10).join(" ");
  //       this.videosArr.push(res[i])
  //     }
  //   })
  // }
  // }

  onScroll() {
    
    console.log("hi iam query " ,this.query.length)
   if(this.query.length == 0){

    this.current = this.current + 1
    
    this.rest.getVideos(this.count,this.current,this.currentLanguageId).subscribe((res :any )=> {
            console.log(res)

      let ArrayResp :any
      ArrayResp = res 
      if(ArrayResp.Normal.length != 0){
        for (let i = 0; i < ArrayResp.Normal.length; i++) {
          this.videosArr.push(ArrayResp.Normal[i])
          console.log('done')
        }
      }
      console.log("hih" , this.videosArr)

    })
  }
}


   goToDet(id) {
    this.router.navigate(['/Videosdet', id]);
  }

}
