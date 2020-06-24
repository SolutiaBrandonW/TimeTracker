using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataContracts.Models
{
    public class EmployeeDTO
    {
        public string first_name;
        public string last_name;
        public long employee_id;
        public long? manager_id;
        public long security_level_id;
        public bool is_active;
    }
}