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
  route: ActivatedRoute;
  router: Router;

  constructor(private pte: ProjectService, 
              private rte: ActivatedRoute,
              private rtr: Router
              ) { }

  ngOnInit(): void {
    this.currProjectTimeEntries = this.pte.getProjectTimeEntries();
    this.route = this.rte;
    this.router = this.rtr;
  }
  
  viewTimeEntry(projectName: string) {
    this.router.navigate(['view', projectName], {relativeTo: this.route});
  }

  addTimeEntry(projectName: string) {
    this.router.navigate(['add', projectName], {relativeTo: this.route});
  }

}
