import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTimeDialogComponent } from './assignment-time-dialog.component';

describe('AssignmentTimeDialogComponent', () => {
  let component: AssignmentTimeDialogComponent;
  let fixture: ComponentFixture<AssignmentTimeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentTimeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
