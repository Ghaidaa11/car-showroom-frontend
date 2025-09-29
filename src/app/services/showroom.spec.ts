import { TestBed } from '@angular/core/testing';

import { Showroom } from './showroom';

describe('Showroom', () => {
  let service: Showroom;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Showroom);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
