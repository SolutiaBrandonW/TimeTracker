import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTimeComponent } from './add-edit-time.component';

describe('AddTimeComponent', () => {
  let component: AddEditTimeComponent;
  let fixture: ComponentFixture<AddEditTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
