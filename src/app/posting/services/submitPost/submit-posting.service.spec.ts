import { TestBed } from '@angular/core/testing';

import { SubmitPostingService } from './submit-posting.service';

describe('SubmitPostingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubmitPostingService = TestBed.get(SubmitPostingService);
    expect(service).toBeTruthy();
  });
});
