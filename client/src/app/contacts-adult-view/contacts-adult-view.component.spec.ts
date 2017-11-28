import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultContactsComponent } from './adult-contacts.component';

describe('AdultContactsComponent', () => {
  let component: AdultContactsComponent;
  let fixture: ComponentFixture<AdultContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdultContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
