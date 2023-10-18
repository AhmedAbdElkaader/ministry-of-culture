import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NgxSpinnerService } from "ngx-spinner";  
import { Router } from '@angular/router';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  changeForm : FormGroup

  constructor(public rest: RestService , private router: Router,
     private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    

    this.changeForm = new FormGroup ({
      OldPassword : new FormControl('',Validators.required),
      NewPassword: new FormControl('',Validators.required),
      ConfirmPassword: new FormControl('',Validators.required)
    })
  }

  changePass() {
    this.SpinnerService.show();
    console.log(this.changeForm.value)
    let token = localStorage.getItem("tokenData")
    let userID = localStorage.getItem("userID")
    let obj = this.changeForm.value
    obj.AspNetUserId = userID
    this.rest.changePass(obj, token).subscribe((res: any) => {
      this.SpinnerService.hide();
      alert("The password has been changed successfully")
      this.rest.sendInfo(res)
    },
      (error: any) => {
        this.SpinnerService.hide();
        alert("password is incorrect")
        console.log(error)
      }
    )
  }

}
