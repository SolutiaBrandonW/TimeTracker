import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectTimeEntries: ProjectTimeEntry[] = [
    {
      "projectId": 1,
      "projectName":"TimeCube",
      "projectHours": 17000,
      "projectDescription":"Theory of Everything",
      "projectStatus":"Complete"
    },
    {
      "projectId": 2,
      "projectName":"Woop",
      "projectHours":2,
      "projectDescription":"Woop Woop",
      "projectStatus":"In Progress"
    },
  ];
  constructor() { }

  getProjectTimeEntries() {
    return this.projectTimeEntries;
  }
}
export class ProjectTimeEntry {
  projectId: number;
  projectName: string;
  projectHours: number;
  projectDescription: string;
  projectStatus: string;
}