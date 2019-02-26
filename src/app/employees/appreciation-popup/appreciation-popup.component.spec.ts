import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreciationPopupComponent } from './appreciation-popup.component';

describe('AppreciationPopupComponent', () => {
  let component: AppreciationPopupComponent;
  let fixture: ComponentFixture<AppreciationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppreciationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppreciationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
