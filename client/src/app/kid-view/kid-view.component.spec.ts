import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidViewComponent } from './kid-view.component';

describe('KidViewComponent', () => {
  let component: KidViewComponent;
  let fixture: ComponentFixture<KidViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
