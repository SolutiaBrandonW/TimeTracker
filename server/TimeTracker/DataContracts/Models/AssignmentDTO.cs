using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Web;

namespace DataContracts.Models
{
    public class AssignmentDTO
    {
        public long assignment_id;
        public long project_id;
        public long employee_id;
        public DateTime start_date;
        public DateTime end_date;
        public long role_id;
        public bool? is_active;

    }

    public class DetailedAssignmentDTO
    {
        public long assignment_id;
        public long project_id;
        public long employee_id;
        public string employee_name;
        public DateTime start_date;
        public DateTime end_date;
        public long role_id;
        public string role_name;
        public bool? is_active;
    }

    public class Role
    {
        public long role_id;
        public string role_name;
    }
}