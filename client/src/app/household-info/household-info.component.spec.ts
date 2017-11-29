import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdInfoComponent } from './household-info.component';

describe('HouseholdInfoComponent', () => {
  let component: HouseholdInfoComponent;
  let fixture: ComponentFixture<HouseholdInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
