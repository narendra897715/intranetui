import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentlyPostedComponent } from './dashboard-recently-posted.component';

describe('DashboardRecentlyPostedComponent', () => {
  let component: DashboardRecentlyPostedComponent;
  let fixture: ComponentFixture<DashboardRecentlyPostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRecentlyPostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRecentlyPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
