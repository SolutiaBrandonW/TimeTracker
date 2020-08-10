import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEntryDialogComponent } from './project-entry-dialog.component';

describe('ProjectEntryDialogComponent', () => {
  let component: ProjectEntryDialogComponent;
  let fixture: ComponentFixture<ProjectEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
