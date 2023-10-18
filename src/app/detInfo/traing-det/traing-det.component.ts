import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-traing-det',
  templateUrl: './traing-det.component.html',
  styleUrls: ['./traing-det.component.css']
})
export class TraingDetComponent implements OnInit {

  private currentLanguageId: number;
  id
  Name;
  Instructors;
  Place;
  StartDate;
  EndDate;
  Cost;
  HoursNo;
  response
  token 
  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    private route : Router ,
    private SpinnerService: NgxSpinnerService,
    public myLanguageService: MyLanguageServiceService,
  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
     this.token = localStorage.getItem("tokenData")
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.gettraingDet(this.id, this.currentLanguageId, this.token).subscribe((res: any) => {
        this.response = res
        this.Name = res.Name
        this.Place = res.Place
        this.StartDate = res.StartDate
        this.EndDate = res.EndDate
        this.Cost = res.Cost
        this.HoursNo = res.HoursNo
        this.Instructors = res.Instructors
        console.log(this.response)
      })
    })
  }

  nameOf
  private base64textString = "";
  handleFileSelect(evt) {
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
  }
  save(){
    if(this.response.PreRequestCourses != null){
      this.SpinnerService.show()
      if(this.base64textString != ""){
        this.rest.PostTraningNeedRequest(this.id,this.base64textString,this.token).subscribe( res => {
          console.log(res)
          if(res == true){
            this.SpinnerService.hide()
            localStorage.setItem('traingPlaningObj' ,JSON.stringify(this.response ) );
            this.route.navigateByUrl('/traingApply')
          }else{
            this.SpinnerService.hide()
          }
        })
      }else{
        this.SpinnerService.hide()
      }
    }else{
      
      console.log(this.response)
      localStorage.setItem('traingPlaningObj' ,JSON.stringify(this.response ) );
      this.route.navigateByUrl('/traingApply')
    }
  }


}
