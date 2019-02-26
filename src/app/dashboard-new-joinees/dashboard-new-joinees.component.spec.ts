import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewJoineesComponent } from './dashboard-new-joinees.component';

describe('DashboardNewJoineesComponent', () => {
  let component: DashboardNewJoineesComponent;
  let fixture: ComponentFixture<DashboardNewJoineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNewJoineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNewJoineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
