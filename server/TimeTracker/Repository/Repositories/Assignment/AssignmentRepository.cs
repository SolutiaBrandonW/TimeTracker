using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.Mappers;
using Repository.APIReturnObjects;
using System.ComponentModel.Design;
using System.Data;

namespace Repository.Repositories.Assignment
{


    public class AssignmentRepository
    {

        public async Task<ReturnAPI> LogHours(AssignmentTimeDTO assignmentTimeDTO)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    if (assignmentTimeDTO.start_time is null || assignmentTimeDTO.end_time is null || assignmentTimeDTO.assignment_id is null)
                    {
                        throw new Exception();
                    }
                    assignment_time assignment_Time = new assignment_time();
                    assignment_Time.assignment_id = assignmentTimeDTO.assignment_id ?? 0; //required
                    assignment_Time.start_time = assignmentTimeDTO.start_time ?? new DateTime(); //required
                    assignment_Time.end_time = assignmentTimeDTO.end_time ?? new DateTime(); //required
                    assignment_Time.description = assignmentTimeDTO.description; // not required                    
                    context.assignment_time.Add(assignment_Time);
                    int result = await context.SaveChangesAsync();
                    return new ReturnAPI("Success", 200);
                }
            }
            catch(Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI> DeleteAssignmentByAssignmentId(long assignment_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignments = context.assignments;
                    var assignment = await assignments.Where(assi => assi.assignment_id == assignment_id).FirstOrDefaultAsync();
                    assignments.Remove(assignment);
                    var sqlReturn = await context.SaveChangesAsync();
                    if (sqlReturn == 1)
                    {
                        return new ReturnAPI("Success", 200);
                    }
                    throw new Exception();                    
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI> UpdateAssignment(AssignmentDTO assiDTO)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignments = context.assignments;
                    var assi = await assignments.Where(a => a.assignment_id == assiDTO.assignment_id).FirstOrDefaultAsync();

                    assi.assignment_id = assiDTO.assignment_id;
                    assi.employee_id = assiDTO.employee_id;
                    assi.project_id = assiDTO.project_id;
                    assi.start_date = assiDTO.start_date;
                    assi.end_date = assiDTO.end_date;
                    assi.role_id = assiDTO.role_id;
                    assi.is_active = assiDTO.is_active;

                    var sqlReturn = await context.SaveChangesAsync();
                    if (sqlReturn == 1)
                    {
                        return new ReturnAPI("Success", 200);
                    }
                    throw new Exception();                    
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI<AssignmentDTO>> GetAssignmentByAssignmentId(long assignment_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignment = await context.assignments
                                                    .Where(assi => assi.assignment_id == assignment_id)
                                                    .Select(assi => new AssignmentDTO
                                                    {
                                                        assignment_id = assi.assignment_id,
                                                        employee_id = assi.employee_id,
                                                        start_date = assi.start_date,
                                                        end_date = assi.end_date,
                                                        project_id = assi.project_id,
                                                        role_id = assi.role_id
                                                    })
                                                    .FirstOrDefaultAsync();
                    if (assignment != null)
                    {
                        return new ReturnAPI<AssignmentDTO>("Success", 200, assignment);
                    }
                    throw new Exception();
                }
            } 
            catch (Exception e)
            {
                return new ReturnAPI<AssignmentDTO>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<List<AssignmentTimeDTO>>> GetLoggedHoursByAssignment(long assignment_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignmentTimes = context.assignment_time;
                    var queryList = await assignmentTimes.Where(a => a.assignment_id == assignment_id).ToListAsync();


                    List<AssignmentTimeDTO> loggedHoursByAssignment = new List<AssignmentTimeDTO>();

                    foreach (assignment_time a in queryList)
                    {
                        AssignmentTimeDTO assignmentTimeDTO = new AssignmentTimeDTO();
                        assignmentTimeDTO = AssignmentTimeMapper.mapToAssignmentTimeDTO(a, assignmentTimeDTO);
                        loggedHoursByAssignment.Add(assignmentTimeDTO);
                    }
                    return new ReturnAPI<List<AssignmentTimeDTO>>("Success", 200, loggedHoursByAssignment);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<AssignmentTimeDTO>>(e.Message, 400, null); ;
            }
        }


        public async Task<ReturnAPI<AssignmentDTO>> getAssignmentByProjectAndEmployee(long project_id, long employee_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignments = context.assignments;
                    var returnedAssignment = await assignments.Where(a => a.employee_id == employee_id && a.project_id == project_id).FirstOrDefaultAsync();
                    if(returnedAssignment is null)
                    {
                        return new ReturnAPI<AssignmentDTO>(400, null);
                    }
                    AssignmentDTO assignmentDTO = new AssignmentDTO
                    {
                        assignment_id = returnedAssignment.assignment_id,
                        employee_id = returnedAssignment.employee_id,
                        project_id = returnedAssignment.project_id,
                        start_date = returnedAssignment.start_date,
                        end_date = returnedAssignment.end_date,
                        role_id = returnedAssignment.role_id,
                        is_active = returnedAssignment.is_active
                    };

                    return new ReturnAPI<AssignmentDTO>("Success", 200, assignmentDTO);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<AssignmentDTO>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<List<DetailedAssignmentDTO>>> GetAssignmentsByProject(long project_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var query = from a in context.assignments
                                join e in context.employees
                                on a.employee_id equals e.employee_id
                                where a.project_id == project_id
                                select new DetailedAssignmentDTO
                                {
                                    assignment_id = a.assignment_id,
                                    employee_id = a.employee_id,
                                    project_id = a.project_id,
                                    employee_name = e.first_name + " " + e.last_name,
                                    start_date = a.start_date,
                                    end_date = a.end_date,
                                    role_id = a.role_id,
                                    role_name = a.role.role_name,
                                    is_active = a.is_active
                                };
                    if (query is null)
                    {
                        return new ReturnAPI<List<DetailedAssignmentDTO>>(400, null);
                    }
                    List<DetailedAssignmentDTO> assignmentDTOs = await query.ToListAsync();
                    return new ReturnAPI<List<DetailedAssignmentDTO>>("Success", 200, assignmentDTOs);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<DetailedAssignmentDTO>>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<string>> GetRoleByRoleId(long role_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var role = await context.roles.Where(id => id.role_id == role_id).FirstOrDefaultAsync(); 
                    if (role != null)
                    {
                        return new ReturnAPI<string>("Success", 200, role.role_name);
                    }
                    throw new Exception();
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<string>(e.Message, 400, null);
            }
        }

        public async Task<ReturnAPI<List<Role>>> GetAllRoles()
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var roleList = await (from r in context.roles
                                         select new Role
                                         {
                                             role_id = r.role_id,
                                             role_name = r.role_name
                                         }).ToListAsync();

                    if(roleList is null)
                    {
                        throw new Exception();
                    }

                    return new ReturnAPI<List<Role>>(200, roleList);
                }
            }
            catch(Exception e)
            {
                return new ReturnAPI<List<Role>>(e.Message, 400, null);
            }
        }


        public async Task<ReturnAPI> CreateEmployeeAssignment(AssignmentDTO createAssignemntDTO)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    assignment create_assignment = new assignment
                    {
                        project_id = createAssignemntDTO.project_id,
                        employee_id = createAssignemntDTO.employee_id,
                        start_date = createAssignemntDTO.start_date,
                        end_date = createAssignemntDTO.end_date,
                        role_id = createAssignemntDTO.role_id,
                        is_active = createAssignemntDTO.is_active
                    };
                    context.assignments.Add(create_assignment);
                    var queryReturn = await context.SaveChangesAsync();

                    if (queryReturn.Equals(1))
                    {
                        return new ReturnAPI("Success", 200);
                    }
                    throw new DataException("Failed to insert assignment in database");
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }
    }
}
