import { TestBed, inject } from '@angular/core/testing';

import { BusinessLogicService } from './business-logic.service';

describe('BusinessLogicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessLogicService]
    });
  });

  it('should be created', inject([BusinessLogicService], (service: BusinessLogicService) => {
    expect(service).toBeTruthy();
  }));
});
