import { TestBed } from '@angular/core/testing';

import { AdditionService } from './addition.service';

describe('AdditionService', () => {
  let service: AdditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
