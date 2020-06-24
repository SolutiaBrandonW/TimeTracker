using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataContracts.EntityFramework;
using DataContracts.Models;

namespace Repository.Repositories.Assignment
{
    public class AssignmentRepository
    {

        public int LogHours(AssignmentTimeDTO assignmentTimeDTO)
        {
            using (var context = new TimeTrackingEntities())
            {
                assignment_time assignment_Time = new assignment_time();
                assignment_Time.assignment_id = assignmentTimeDTO.assignment_id;
                assignment_Time.start_time = assignmentTimeDTO.start_time;
                assignment_Time.end_time = assignmentTimeDTO.end_time;

                context.assignment_time.Add(assignment_Time);
                return context.SaveChanges();

            }
        }
    }
}
