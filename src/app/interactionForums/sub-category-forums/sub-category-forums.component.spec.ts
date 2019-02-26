import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryForumsComponent } from './sub-category-forums.component';

describe('SubCategoryForumsComponent', () => {
  let component: SubCategoryForumsComponent;
  let fixture: ComponentFixture<SubCategoryForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryForumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
