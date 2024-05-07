import { TestBed } from '@angular/core/testing';

import { TriPOSLaneService } from './tri-poslane.service';

describe('TriPOSLaneService', () => {
  let service: TriPOSLaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriPOSLaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
