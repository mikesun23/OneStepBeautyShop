import { TestBed, async, inject } from '@angular/core/testing';

import { UserIntroGuard } from './user-intro.guard';

describe('UserIntroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIntroGuard]
    });
  });

  it('should ...', inject([UserIntroGuard], (guard: UserIntroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
