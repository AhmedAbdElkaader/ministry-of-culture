import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';


@Component({
  selector: 'app-museem',
  templateUrl: './museem.component.html',
  styleUrls: ['./museem.component.css']
})
export class MuseemComponent implements OnInit {

  private currentLanguageId: number;
  current = 1
  count = '6'
  Arr
  lang
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

  this.rest.setTitle("المتاحف - بوابة الثقافة");


  this.getData()
  this.lang = this.rest.checkLang()
}

getData(){
  this.rest.GetAllMuseums(this.currentLanguageId,this.count,this.current).subscribe((res => {
    this.Arr = res
    console.log(res)
  }))
}

goToDet(id) {
  this.router.navigate(['/MuseemDet', id]);
}

onScroll() {
  this.current = this.current + 1
  this.rest.GetAllMuseums(this.currentLanguageId,this.count,this.current).subscribe((res:any) => {
    for (let i = 0; i < res.length; i++) {
      this.Arr.push(res[i])
    }
  })
 
}

}
