import { TestBed } from '@angular/core/testing';

import { MyLanguageServiceService } from './my-language-service.service';

describe('MyLanguageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyLanguageServiceService = TestBed.get(MyLanguageServiceService);
    expect(service).toBeTruthy();
  });
});
