import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  private currentLanguageId: number;

  id
  inputsArray;
  idOfTap = 0
  oldStauts
  showErorrMasg = false
  compName;
  compDate;
  compStauts;
  compPaid;
  showDetails = false
  arrOfForm = false
  form = new FormGroup({})

  constructor(
    public rest: RestService,
    private route: Router,
    public myLanguageService: MyLanguageServiceService,
    private router: ActivatedRoute,
    private SpinnerService: NgxSpinnerService

  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }

  ngOnInit() {
    this.getData()
    this.getOldCompApplay()
  }

  getData() {
    let token = localStorage.getItem("tokenData")
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.getCompt(this.currentLanguageId, this.id, token).subscribe((res: any) => {
        if(res.length == 0){
          this.arrOfForm = false
        }else{
          this.arrOfForm = true
        }
        
        res.forEach(x => {

          if (x.DataType == "email") {
            this.form.addControl(x.Name, new FormControl('', [
              Validators.required,
              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
            ]))
          }
          else if (x.DataType == "number" || x.DataType == "tel") {
            this.form.addControl(x.Name, new FormControl('', [
              Validators.required,

            ]))
          }
          else if (x.DataType == "DDL") {
            this.form.addControl(x.Name, new FormControl('', Validators.required))
          }
          else if (x.DataType != "DDL" && x.isMandotry == true) {
            this.form.addControl(x.Name, new FormControl('', Validators.required))
          } else if (x.DataType != "DDL" && x.isMandotry != true) {
            this.form.addControl(x.Name, new FormControl(''))
          }
        })

        console.log(res)
        this.inputsArray = res
      })
    })

  }
  getForm() {
    this.SpinnerService.show();
    let token = localStorage.getItem("tokenData")
    const arr = Object.keys(this.form.value).map(key => ({ Name: key, value: this.form.value[key] }));
    console.log(arr)
    this.rest.postCompt(arr, this.id, token).subscribe((res: any) => {
      console.log(res)
      if (res == null) {
        this.idOfTap = 1
        let element: HTMLElement = document.getElementsByClassName('tabOne')[0] as HTMLElement;
        element.click();
        this.getOldCompApplay()
        this.SpinnerService.hide();
      } else {
        this.SpinnerService.hide();
      }
    })
  }

  updateActive(number) {
    this.showDetails = false
    this.idOfTap = number
  }

  getOldCompApplay() {
    let token = localStorage.getItem("tokenData")
    console.log(this.id)
    this.rest.oldComptApply(this.id, token).subscribe(res => {

      this.oldStauts = res
      console.log(res)
      if (this.oldStauts.length == 0) {
        this.showErorrMasg = true
      } else {
        this.showErorrMasg = false
      }
    })
  }


  nameOf
  private base64textString;
  handleFileSelect(evt, name) {
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
    console.log(this.base64textString);
    console.log(this.nameOf)
    this.form.patchValue({
      [this.nameOf]: this.base64textString
    });
  }


 compResp; 
  getCompDetails(id){
    this.SpinnerService.show()
    let token = localStorage.getItem("tokenData")
    this.rest.copmdetails(this.id,id,token).subscribe((res : any) => {
      this.compResp = res
      this.SpinnerService.hide()
      this.showDetails = true
      console.log(res)
      this.compName = res[5].value;
      this.compDate = res[1].value
      for(let i = 0 ; i < this.oldStauts.length ; i++){
        if(id == this.oldStauts[i].Id && this.oldStauts[i].isAccepted == false && this.oldStauts[i].isPaid == false){
          this.compStauts = "مراجعة"
          this.compPaid = "لا"
        }else if (id == this.oldStauts[i].Id && this.oldStauts[i].isAccepted == true && this.oldStauts[i].isPaid == true){
          this.compStauts = "موافقة"
          this.compPaid = "نعم"
        }
      }
      
      
    })
  }

}
