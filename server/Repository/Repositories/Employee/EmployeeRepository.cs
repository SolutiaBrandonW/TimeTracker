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
using System.Xml.Linq;

namespace Repository.Repositories.Employee
{
    public class EmployeeRepository
    {

        public async Task<ReturnAPI> AddEmployee(EmployeeDTO employee)
        {
            try
            {
                // Employee ID will be missing -- 
                // need to see if the rest of payload is valid
                employee.employee_id = 0;
                if (EmployeeDTO.EmployeeDTOValidity(employee)) {
                    using (var context = new TimeTrackingEntities())
                    {
                        context.employees.Add(new employee
                        {
                            first_name = employee.first_name,
                            last_name = employee.last_name,
                            manager_id = employee.manager_id,
                            security_level_id = employee.security_level_id,
                            is_active = employee.is_active
                        });
                        int dbReturn = await context.SaveChangesAsync();
                        if (dbReturn >= 0)
                        {
                            return new ReturnAPI("Success", 200);
                        }
                    }
                }
                throw new Exception();
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI> UpdateEmployee(EmployeeDTO employee)
        {
            try
            {
                if (EmployeeDTO.EmployeeDTOValidity(employee)) {
                    using (var context = new TimeTrackingEntities())
                    {
                        var dbe = await context.employees.Where(emp => emp.employee_id == employee.employee_id).FirstOrDefaultAsync();
                        if (dbe != null)
                        {
                            dbe.first_name = employee.first_name;
                            dbe.last_name = employee.last_name;
                            dbe.manager_id = employee.manager_id;
                            dbe.security_level_id = employee.security_level_id;
                            dbe.is_active = employee.is_active;

                            if (context.SaveChanges() >= 0)
                            {
                                return new ReturnAPI("Success", 200);
                            }
                        }
                    }
                }
                throw new Exception();    
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI> DeleteEmployeeById(long employee_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignment_timesQry = await context.assignment_time.Where(at => at.assignment.employee_id == employee_id).ToListAsync();
                    var assignmentsQry = await context.assignments.Where(a => a.employee_id == employee_id).ToListAsync();

                    var employee = await context.employees
                        .Where(emp => emp.employee_id == employee_id)
                        .FirstOrDefaultAsync();

                    if (employee != null)
                    {
                        if(assignment_timesQry.Count > 0)
                        {
                            context.assignment_time.RemoveRange(assignment_timesQry);
                        }
                        if(assignmentsQry.Count > 0)
                        {
                            context.assignments.RemoveRange(assignmentsQry);
                        }

                        context.employees.Remove(employee);
                        if (await context.SaveChangesAsync() > 0)
                        {
                            return new ReturnAPI("Success", 200);
                        }
                    }
                    throw new Exception();
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

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

                    var manager_name = manager.first_name + " " + manager.last_name;

                    return new ReturnAPI<string>("Success", 200, manager_name);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<string>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<string>> GetSecurityLevelByEmployeeId(long employee_id)
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

        public async Task<ReturnAPI<List<EmployeeDTO>>> GetAllManagers()
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var employees = context.employees;
                    var managers = await employees.Where(man => man.security_level_id == 1 || man.security_level_id == 2)
                                            .Select(m => new EmployeeDTO
                                            {
                                                employee_id = m.employee_id,
                                                first_name = m.first_name,
                                                last_name = m.last_name,
                                                security_level_id = m.security_level_id,
                                                manager_id = m.manager_id,
                                                is_active = m.is_active
                                            }).ToListAsync();
                    return new ReturnAPI<List<EmployeeDTO>>("Success", 200, managers);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<EmployeeDTO>>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<List<SecurityDTO>>>GetAllSecurityLevels()
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var securities = context.security_level;
                    var security_levels = await securities.Select(sec => new SecurityDTO
                    {
                        security_level = sec.secrity_level,
                        security_level_id = sec.security_level_id
                    }).ToListAsync();
                    return new ReturnAPI<List<SecurityDTO>>("Success", 200, security_levels);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<SecurityDTO>>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<EmployeeDTO>> GetEmployeeByAuth0ID(string auth0_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var employee = await context.employees.Where(e => e.auth0_id == auth0_id).FirstOrDefaultAsync();
                    if(employee == null)
                    {
                        return new ReturnAPI<EmployeeDTO>(400, null);
                    }
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO = EmployeeMapper.mapToEmployeeDTO(employee, employeeDTO);
                    return new ReturnAPI<EmployeeDTO>(200, employeeDTO);

                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<EmployeeDTO>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<EmployeeDTO>> GetEmployeeByEmployeeId(long employee_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var employee = await context.employees.Where(e => e.employee_id == employee_id).FirstOrDefaultAsync();
                    if(employee != null)
                    {
                        EmployeeDTO empDTO = new EmployeeDTO();
                        empDTO = EmployeeMapper.mapToEmployeeDTO(employee, empDTO);
                        return new ReturnAPI<EmployeeDTO>("Success", 200, empDTO);
                    }
                    throw new Exception();
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<EmployeeDTO>(e.Message, 400, null);
            }
        }
    }
}
