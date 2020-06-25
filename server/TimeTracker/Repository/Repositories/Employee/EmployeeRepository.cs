using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.Mappers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Mappers;


namespace Repository.Repositories.Employee
{
    public class EmployeeRepository
    {
        public async Task<List<ProjectDTO>> GetProjectsByEmployee(long id)
        {
            using (var context = new TimeTrackingEntities())
            {
                var employee = context.employees;
                var project = context.projects;

                var projectsByEmployee = await project
                                                            .Where(p => p.assignments.Any(a => a.employee_id == id))
                                                            .ToListAsync();

                List<ProjectDTO> projectDTOs = new List<ProjectDTO>();

                foreach (project p in projectsByEmployee)
                {
                    ProjectDTO projectDTO = new ProjectDTO();
                    projectDTO = ProjectMappers.mapToProjectDTO(p, projectDTO);
                    projectDTOs.Add(projectDTO);
                }
                return projectDTOs;
            }
        }

        public async Task<List<AssignmentTimeDTO>> GetAssignmentTimesByEmployee(long id)
        {

            using (var context = new TimeTrackingEntities())
            {
                var assignment_times = context.assignment_time;

                var assignmentTimesByEmployee  = await assignment_times
                                                                            .Where(p => p.assignment.employee_id == id)
                                                                            .ToListAsync();

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


        public async Task<List<EmployeeDTO>> GetEmployeeHierarchy(long id)
        {
            using (var context = new TimeTrackingEntities())
            {
                var employee = context.employees;
                var employeeHierarchy = await employee
                                                            .Where(p => p.employee_id == id || p.manager_id == id)
                                                            .ToListAsync();

                List<EmployeeDTO> employeeDTOs = new List<EmployeeDTO>();

                foreach (employee e in employeeHierarchy)
                {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO = EmployeeMapper.mapToEmployeeDTO(e, employeeDTO);
                    employeeDTOs.Add(employeeDTO);
                }
                return employeeDTOs;
            }
        }

        public Task<int> CreateEmployeeAssignment(AssignmentDTO createAssignemntDTO)
        {
            using (var context = new TimeTrackingEntities())
            {
                assignment create_assignment = new assignment();
                create_assignment.project_id = createAssignemntDTO.project_id;
                create_assignment.employee_id = create_assignment.employee_id;
                create_assignment.start_date = create_assignment.start_date;
                create_assignment.end_date = create_assignment.end_date;
                create_assignment.role_id = create_assignment.role_id;
                context.assignments.Add(create_assignment);
                return context.SaveChangesAsync();
            }
        }
    }
}
