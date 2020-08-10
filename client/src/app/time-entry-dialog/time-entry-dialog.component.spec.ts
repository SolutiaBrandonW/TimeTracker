import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryDialogComponent } from './time-entry-dialog.component';

describe('TimeEntryDialogComponent', () => {
  let component: TimeEntryDialogComponent;
  let fixture: ComponentFixture<TimeEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
