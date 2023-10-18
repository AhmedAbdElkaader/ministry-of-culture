import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-docment-det',
  templateUrl: './docment-det.component.html',
  styleUrls: ['./docment-det.component.css']
})
export class DocmentDetComponent implements OnInit {

  currentLanguageId
  id
  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    public myLanguageService: MyLanguageServiceService,
    private route: Router,
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
    let token = localStorage.getItem('tokenData')
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.getDocDet(token,this.id).subscribe((res : any) =>{
        console.log(res)
      })
   });
   }

}
