import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms'

@Component({
  selector: 'app-documnets',
  templateUrl: './documnets.component.html',
  styleUrls: ['./documnets.component.css']
})
export class DocumnetsComponent implements OnInit {

  private currentLanguageId: number;
  current = 1
  count = '6'
  Arr
  listOfDoc
  showList = false
  Form: FormGroup

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

    this.rest.setTitle(" خدمة الوثائق - بوابة الثقافة");

    this.Form = new FormGroup({
      nameOfWseka: new FormControl('', Validators.required),
    })
    this.getData()
  }

  getData() {
    let token = localStorage.getItem('tokenData')
    if(token != null){
      this.rest.GetDocemnts(token).subscribe((res => {
        this.listOfDoc = res
        console.log(res)
        this.showList = true
      }))
    }else{
      this.showList  = false
    }
  }

  goToDet(id) {
    this.router.navigate(['/DocDet', id]);
  }

  go(){
    let token = localStorage.getItem('tokenData')

    if(token == null){
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
    }else{
      let nameOfWseka =  this.Form.value.nameOfWseka
      let obj = {
       Name: nameOfWseka
     }
     this.rest.postDocment(obj,token)
     this.rest.getInfo().subscribe(res => {
       this.listOfDoc = res
       this.showList = true
     })
      console.log(nameOfWseka)
    }


  }
}
