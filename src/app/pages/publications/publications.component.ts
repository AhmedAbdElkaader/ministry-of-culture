import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  private currentLanguageId: number;
  current = 1
  count = '6'
  Arr
  listOfDoc
  showList = false
  inputsArray
  form = new FormGroup({})
    constructor(
    public rest: RestService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService
  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }

  ngOnInit() {
    this.rest.setTitle(" خدمة النشر - بوابة الثقافة");
    this.getData()
    this.statusOfForm()

  }

  getData() {
    let token = localStorage.getItem("tokenData")
      this.rest.GetPublicationForm(this.currentLanguageId, token).subscribe((res : any) =>{
        console.log("res : ", res)
        res.forEach(x => {

          if (x.isMandotry == true && x.DataType != 'file') {
            this.form.addControl(x.Name, new FormControl('',Validators.required))
          }else if(x.DataType == 'file'){
            this.form.addControl(x.Name, new FormControl(''))
          } else if (x.isMandotry != true) {
            this.form.addControl(x.Name, new FormControl(''))
          }
        })
        this.inputsArray = res
      })
   ;
  }

  idOfTap = 0
  
  postForm() {
    let token = localStorage.getItem("tokenData")

    if (token == null) {
      let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
      elment.click()
      this.rest.getToken().subscribe(res => {
        console.log(res)
      })
    }else{
      this.SpinnerService.show(); 
      this.form.patchValue({
        [this.nameOf]: this.base64textString
      });
      const arr = Object.keys(this.form.value).map(key => ({ Name: key, value: this.form.value[key] }));
      console.log(arr)
      this.rest.postPublicationForm(arr , token).subscribe((res : any) => {
        console.log(res)
        if(res == null){
          this.SpinnerService.hide(); 
          this.idOfTap = 1
          let element: HTMLElement = document.getElementsByClassName('tabOne')[0] as HTMLElement;
          element.click();
          this.statusOfForm()
        }else{
          this.SpinnerService.hide(); 
        }
      })
    }
   
  }

  fairResp; 
  showDetails = false
  fairStauts
  fairPaid
  fairDate
  oldStauts

  showErorrMasg = false
  statusOfForm(){
    let token = localStorage.getItem("tokenData") 
    if (token != null) {
      this.rest.GetPublicationOld(token).subscribe((res : any) => {
        console.log("status",res)
        this.oldStauts = res
        if(this.oldStauts.length == 0){
          this.showErorrMasg = true
        }else{
          this.showErorrMasg = false
        }
    })
    }

 
  }

  updateActive(number) {

    this.idOfTap = number

}
  getCompDetails(id){
    this.SpinnerService.show()
    let token = localStorage.getItem("tokenData")
    this.rest.PublicationDetails(id,token).subscribe((res : any) => {
      this.fairResp = res
      this.SpinnerService.hide()
      this.showDetails = true
      console.log(res)
      for(let i = 0 ; i < this.oldStauts.length ; i++){
        if(id == this.oldStauts[i].Id && this.oldStauts[i].isAccepted == false && this.oldStauts[i].isPaid == false){
          this.fairStauts = "مراجعة"
          this.fairPaid = "لا"
        }else if (id == this.oldStauts[i].Id && this.oldStauts[i].isAccepted == true && this.oldStauts[i].isPaid == true){
          this.fairStauts = "تم"
          this.fairPaid = "نعم"
        }
      }    
    })
  }

  // goToDet(id) {
  //   this.router.navigate(['/DocDet', id]);
  // }

  // go(){
  //   let token = localStorage.getItem('tokenData')

  //   if(token == null){
  //     let elment: HTMLElement = document.getElementById('myModalaa') as HTMLElement
  //     elment.click()
  //   }else{
  //     let nameOfWseka =  this.Form.value.nameOfWseka
  //     let obj = {
  //      Name: nameOfWseka
  //    }
  //    this.rest.postDocment(obj,token)
  //    this.rest.getInfo().subscribe(res => {
  //      this.listOfDoc = res
  //      this.showList = true
  //    })
  //     console.log(nameOfWseka)
  //   }
  // }

  // handleFileSelect(event){
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //       console.log(reader.result);
  //   };
  //   }


    nameOf
    private base64textString;
    handleFileSelect(evt , name) {
      this.nameOf = name
      var files = evt.target.files;
      var file = files[0];
  
      if (files && file) {
        var reader = new FileReader();
  
        reader.onload = this._handleReaderLoaded.bind(this);
  
        reader.readAsBinaryString(file);
      }
    }
    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.base64textString = btoa(binaryString);
      console.log( this.base64textString);
      console.log(this.nameOf)
    }
}
