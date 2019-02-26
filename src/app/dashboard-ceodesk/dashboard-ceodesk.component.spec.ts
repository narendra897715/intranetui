import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCeodeskComponent } from './dashboard-ceodesk.component';

describe('DashboardCeodeskComponent', () => {
  let component: DashboardCeodeskComponent;
  let fixture: ComponentFixture<DashboardCeodeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCeodeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCeodeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
