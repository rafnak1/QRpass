import { TestBed } from '@angular/core/testing';

import { GuestServiceService } from './guest-service.service';

describe('GuestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestServiceService = TestBed.get(GuestServiceService);
    expect(service).toBeTruthy();
  });
});
