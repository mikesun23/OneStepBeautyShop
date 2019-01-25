import { TestBed } from '@angular/core/testing';

import { FetchRawListService } from './fetch-raw-list.service';

describe('FetchRawListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchRawListService = TestBed.get(FetchRawListService);
    expect(service).toBeTruthy();
  });
});
