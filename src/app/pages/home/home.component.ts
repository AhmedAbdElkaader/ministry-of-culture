import { OnInit } from '@angular/core';
import { Component, HostListener, ElementRef } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;

  
  constructor(private rest : RestService) { }

  ngOnInit() {

  }


  

}
