using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataContracts.Models
{

    public class ProjectReturn
    {
        public long project_id { get; set; }
        public long assignment_id { get; set; }
        public long employee_id { get; set; }
        public string name { get; set; }
        public int hoursworked { get; set; }
    }



    public class ProjectDTO
    {
        public string name;
        public long project_id;
        public DateTime? start_date;
        public DateTime? end_date;
        public string description;
        public long status_id;
        public string status_name;
        public bool? is_active;

    }

    public class StatusDTO
    {
        public long status_id;
        public string status_name;
    }
}