import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

 
  Arr = []
  current = 1
  showMasg:boolean = false
  lang

  private currentLanguageId: number;

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

    this.rest.setTitle("حجز التذاكر - بوابة الثقافة");

    this.getData()
    this.lang = this.rest.checkLang()
  }

  getData(){
    
    let count = "6"
     this.rest.GetAllEventsWithTheatrs(this.currentLanguageId,count,this.current).subscribe((res : any)=>{
       console.log(res)
       this.Arr = res   
     }) 
   }

   onScroll() {
    this.current = this.current + 1
    let count = "6"
    this.rest.GetAllEventsWithTheatrs(this.currentLanguageId,count,this.current).subscribe((res : any)=>{
      for (let i = 0; i < res.length; i++) {
        this.Arr.push(res[i])
      }
     }) 
  }

  goToDet(id) {
    this.router.navigate(['/detTickets', id]);
  }


}
