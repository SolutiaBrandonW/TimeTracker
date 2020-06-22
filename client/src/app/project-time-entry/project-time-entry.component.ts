import { Component, OnInit } from '@angular/core';

import { ProjectService, ProjectTimeEntry } from '../project.service';

@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css'],
  providers: [ProjectService]
})
export class ProjectTimeEntryComponent implements OnInit {

  currProjectTimeEntries : ProjectTimeEntry[];

  constructor(private pte: ProjectService) { }

  ngOnInit(): void {
    // Get service values
    // call service getter for time entry values
    this.currProjectTimeEntries = this.pte.getProjectTimeEntries();
  }

  // Add time button click event
  addTimeEntry(projectId: number) {
    console.log('woah add time for: ' + projectId);
  }

  // View time button click event
  viewTimeEntry(projectId: number) {
    console.log('woah view time for: ' + projectId);
  }

}
