import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-traing-apply',
  templateUrl: './traing-apply.component.html',
  styleUrls: ['./traing-apply.component.css']
})
export class TraingApplyComponent implements OnInit {

  response
  id
  Name;
  Instructors;
  Place;
  StartDate;
  EndDate;
  Cost;
  HoursNo;
  idOfTap = 0
  userIfApplyOld = {
    Acceppted: false,
    Cost: 0,
    Paid: false
  }
  ifDisabled = false
  constructor(public rest: RestService,
    private route: Router,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show(); 
    this.response = JSON.parse(localStorage.getItem('traingPlaningObj'))
    this.Name = this.response.Name
    this.Place = this.response.Place
    this.StartDate = this.response.StartDate
    this.EndDate = this.response.EndDate
    this.Cost = this.response.Cost
    this.HoursNo = this.response.HoursNo
    this.Instructors = this.response.Instructors
    this.getStatusTraing()
    setTimeout(res =>{ 
      this.SpinnerService.hide();
    }, 3000);
  }

  updateActive(number) {
    if (this.userIfApplyOld.Cost != 0) {
      this.idOfTap = number
    }

  }

  save() {
    this.SpinnerService.show(); 
    let token = localStorage.getItem("tokenData")
    console.log(this.response.ID)
    this.rest.postTraing(this.response.ID, token).subscribe(res => {
      console.log(res)
      if (res == true) {
        this.getStatusTraing()
        this.idOfTap = 1
        let element: HTMLElement = document.getElementsByClassName('tabOne')[0] as HTMLElement;
        element.click();
        setTimeout(res =>{ 
          let element: HTMLElement = document.getElementsByClassName('tabOne')[0] as HTMLElement;
          element.click();
          this.SpinnerService.hide();
        }, 3000);
      }
    })

  }

  getStatusTraing() {
    let token = localStorage.getItem("tokenData")
    this.rest.statusOftraing(this.response.ID, token).subscribe((res :any) => {
      this.userIfApplyOld = res
      
      // if(this.userIfApplyOld){
      //   this.idOfTap = 1
      //   let element: HTMLElement = document.getElementsByClassName('tabOne')[0] as HTMLElement;
      //   element.click();
      // }else{
      //   this.ifDisabled = true
      // }
      console.log(res)
    })
  }

  goToCehck(){
    let arr = []
    let dumy = JSON.parse(localStorage.getItem("arrOFTikcts"))
    if (dumy == null || dumy == undefined) {
      arr.push(this.response)
    } else {
      arr = JSON.parse(localStorage.getItem("arrOFTikcts"))
      arr.push(this.response)
    }
    localStorage.setItem("arrOFTikcts", JSON.stringify(arr));
    this.route.navigateByUrl(`/cheackOut`)
  }
}
