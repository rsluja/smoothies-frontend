import { TestBed } from '@angular/core/testing';

import { SmoothieServiceService } from './smoothie-service.service';

describe('SmoothieServiceService', () => {
  let service: SmoothieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmoothieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
