import { Component, OnDestroy,OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import {  HostListener, ElementRef } from '@angular/core';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy{
  isShow: boolean;
  topPosToStartShowing = 100;
  constructor(private wowService: NgwWowService , private rest : RestService) {
    this.rest.setTitle("بوابة الثقافة - بوابة الثقافة");
    this.wowService.init();
  }
  
  @HostListener('window:scroll')

  ngOnInit() {


    this.checkScroll()
  }
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

   gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }



  ngOnDestroy(): void {
    sessionStorage.clear()
  }
}
