import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyLanguageServiceService } from 'src/app/services/my-language-service.service';

@Component({
  selector: 'app-boosk-library-det',
  templateUrl: './boosk-library-det.component.html',
  styleUrls: ['./boosk-library-det.component.css']
})
export class BooskLibraryDetComponent implements OnInit {

  private currentLanguageId: number;
  bookID
  bookImage
  entits;
  bookName
  details

  constructor(
    public rest: RestService,
    private router: Router,
    private route: ActivatedRoute,
    public myLanguageService: MyLanguageServiceService
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
    this.route.params.subscribe(params => {
      this.bookID = params['id'];
      this.rest.getBookDet(this.currentLanguageId, this.bookID).subscribe((res : any) => {
        this.bookImage = res.Image
        this.entits = res.Entities
        this.details = res.Details
        this.bookName = res.Name
        console.log(res)
      })
    })

  }

}
