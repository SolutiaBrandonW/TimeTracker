import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentEntryDialogComponent } from './assignment-entry-dialog.component';

describe('AssignmentEntryDialogComponent', () => {
  let component: AssignmentEntryDialogComponent;
  let fixture: ComponentFixture<AssignmentEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
