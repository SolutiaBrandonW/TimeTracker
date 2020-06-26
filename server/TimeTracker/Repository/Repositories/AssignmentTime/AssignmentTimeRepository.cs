using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.APIReturnObjects;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories.AssignmentTime
{
    public class AssignmentTimeRepository
    {
        public async Task<ReturnAPI> updateAssignmentTime(AssignmentTimeDTO assignmentTimeDTO)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    if (assignmentTimeDTO.assignment_time_id is null)
                    {
                        throw new Exception();
                    }

                    long? assignment_time_id = assignmentTimeDTO.assignment_time_id;

                    var query = await context.assignment_time.Where(a => a.assignment_time_id == assignment_time_id).FirstOrDefaultAsync();
                    if (query is null)
                    {
                        throw new Exception();
                    }

                    query.assignment_id = assignmentTimeDTO.assignment_id ?? query.assignment_id;
                    query.start_time = assignmentTimeDTO.start_time ?? query.start_time;
                    query.end_time = assignmentTimeDTO.end_time ?? query.end_time;
                    query.description = assignmentTimeDTO.description ?? query.description;
                    int saveChangesResult = await context.SaveChangesAsync();

                    if (saveChangesResult == 0)
                    {
                        throw new Exception();
                    }
                    else
                    {
                        return new ReturnAPI(200);
                    }
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI> deleteAssignmentTime(long assignment_time_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var query = await context.assignment_time.Where(a => a.assignment_time_id == assignment_time_id).FirstOrDefaultAsync();
                    if (query is null)
                    {
                        throw new Exception();
                    }

                    context.assignment_time.Remove(query);

                    int saveChangesResult = await context.SaveChangesAsync();

                    if (saveChangesResult == 0)
                    {
                        throw new Exception();
                    }
                    else
                    {
                        return new ReturnAPI(200);
                    }
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI> AddAssignmentTime(AssignmentTimeDTO assignmentTimeDTO)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    assignment_time assignmentTime = new assignment_time();
                    if(assignmentTimeDTO.assignment_id is null || assignmentTimeDTO.start_time is null || assignmentTimeDTO.end_time is null)
                    {
                        throw new Exception();
                    }

                    assignmentTime.assignment_id = assignmentTimeDTO.assignment_id ?? 0;
                    assignmentTime.start_time = assignmentTimeDTO.start_time ?? new DateTime();
                    assignmentTime.end_time = assignmentTimeDTO.end_time ?? new DateTime();
                    assignmentTime.description = assignmentTimeDTO.description;

                    context.assignment_time.Add(assignmentTime);
                    int saveChangesResult = await context.SaveChangesAsync();

                    if (saveChangesResult == 0)
                    {
                        throw new Exception();
                    }
                    else
                    {
                        return new ReturnAPI(200);
                    }
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }
    }
}
