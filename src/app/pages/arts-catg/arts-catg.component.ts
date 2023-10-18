import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-arts-catg',
  templateUrl: './arts-catg.component.html',
  styleUrls: ['./arts-catg.component.css']
})
export class ArtsCatgComponent implements OnInit {

  subscription: Subscription;
  artsArr = []
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
    this.lang = this.rest.checkLang()
   }

   getData(){
    this.router.params.subscribe(params => {
      //this.SpinnerService.show();
      this.catId = params['id'];
      this.rest.getArtByCatg(this.currentLanguageId, this.catId, this.count, this.current).subscribe((res: any)=>{
        console.log('res')
        console.log(res)
        this.artsArr = res
      })
    });
  }

   goToDet(id) {
    this.route.navigate(['/Artdetels', id]);
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
