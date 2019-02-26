import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIndustryNewsComponent } from './dashboard-industry-news.component';

describe('DashboardIndustryNewsComponent', () => {
  let component: DashboardIndustryNewsComponent;
  let fixture: ComponentFixture<DashboardIndustryNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardIndustryNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardIndustryNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
