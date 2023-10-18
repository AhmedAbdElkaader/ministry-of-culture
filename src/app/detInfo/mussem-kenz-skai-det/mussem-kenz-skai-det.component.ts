import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-mussem-kenz-skai-det',
  templateUrl: './mussem-kenz-skai-det.component.html',
  styleUrls: ['./mussem-kenz-skai-det.component.css']
})
export class MussemKenzSkaiDetComponent implements OnInit {

  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  langId = '1'
  id

  constructor(private rest:RestService , 
    private router: ActivatedRoute,
    private route : Router) { }

  ngOnInit() {
    // let elment: HTMLElement = document.getElementById('myModala') as HTMLElement
    // elment.click()
    
    this.router.params.subscribe(params => {
      this.id = params['id']; 
      
   });
  }
}
