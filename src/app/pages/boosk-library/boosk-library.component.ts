import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-boosk-library',
  templateUrl: './boosk-library.component.html',
  styleUrls: ['./boosk-library.component.css']
})
export class BooskLibraryComponent implements OnInit {

  private currentLanguageId: number;
  current = 1
  count = '6'
  EntityID
  Arr
  constructor(
   public rest: RestService,
   private router: Router,
   private route: ActivatedRoute,
   public myLanguageService: MyLanguageServiceService
 ) {
   myLanguageService.languageChangeId$.subscribe((newValue: number) => {
     this.currentLanguageId = newValue;
     this.getData();
   });
 }

  ngOnInit() {
    this.getData()
  }

  getData(){

    this.route.params.subscribe(params => {
      this.EntityID = params['id'];
    this.rest.GetAllLBooks(this.currentLanguageId, this.EntityID).subscribe((res => {
      this.Arr = res
      console.log(res)
    }))
   })

  }
  goToDet(id) {
    this.router.navigate(['/bookLibraryDet', id]);
  }



}
