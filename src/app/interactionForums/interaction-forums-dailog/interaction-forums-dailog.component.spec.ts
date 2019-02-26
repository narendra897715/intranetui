import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionForumsDailogComponent } from './interaction-forums-dailog.component';

describe('InteractionForumsDailogComponent', () => {
  let component: InteractionForumsDailogComponent;
  let fixture: ComponentFixture<InteractionForumsDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionForumsDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionForumsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
