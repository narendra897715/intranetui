import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpopupmodalComponent } from './editpopupmodal.component';

describe('EditpopupmodalComponent', () => {
  let component: EditpopupmodalComponent;
  let fixture: ComponentFixture<EditpopupmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpopupmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpopupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
