import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
@Component({
  selector: 'app-news-catg',
  templateUrl: './news-catg.component.html',
  styleUrls: ['./news-catg.component.css']
})
export class NewsCatgComponent implements OnInit {
  subscription: Subscription;
  newsArr = []
  LangId = "1";
  count = "6"
  current = 1
  catId;
  categoryName;
  lang

  private currentLanguageId: number;

  constructor(
   public rest: RestService,
   private route: Router,
   public myLanguageService: MyLanguageServiceService,
   private router: ActivatedRoute

 ) {
   myLanguageService.languageChangeId$.subscribe((newValue: number) => {
     this.currentLanguageId = newValue;
     this.getData();
   });
 }
  ngOnInit() {
   this.getData()
   this.lang = this.rest.checkLang();
  }

  getData(){
    this.router.params.subscribe(params => {
      //this.SpinnerService.show();
      this.catId = params['id'];
      this.rest.getNewsByCatg(this.catId,this.count,this.current,this.currentLanguageId).subscribe((res: any)=>{
        console.log('res')
        console.log(res)
        for( let i=0; i<res.length; i++){
          res[i].Details = res[i].Details.split(" ").splice(0, 20).join(" ");
          this.categoryName = res[0].CategoryName
        }
        for (let i = 0; i < res.length; i++) {
          res[i].Title = res[i].Title.split(" ").splice(0, 5).join(" ");
        }
        this.newsArr = res
      })
    });
  }

  goToDet(id) {
    this.route.navigate(['/detels', id]);
  }
  
  gotToNextPage() {
    this.current = this.current + 1
    this.ngOnInit()
  }
  gotTopPrevPage() {
    if (this.current != 1) {
      this.current = this.current - 1
    } else {
      this.current = 1
    }
    this.ngOnInit()
  }

}
