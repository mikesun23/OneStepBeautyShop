import { TestBed } from '@angular/core/testing';

import { GeneralPostService } from './general-post.service';

describe('GeneralPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralPostService = TestBed.get(GeneralPostService);
    expect(service).toBeTruthy();
  });
});
