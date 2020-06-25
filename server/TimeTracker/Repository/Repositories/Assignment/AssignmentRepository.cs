using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.Mappers;
using Repository.ReturnAPI;

namespace Repository.Repositories.Assignment
{
    public class AssignmentRepository
    {

        public int LogHours(AssignmentTimeDTO assignmentTimeDTO)
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
                    return context.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                return -1;
            }
        }

        public ReturnAPI<List<AssignmentTimeDTO>> GetLoggedHoursByAssignment(long assignment_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var assignmentTimes = context.assignment_time;
                    var query = assignmentTimes.Where(a => a.assignment_id == assignment_id);
                    var queryList = query.ToList();

                    List<AssignmentTimeDTO> loggedHoursByAssignment = new List<AssignmentTimeDTO>();

                    foreach(assignment_time a in queryList)
                    {
                        AssignmentTimeDTO assignmentTimeDTO = new AssignmentTimeDTO();
                        assignmentTimeDTO = AssignmentTimeMapper.mapToAssignmentTimeDTO(a, assignmentTimeDTO);
                        loggedHoursByAssignment.Add(assignmentTimeDTO);
                    }
                    return new ReturnAPI<List<AssignmentTimeDTO>>("Success",200,loggedHoursByAssignment);
                }
            }
            catch
            {
                return new ReturnAPI<List<AssignmentTimeDTO>>("Failed", 400, null); ;
            }
        }
    }
}
