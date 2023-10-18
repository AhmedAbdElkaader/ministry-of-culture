import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
//import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cheack-out',
  templateUrl: './cheack-out.component.html',
  styleUrls: ['./cheack-out.component.css']
})
export class CheackOutComponent implements OnInit {

  // dangerousVideoUrl: string;
  // shareLink: SafeResourceUrl;

  subscription: Subscription;

  arrOFtikets = []
  formBook: FormGroup;

  fessIframe: any
  payButton = true
  arrayOfTicketsEmt = true
  penddingMag;
  showInputsForCash;
  cheackRadio = false

  total = 0
  constructor(private rest: RestService,
    private router: Router,

  ) { }

  ngOnInit() {

    this.formBook = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phone_number: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      street: new FormControl("", Validators.required),
      building: new FormControl("", Validators.required),
      apartment: new FormControl("", Validators.required),
      floor: new FormControl("", Validators.required),
      paymentUse: new FormControl('', Validators.required)
    })

    this.arrOFtikets = JSON.parse(localStorage.getItem("arrOFTikcts"));
    if(this.arrOFtikets != null || this.arrOFtikets != undefined){
      for (let i = 0; i < this.arrOFtikets.length; i++) {
        if(this.arrOFtikets[i].Number && this.arrOFtikets[i].Price){
          this.total = this.total + this.arrOFtikets[i].Number * this.arrOFtikets[i].Price +  this.arrOFtikets[i].Cost 
        }else{
          this.total = this.total + this.arrOFtikets[i].Cost 
        }
      }
      console.log(this.arrOFtikets)
      this.arrayOfTicketsEmt = false
    }else{
      this.arrayOfTicketsEmt = true
    }
   
  }


  deletItem(id, i) {
    if (id == this.arrOFtikets[i].id || id == this.arrOFtikets[i].Id || id == this.arrOFtikets[i].ID) {
      this.arrOFtikets.splice(i, 1)
    }
    if (this.arrOFtikets.length != 0) {
      this.total = 0
      for (let i = 0; i < this.arrOFtikets.length; i++) {
        this.total = this.total + (this.arrOFtikets[i].Price * this.arrOFtikets[i].Number)
      }
      localStorage.setItem("arrOFTikcts", JSON.stringify(this.arrOFtikets));
    } else {
      this.payButton = false
      this.arrayOfTicketsEmt = true
      localStorage.removeItem('arrOFTikcts');
      //localStorage.setItem("arrOFtikets", JSON.stringify(this.arrOFtikets));
    }

  }

  sendFess() {
    this.arrOFtikets = JSON.parse(localStorage.getItem("arrOFTikcts"));
    let total = 0
    for (let i = 0; i < this.arrOFtikets.length; i++) {
      total = total + this.arrOFtikets[i].Number * this.arrOFtikets[i].Price
    }
    let obj = this.formBook.value
    console.log(obj)
    let fessObj
    if (obj.paymentUse == "Card") {
      fessObj = {
        billing_data: {
          name: obj.name,
          email: obj.email,
          phone_number: obj.phone_number
        },
        amount: total,
        currency: "EGP",
        variable_amount_id: 63,
        community_id: "M2Q1r2Y",
        pay_using: "card"
      }
    } else if (obj.paymentUse == "kiosk") {
      obj.phone_number = obj.phone_number
      fessObj = {
        billing_data: {
          name: obj.name,
          email: obj.email,
          phone_number: obj.phone_number
        },
        amount: total,
        currency: "EGP",
        variable_amount_id: 63,
        community_id: "M2Q1r2Y",
        pay_using: "kiosk"
      }

    }else {
      fessObj = {
        billing_data: {
          name: obj.name,
          email: obj.email,
          phone_number: obj.phone_number,
          country : obj.country,
          state : obj.state,
          city : obj.city,
          street : obj.street,
          building : obj.building,
          apartment : obj.apartment,
          floor : obj.floor
        },
        amount: total,
        currency: "EGP",
        variable_amount_id: 63,
        community_id: "M2Q1r2Y",
        pay_using: "cash"
      }
    }

    console.log(fessObj)
    this.rest.payFess(fessObj)

    this.subscription = this.rest.getToken().subscribe(res => {
      console.log(res)
      if (res.data.iframe_url == null) {
        if(obj.paymentUse == "kiosk"){
          this.penddingMag = res.data.transaction_status
          localStorage.setItem('myUUID', res.data.transaction_uuid);
          localStorage.setItem('pendMasg', res.data.message);
          localStorage.setItem('statusPayment', 'kiosk');
          this.router.navigateByUrl(`/FeesCheck`)
        }else{
          this.penddingMag = res.data.transaction_status
          localStorage.setItem('myUUID', res.data.transaction_uuid);
          localStorage.setItem('pendMasg', res.data.message);
          localStorage.setItem('statusPayment', 'cash');
          this.router.navigateByUrl(`/FeesCheck`)
        }
    
      } else {
        localStorage.setItem('statusPayment', 'card');
        this.fessIframe = res.data.iframe_url
        localStorage.setItem('myUUID', res.data.transaction_uuid);
        window.location.href = this.fessIframe;
      }
    })
  }

  selctedCash(value) {
    this.showInputsForCash = value
    if (value != 'Cash') {
      this.formBook.patchValue({
        country:"..",
        state: "..",
        city: "..",
        street: "..",
        building: "..",
        apartment: "..",
        floor: "..",
      })
    }else{
      this.formBook.patchValue({
        country:"",
        state: "",
        city: "",
        street: "",
        building: "",
        apartment: "",
        floor: "",
      })
    }
    console.log(this.formBook.value)

  }
 
  CountPlus(id) {
    for (let i = 0; i < this.arrOFtikets.length; i++) {
      if (id == this.arrOFtikets[i].id || id == this.arrOFtikets[i].Id) {
       // this.arrOFtikets[i].price = this.arrOFtikets[i].price / this.arrOFtikets[i].Counter
        this.arrOFtikets[i].Number += 1
        // this.arrOFtikets[i].price = this.arrOFtikets[i].Price * this.arrOFtikets[i].Number
        this.total = this.total + this.arrOFtikets[i].Price
        localStorage.setItem("arrOFTikcts", JSON.stringify(this.arrOFtikets));
      }
    }

  }

  CountMuins(id) {
    for (let i = 0; i < this.arrOFtikets.length; i++) {

      if (id == this.arrOFtikets[i].id || id == this.arrOFtikets[i].Id) {
        if (this.arrOFtikets[i].Number == 1) {
          break
        } else {
         // this.arrOFtikets[i].price = this.arrOFtikets[i].price / this.arrOFtikets[i].Counter
          this.arrOFtikets[i].Number -= 1
          // this.arrOFtikets[i].Price = this.arrOFtikets[i].Price * this.arrOFtikets[i].Number
          this.total = this.total - this.arrOFtikets[i].Price
          localStorage.setItem("arrOFTikcts", JSON.stringify(this.arrOFtikets));
        }
      }
    }
  }

}

