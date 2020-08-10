using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContracts.Models
{
    public class AssignmentTimeDTO
    {
        public long? assignment_time_id;
        public long? assignment_id;
        public DateTime? start_time;
        public DateTime? end_time;
        public string description;
    }
}
