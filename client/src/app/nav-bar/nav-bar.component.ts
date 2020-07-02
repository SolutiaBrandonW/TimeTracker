import { Component, OnInit } from '@angular/core';
import { AuthService, Profile } from '../auth.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  profile:Profile
  employee_id:number
  isManager = false;
  constructor(public auth: AuthService, private es:EmployeeService) { }

  ngOnInit(): void {
    this.auth.userProfile$.subscribe(res => {
      if (res != null) {
        this.es.getEmployeeByAuth0Id(res.sub).subscribe(result => {
          this.employee_id = result.Data.employee_id;
          this.es.getSecurityLevelByEmployeeId(this.employee_id).subscribe(securityLevel => {
            if(securityLevel.Data === "Manager" || securityLevel.Data === "Super Manager"){
              this.isManager = true;
            }
          })
        })
      }
    })
  }
}
