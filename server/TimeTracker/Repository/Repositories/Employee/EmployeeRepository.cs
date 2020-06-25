using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.Mappers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Mappers;


namespace Repository.Repositories.Employee
{
    public class EmployeeRepository
    {
        public List<ProjectDTO> GetProjectsByEmployee(long id)
        {
            using (var context = new TimeTrackingEntities())
            {
                var employee = context.employees;
                var project = context.projects;

                var query = project.Where(p => p.assignments.Any(a => a.employee_id == id));

                var projectsByEmpoyee = query.ToList();

                List<ProjectDTO> projectDTOs = new List<ProjectDTO>();

                foreach (project p in projectsByEmpoyee)
                {
                    ProjectDTO projectDTO = new ProjectDTO();
                    projectDTO = ProjectMappers.mapToProjectDTO(p, projectDTO);
                    projectDTOs.Add(projectDTO);
                }
                return projectDTOs;
            }
        }

        public List<AssignmentTimeDTO> GetAssignmentTimesByEmployee(long id)
        {

            using (var context = new TimeTrackingEntities())
            {
                //var employees = context.employees;
                //var assignemnts = context.assignments;
                var assignment_times = context.assignment_time;

                var query = assignment_times.Where(p => p.assignment.employee_id == id);

                var assignmentTimesByEmployee = query.ToList();

                List<AssignmentTimeDTO> assignmentTimeDTOs = new List<AssignmentTimeDTO>();

                foreach (assignment_time a in assignmentTimesByEmployee)
                {
                    AssignmentTimeDTO assignmentTimeDTO = new AssignmentTimeDTO();
                    assignmentTimeDTO = AssignmentTimeMapper.mapToAssignmentTimeDTO(a, assignmentTimeDTO);
                    assignmentTimeDTOs.Add(assignmentTimeDTO);
                }
                return assignmentTimeDTOs;
            }
        }


        public List<EmployeeDTO> GetEmployeeHierarchy(long id)
        {
            using (var context = new TimeTrackingEntities())
            {
                var employee = context.employees;

                var query = employee.Where(p => p.employee_id == id || p.manager_id == id);
              
                var EmployeeHierarchy = query.ToList();

                List<EmployeeDTO> employeeDTOs = new List<EmployeeDTO>();

                foreach (employee e in EmployeeHierarchy)
                {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO = EmployeeMapper.mapToEmployeeDTO(e, employeeDTO);
                    employeeDTOs.Add(employeeDTO);

            
                }
                return employeeDTOs;
            }
        }

        public int CreateEmployeeAssignment(AssignmentDTO createAssignemntDTO)
        {
            using (var context = new TimeTrackingEntities())
            {
                int? result = context.CreateAssignment(createAssignemntDTO.project_id, createAssignemntDTO.employee_id, createAssignemntDTO.start_date, createAssignemntDTO.end_date, createAssignemntDTO.role_id).FirstOrDefault();
                return result != null ? (int)result : 0;
            }
        }
    }
}
