import { TestBed } from '@angular/core/testing';

import { FormConvertorService } from './form-convertor.service';

describe('FormConvertorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormConvertorService = TestBed.get(FormConvertorService);
    expect(service).toBeTruthy();
  });
});
