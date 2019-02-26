import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionForumsComponent } from './interaction-forums.component';

describe('InteractionForumsComponent', () => {
  let component: InteractionForumsComponent;
  let fixture: ComponentFixture<InteractionForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionForumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
