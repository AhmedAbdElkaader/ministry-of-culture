import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyLanguageServiceService {
  languageChangeId$: Observable<number>;
  languageSubject: Subject<number>;

  constructor() {
    this.languageSubject = new Subject<number>();
    this.languageChangeId$ = this.languageSubject.asObservable();
  }
}
