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

                    AssignmentDTO assignmentDTO = new AssignmentDTO();
                    assignmentDTO.assignment_id = returnedAssignment.assignment_id;
                    assignmentDTO.employee_id = returnedAssignment.employee_id;
                    assignmentDTO.project_id = returnedAssignment.project_id;
                    assignmentDTO.start_date = returnedAssignment.start_date;
                    assignmentDTO.end_date = returnedAssignment.end_date;
                    assignmentDTO.role_id = returnedAssignment.role_id;

                    return new ReturnAPI<AssignmentDTO>("Success", 200, assignmentDTO);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<AssignmentDTO>(e.Message, 400, null);
            }
        }

        /*public async Task<ReturnAPI<List<ProjectReturn>>> getProjectStuff(long employee_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignments = context.assignments;
                    var query = assignments.Where(a => a.employee_id == employee_id).Select(a => a.project_id);

                    *//*var pageObject = from p in context.projects
                                     join a in context.assignments on p.project_id equals a.project_id into test
                                     from td in test.DefaultIfEmpty()
                                     join at in context.assignment_time on td.assignment_id equals at.assignment_id into tesd
                                     from ts in tesd.DefaultIfEmpty()
                                     where td.employee_id == employee_id
                                     group p by new {ts.assignment_id, t.project_id, AttributeUsageAttribute .employee_id, p.name} into grp
                                     select new ProjectReturn(){ assignment_id = grp.Key.assignment_id, project_id = grp.Key.project_id, employee_id = grp.Key.employee_id, name = grp.Key.name};*//*
                    //var list = pageObject.ToList();



             

                    return new ReturnAPI<List<ProjectReturn>>("Pass", 200, list);
                }


            }
            catch (Exception e)
            {
                return new ReturnAPI<List<ProjectReturn>>("Fail", 200, null);
            }
        }*/
    }
}
