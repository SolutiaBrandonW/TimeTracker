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
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security.Cryptography.X509Certificates;

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
                                                .Where(p => p.assignments.Any(a => a.employee_id == id)).ToListAsync();

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

        public async Task<ReturnAPI<int?>> GetEmployeeHoursByAssignment(int assignment_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var hoursByAssignment = await context.assignment_time
                                                    .Where(at => at.assignment_id == assignment_id)
                                                    .GroupBy(at => at.assignment_id)
                                                    .Select(group => group.Sum(d => DbFunctions.DiffHours(d.start_time, d.end_time)))
                                                    .FirstOrDefaultAsync();

                    return new ReturnAPI<int?>("Success", 200, hoursByAssignment);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<int?>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<List<EmployeeDTO>>> GetEmployees()
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var emp = await context.employees.Select(row => row).ToListAsync();

                    List<EmployeeDTO> employeeDTOs = new List<EmployeeDTO>();

                    foreach (employee e in emp)
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

        public async Task<ReturnAPI<string>> GetManagerNameByManagerId(long manager_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var manager = await context.employees
                                            .Where(man => man.employee_id == manager_id)
                                            .Select(man => new { man.first_name, man.last_name })
                                            .FirstOrDefaultAsync();

                    return new ReturnAPI<string>("Success", 200, manager.ToString());
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<string>(e.Message, 400, null);
            }

        }
        public async Task<ReturnAPI<string>> GetSecurityNameByEmployeeId(long employee_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var security_level = context.security_level;

                    var security_id = await context.employees
                                                .Where(emp => emp.employee_id == employee_id)
                                                .Select(emp => emp.security_level_id).FirstOrDefaultAsync();

                    var security_name = await security_level.Where(sec => sec.security_level_id == security_id).Select(sec => sec.secrity_level).FirstOrDefaultAsync();

                    return new ReturnAPI<string>("Success", 200, security_name);

                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<string>(e.Message, 400, null); }
        }
    }
}
