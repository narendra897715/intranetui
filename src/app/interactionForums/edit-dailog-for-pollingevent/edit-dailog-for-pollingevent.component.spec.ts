import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDailogForPollingeventComponent } from './edit-dailog-for-pollingevent.component';

describe('EditDailogForPollingeventComponent', () => {
  let component: EditDailogForPollingeventComponent;
  let fixture: ComponentFixture<EditDailogForPollingeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDailogForPollingeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDailogForPollingeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
