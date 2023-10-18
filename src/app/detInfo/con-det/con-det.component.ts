import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { MyLanguageServiceService } from '../../services/my-language-service.service';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-con-det',
  templateUrl: './con-det.component.html',
  styleUrls: ['./con-det.component.css']
})
export class ConDetComponent implements OnInit {

  conForm: FormGroup
  workHours
  noHours
  Name
  WorkFrom
  WorkTo
  WorkDays
  EntityName
  id
  showIfBooking = false
  private currentLanguageId: number;

  constructor(
    public rest: RestService,
    private router: ActivatedRoute,
    public myLanguageService: MyLanguageServiceService,
    private route: Router,
    public datepipe: DatePipe
  ) {
    myLanguageService.languageChangeId$.subscribe((newValue: number) => {
      this.currentLanguageId = newValue;
      this.getData();
    });
  }
  ngOnInit() {
    this.getData()

    this.conForm = new FormGroup({
      Date: new FormControl('', Validators.required),
      resFrom: new FormControl('', Validators.required),
      resTo: new FormControl('', Validators.required),
    })
  }

  getData() {
    this.router.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a numbe
      this.rest.GetConferenceDetails(this.currentLanguageId, this.id).subscribe((res: any) => {
        console.log(res)
        if (res.Name == null) {
          this.route.navigateByUrl('/home');
        } else {
          this.Name = res.Name
          this.EntityName = res.EntityName
          this.WorkFrom = res.WorkFrom
          this.WorkTo = res.WorkTo
          this.WorkDays = res.WorkDays
          this.workHours = this.timeArray(res.WorkFrom, res.WorkTo)
          console.log('work hours : ', this.workHours)
        }
      })
    });
  }

  setHall() {
    let token = localStorage.getItem("tokenData")
    let obj = this.conForm.value
    console.log('obj : ', obj)
    let nameOFDay = this.datepipe.transform(obj.Date, 'EEEE')
    if (nameOFDay == 'Thursday') {
      nameOFDay = 'الخميس'
    } else if (nameOFDay == 'Saturday') {
      nameOFDay = 'السبت'
    } else if (nameOFDay == 'Sunday') {
      nameOFDay = 'الأحد'
    } else if (nameOFDay == 'Monday') {
      nameOFDay = 'الأثنين'
    } else if (nameOFDay == 'Tuesday') {
      nameOFDay = 'الثلاثاء'
    } else if (nameOFDay == 'Wednesday') {
      nameOFDay = 'الأربعاء'
    } else if (nameOFDay == 'Friday') {
      nameOFDay = 'الجمعة'
    }
    let result = this.WorkDays.includes(nameOFDay)
    if (result == true) {
      this.rest.setConferenceHall(obj, token).subscribe(res => {
        console.log(res)
        this.showIfBooking = true
      })
    }else{
      alert('المعرض غير متاح فى هذا اليوم')
    }

  }

  timeArray(start, end) {
    var start = start.split(":");
    var end = end.split(":");

    start = parseInt(start[0]) * 60 + parseInt(start[1]);
    end = parseInt(end[0]) * 60 + parseInt(end[1]);

    var result = [];
    let time = 0

    for (time = start; time <= end; time += 60) {
      result.push(this.timeString(time));
    }

    return result;
  }

  timeString(time) {
    var hours: string | number = Math.floor(time / 60);
    var minutes = time % 60;

    if (hours < 10) hours = "0" + hours;

    return hours + ":0" + minutes + ":00";
  }


}
