import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagezoompopupComponent } from './imagezoompopup.component';

describe('ImagezoompopupComponent', () => {
  let component: ImagezoompopupComponent;
  let fixture: ComponentFixture<ImagezoompopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagezoompopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagezoompopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
