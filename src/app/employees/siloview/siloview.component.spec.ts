import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiloviewComponent } from './siloview.component';

describe('SiloviewComponent', () => {
  let component: SiloviewComponent;
  let fixture: ComponentFixture<SiloviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiloviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiloviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
