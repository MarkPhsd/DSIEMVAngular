import { TestBed } from '@angular/core/testing';

import { CardPointService } from './card-point.service';

describe('CardPointService', () => {
  let service: CardPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
