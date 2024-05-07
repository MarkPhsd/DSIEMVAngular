import { TestBed } from '@angular/core/testing';

import { TriPOSProcessingService } from './tri-posprocessing.service';

describe('TriPOSProcessingService', () => {
  let service: TriPOSProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriPOSProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
