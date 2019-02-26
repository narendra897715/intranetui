import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesSentComponent } from './wishes-sent.component';

describe('WishesSentComponent', () => {
  let component: WishesSentComponent;
  let fixture: ComponentFixture<WishesSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
