import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-aworks',
  templateUrl: './aworks.component.html',
  styleUrls: ['./aworks.component.css']
})
export class AworksComponent implements OnInit {

  artWorks = []
  current = 1
   LangId = "1";
   count = "6"
   lang = 1
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
      console.log(this.currentLanguageId,this.lang)
      this.getData();
    });
  }
  ngOnInit() {
    this.rest.setTitle("الأعمال الفنية - بوابة الثقافة");
    this.SpinnerService.show();
    this.getData();
    //this.lang = this.rest.checkLang()
  }

  getData() {
    this.lang = this.rest.checkLang()
    this.rest.getArtWorksApi(this.count, this.current, this.currentLanguageId).subscribe((res: any) => {
      this.artWorks = res;
      console.log("where",res);
      this.SpinnerService.hide();
    });
  }

  onScroll() {
    this.current = this.current + 1
    this.rest.getArtWorksApi(this.count, this.current, this.currentLanguageId).subscribe((res: any) => {
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        this.artWorks.push(res[i])
      }
    });
  }
 
  goToDet(id){
    this.router.navigate(['/Artdetels', id]);
   }
}
