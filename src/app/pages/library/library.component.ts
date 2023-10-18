import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  private currentLanguageId: number;
  current = 1
  count = '6'
  Arr
  lang
  queryField: FormControl = new FormControl('');
  listArr = []
  
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

    this.rest.setTitle("المكتبات - بوابة الثقافة");

    this.queryField.valueChanges.subscribe((queryFieldValue: string)=>{
      if(this.queryField.value != "" ){
        this.listArr = []
      this.rest.getBookSearch(queryFieldValue).subscribe((res :any) => {
        console.log(res)
        this.listArr = res
      })
     }else{
       this.listArr = []
     }
    })
    
    this.getData()
    this.lang = this.rest.checkLang()
  }

  getData(){
    this.rest.GetAllLibrary(this.currentLanguageId,this.count,this.current).subscribe((res => {
      this.Arr = res
      console.log(res)
    }))
  }

  goToDet(id) {
    this.router.navigate(['/bookLibrary', id]);
  }

  goToDetels(id){
  this.router.navigate(['/bookLibraryDet', id]);
  }

  onScroll() {
    this.current = this.current + 1
    this.rest.GetAllLibrary(this.currentLanguageId,this.count,this.current).subscribe((res : any) => {
      for (let i = 0; i < res.length; i++) {
        this.Arr.push(res[i])
       }      
    })
  }
  


}
