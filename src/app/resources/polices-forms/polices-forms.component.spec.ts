import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicesFormsComponent } from './polices-forms.component';

describe('PolicesFormsComponent', () => {
  let component: PolicesFormsComponent;
  let fixture: ComponentFixture<PolicesFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicesFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
