using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Web;

namespace DataContracts.Models
{
    public class CreateAssignemntDTO
    {
        public long project_id;
        public long employee_id;
        public DateTime start_date;
        public DateTime end_date;
        public long role_id;

    }
}