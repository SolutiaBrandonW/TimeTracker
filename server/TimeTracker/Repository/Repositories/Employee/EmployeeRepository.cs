using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.Mappers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.APIReturnObjects;
using TimeTracker.Mappers;


namespace Repository.Repositories.Employee
{
    public class EmployeeRepository
    {
        public async Task<ReturnAPI<List<ProjectDTO>>> GetProjectsByEmployee(long id)
        {

            try
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
                    return new ReturnAPI<List<ProjectDTO>>("Success", 200, projectDTOs);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<ProjectDTO>>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<List<AssignmentTimeDTO>>> GetAssignmentTimesByEmployee(long id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignment_times = context.assignment_time;

                    var assignmentTimesByEmployee = await assignment_times
                        .Where(p => p.assignment.employee_id == id)
                        .ToListAsync();

                    List<AssignmentTimeDTO> assignmentTimeDTOs = new List<AssignmentTimeDTO>();

                    foreach (assignment_time a in assignmentTimesByEmployee)
                    {
                        AssignmentTimeDTO assignmentTimeDTO = new AssignmentTimeDTO();
                        assignmentTimeDTO = AssignmentTimeMapper.mapToAssignmentTimeDTO(a, assignmentTimeDTO);
                        assignmentTimeDTOs.Add(assignmentTimeDTO);
                    }

                    return new ReturnAPI<List<AssignmentTimeDTO>>("Success", 200, assignmentTimeDTOs);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<AssignmentTimeDTO>>(e.Message, 400, null);
            }
        }


        public async Task<ReturnAPI<List<EmployeeDTO>>> GetEmployeeHierarchy(long id)
        {
            try
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

                    return new ReturnAPI<List<EmployeeDTO>>("Success", 200, employeeDTOs);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<EmployeeDTO>>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI> CreateEmployeeAssignment(AssignmentDTO createAssignemntDTO)
        {
            try
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
                    var queryReturn = await context.SaveChangesAsync();

                    if (queryReturn.Equals(1))
                    {
                        return new ReturnAPI("Success", 200);
                    }
                    throw new DataException("Failed to insert");
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }
    }
}
