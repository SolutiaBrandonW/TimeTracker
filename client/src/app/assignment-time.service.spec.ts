import { TestBed } from '@angular/core/testing';

import { AssignmentTimeService } from './assignment-time.service';

describe('AssignmentTimeService', () => {
  let service: AssignmentTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
