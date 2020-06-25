using DataContracts.EntityFramework;
using DataContracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Mappers
{
    class AssignmentTimeMapper
    {
        public static AssignmentTimeDTO mapToAssignmentTimeDTO(assignment_time assignment_Time, AssignmentTimeDTO assignmentTimeDTO)
        {
            assignmentTimeDTO.assignment_time_id = assignment_Time.assignment_time_id;
            assignmentTimeDTO.assignment_id = assignment_Time.assignment_id;
            assignmentTimeDTO.start_time = assignment_Time.start_time;
            assignmentTimeDTO.end_time = assignment_Time.end_time;
            assignmentTimeDTO.description = assignment_Time.description;
            return assignmentTimeDTO;
        }



    }
}
