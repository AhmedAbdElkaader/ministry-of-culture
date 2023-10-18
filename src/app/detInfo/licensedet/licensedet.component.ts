import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-licensedet',
  templateUrl: './licensedet.component.html',
  styleUrls: ['./licensedet.component.css']
})
export class LicensedetComponent implements OnInit {

  subscription: Subscription;
  id
  langId = "1"
  inputsArray = []
  form = new FormGroup({})
  isDisabled = false
  idOfTap = 0
  oldStauts = []
  showErorrMasg = false
  private base64textString;

  constructor(public rest: RestService, private rout: Router,
    private SpinnerService: NgxSpinnerService,
     private router: ActivatedRoute) { }

  ngOnInit() {
    this.getData()
    this.statusOfForm()
  }

  getData() {
    let token = localStorage.getItem("tokenData")
    this.router.params.subscribe(params => {
      this.id = params['id']; 
      this.rest.getLicenseForm(this.id, this.langId, token).subscribe((res : any) =>{
        console.log("res : ", res)
        res.forEach(x => {
          if(x.DataType == "DDL"){
            this.form.addControl(x.Name, new FormControl('', Validators.required))
          }
          else if (x.DataType == "file" && x.isMandotry == true) {
            this.form.addControl(x.Name, new FormControl(''))
          } else if (x.DataType == "file" && x.isMandotry != true) {
            this.form.addControl(x.Name, new FormControl(''))
          }else if (x.DataType != "file" && x.isMandotry == true){
            this.form.addControl(x.Name, new FormControl('', Validators.required))
          }else if (x.DataType != "file" && x.isMandotry != true){
            this.form.addControl(x.Name, new FormControl(''))
          }
        })
        this.inputsArray = res
      })
   });
  }


  getForm() {
    this.SpinnerService.show(); 
    this.isDisabled = true
    let token = localStorage.getItem("tokenData")
    this.form.patchValue({
      [this.nameOf]: this.base64textString
    });
    const arr = Object.keys(this.form.value).map(key => ({ Name: key, value: this.form.value[key] }));
    console.log(arr)

    this.rest.setLicense(this.id,arr , token).subscribe((res : any) => {
      console.log(res)
      if(res == true){
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

  updateActive(number) {

      this.idOfTap = number

  }

  nameOf
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

  statusOfForm(){
    let token = localStorage.getItem("tokenData")
    this.router.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
      this.rest.statusOflicnes(this.id,token).subscribe((res : any) => {
        console.log("status",res)
        this.oldStauts = res
        if(this.oldStauts.length == 0){
          this.showErorrMasg = true
        }else{
          this.showErorrMasg = false
        }
        
      })
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
    this.rest.licenceDetails(this.id,id,token).subscribe((res : any) => {
      this.fairResp = res
      this.SpinnerService.hide()
      this.showDetails = true
      console.log(res)
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
