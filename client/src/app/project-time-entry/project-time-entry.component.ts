import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService, ProjectTimeEntry } from '../project.service';

@Component({
  selector: 'app-project-time-entry',
  templateUrl: './project-time-entry.component.html',
  styleUrls: ['./project-time-entry.component.css'],
  providers: [ProjectService]
})
export class ProjectTimeEntryComponent implements OnInit {
  currProjectTimeEntries : ProjectTimeEntry[];
  employee_id = 1;

  constructor(private pte: ProjectService, 
              private route: ActivatedRoute,
              private router: Router
              ) {}

  ngOnInit(): void {
    this.pte.getProjectTimeEntries(this.employee_id).subscribe(projectEntries => {
      this.currProjectTimeEntries = projectEntries;
      //this.getProjectHourEntries(this.employee_id);
    });
  }

  getProjectHourEntries(employee_id: number) {
    for (let project of this.currProjectTimeEntries)
    this.pte.getEmployeeProjectHours(this.employee_id, project.projectId).subscribe(projectHours => {
      project.projectHours = projectHours;
    });
  }
  
  viewTimeEntry(projectId: number) {
    this.router.navigate(['view-time', projectId], {relativeTo: this.route});
  }

  addTimeEntry(projectName: string) {
    this.router.navigate(['add-time', projectName], {relativeTo: this.route});
  }

}
