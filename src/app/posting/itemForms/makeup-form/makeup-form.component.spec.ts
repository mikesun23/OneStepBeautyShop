import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupFormComponent } from './makeup-form.component';

describe('MakeupFormComponent', () => {
  let component: MakeupFormComponent;
  let fixture: ComponentFixture<MakeupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
