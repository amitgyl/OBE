import { TestBed, inject } from '@angular/core/testing';

import { RoomsAvailableService } from './rooms-available.service';

describe('RoomsAvailableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomsAvailableService]
    });
  });

  it('should ...', inject([RoomsAvailableService], (service: RoomsAvailableService) => {
    expect(service).toBeTruthy();
  }));
});
