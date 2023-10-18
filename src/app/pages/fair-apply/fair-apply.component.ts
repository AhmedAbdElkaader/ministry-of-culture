import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fair-apply',
  templateUrl: './fair-apply.component.html',
  styleUrls: ['./fair-apply.component.css']
})
export class FairApplyComponent implements OnInit {

  subscription: Subscription;
  langId = "1"
  id
  inputsArray
  form = new FormGroup({})
  idOfTap = 0
  isDisabled = false
  oldStauts
  showErorrMasg = false
  idOfSupscription
  arrOFsub
  constructor(public rest: RestService, private router: ActivatedRoute, private rout: Router, private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.oldFairApplay()
      this.rest.getFairForm(this.langId, this.id).subscribe((res : any) =>{
        console.log('res :: ', res)
        res.forEach(x => {
          if(x.Name == "أنواع الاشتراكات"){
            this.arrOFsub = x.subscriptionTypes
            this.form.addControl(x.Name, new FormControl(this.arrOFsub[0].Name, Validators.required))
          } 
          if (x.DataType == "email") {
            this.form.addControl(x.Name, new FormControl('', [
              Validators.required,
              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]))
          } else if(x.DataType == "number" && x.Name != "أنواع الاشتراكات"){
            this.form.addControl(x.Name, new FormControl('',[
              Validators.required,
              Validators.pattern(/^-?(0|[1-9]\d*)?$/)
            ]))
          }else if (x.DataType == "tel"){
            this.form.addControl(x.Name, new FormControl('',[
              Validators.required,
              Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
            ]))
          } else if (x.Name != "أنواع الاشتراكات" && x.isMandotry == true) {
            this.form.addControl(x.Name, new FormControl('', Validators.required))
          } else if (x.Name != "أنواع الاشتراكات"  && x.isMandotry != true) {
            this.form.addControl(x.Name, new FormControl(''))
          }
        })

        console.log(res)
        this.inputsArray = res

      })
   });
  }

  getForm() {
    this.SpinnerService.show();
    let token = localStorage.getItem("tokenData")
    const arr = Object.keys(this.form.value).map(key => ({ Name: key, value: this.form.value[key] }));
    for(let i = 0 ; i < arr.length ; i++){
      if(arr[i].Name == "أنواع الاشتراكات"){
        for(let j = 0 ; j < this.arrOFsub.length; j++){
          if(arr[i].value == this.arrOFsub[j].Name){
            arr[i].value = this.arrOFsub[j].Id
          }
        }
      }
    }
    console.log(arr)
    this.rest.postFairForm(arr, this.id, token).subscribe((res : any) => {
      console.log(res)
      if(res == null){
        this.SpinnerService.hide()
        this.idOfTap = 1
        let element: HTMLElement = document.getElementsByClassName('tabOne')[0] as HTMLElement;
        element.click();
        this.oldFairApplay()
      }else{
        this.SpinnerService.hide()
      }
    })

  }

  updateActive(number) {
      this.idOfTap = number
  }

  getIdOfsubsc(id){
    this.idOfSupscription = id
  }

  oldFairApplay(){
    let token = localStorage.getItem("tokenData")
    this.rest.getOldFair(this.id,token).subscribe(res => {
      this.oldStauts = res
      if(this.oldStauts.length == 0){
        this.showErorrMasg = true
      }else{
        this.showErorrMasg = false
      }
      console.log('this is old' , res)
    })
  }

  fairResp; 
  showDetails = false
  fairStauts
  fairPaid
  fairDate
  getCompDetails(id){
    this.SpinnerService.show()
    let token = localStorage.getItem("tokenData")
    this.rest.fairDetails(this.id,id,token).subscribe((res : any) => {
      this.fairResp = res
      this.SpinnerService.hide()
      this.showDetails = true
      console.log(res)
      this.fairDate = res[1].value
      for(let i = 0 ; i < this.oldStauts.length ; i++){
        if(id == this.oldStauts[i].Id && this.oldStauts[i].isAccepted == false && this.oldStauts[i].isPaid == false){
          this.fairStauts = "مراجعة"
          this.fairPaid = "لا"
        }else if (id == this.oldStauts[i].Id && this.oldStauts[i].isAccepted == true && this.oldStauts[i].isPaid == true){
          this.fairStauts = "موافقة"
          this.fairPaid = "نعم"
        }
      }
      
      
    })
  }

}
