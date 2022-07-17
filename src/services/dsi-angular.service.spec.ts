import { TestBed } from '@angular/core/testing';

import { DsiAngularService } from './dsi-angular.service';

describe('DsiAngularService', () => {
  let service: DsiAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsiAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
