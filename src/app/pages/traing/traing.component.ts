import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-traing',
  templateUrl: './traing.component.html',
  styleUrls: ['./traing.component.css']
})
export class TraingComponent implements OnInit {
 
  Arr = []
  current = 1
  showMasg:boolean = false
  lang
  token
  private currentLanguageId: number;

  constructor(
   public rest: RestService,
   private router: Router,
   public myLanguageService: MyLanguageServiceService
 ) {
   myLanguageService.languageChangeId$.subscribe((newValue: number) => {
     this.currentLanguageId = newValue;
     this.getData();
   });
 }

  ngOnInit() {

    this.rest.setTitle("التدريب و التأهيل / بوابة الثقافة");
    this.token = localStorage.getItem('tokenData')
    this.getData()
    this.lang = this.rest.checkLang()
  }
  
  getData(){
    let count = "6"
    if(this.token){
      this.rest.GetAllPlaningTrainingWithToken(this.currentLanguageId,count,this.current,this.token).subscribe((res : any)=>{
        console.log(res)
        this.Arr = res   
      }) 
    }else{
      this.rest.GetAllPlaningTraining(this.currentLanguageId,count,this.current).subscribe((res : any)=>{
        console.log(res)
        this.Arr = res   
      }) 
    }
   

  

   }
   

  goToDet(id) {
    this.router.navigate(['/traingDet', id]);
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
