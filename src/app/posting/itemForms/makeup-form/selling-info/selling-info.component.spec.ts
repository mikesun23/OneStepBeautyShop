import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingInfoComponent } from './selling-info.component';

describe('SellingInfoComponent', () => {
  let component: SellingInfoComponent;
  let fixture: ComponentFixture<SellingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
