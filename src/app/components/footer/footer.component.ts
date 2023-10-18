import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  subscription: Subscription;
  logo = "../../../assets/images/logo-white.png"
  constructor(private rest : RestService , private router: Router) { }

  ngOnInit() {
    this.subscription = this.rest.getLogo().subscribe(res => {
      this.logo = res
    })
  }


}
