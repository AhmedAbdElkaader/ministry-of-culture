import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-about-entity',
  templateUrl: './about-entity.component.html',
  styleUrls: ['./about-entity.component.css']
})
export class AboutEntityComponent implements OnInit {

  subscription: Subscription;
  entitArr = []
  id
  lang = 1
  nameOfEntity
  entityId
  description
  sublistDetails = false
  subDetails = false
  private currentLanguageId: number;

  constructor(
    public rest: RestService,
    private router: Router,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService,
    private titleService: Title,

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
   
    this.entityId = localStorage.getItem('myEntityId')
    let nameofEntity = localStorage.getItem('nameOfAboutEntity')
    this.route.params.subscribe(params => {
      this.id = params.id;
      
    if(nameofEntity == "نبذة"){
      this.rest.aboutSubEntity(this.currentLanguageId,this.entityId,this.id).subscribe((res : any) => {
        // this.entitArr = res
         this.nameOfEntity = res.Type.Name
        this.description = res.Content
        this.sublistDetails = false
        this.subDetails = true
        console.log(res)
      })
    } else{
      this.rest.aboutEntity(this.currentLanguageId,this.entityId,this.id).subscribe((res : any) => {
         this.entitArr = res
        this.nameOfEntity = res[0].Type.Name
        this.sublistDetails = true
        this.subDetails = false
        console.log(res)
      })
    } 

  })


   }

  

}
