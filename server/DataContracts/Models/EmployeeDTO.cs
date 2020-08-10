using DataContracts.EntityFramework;
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
        public string auth0_id;

        public static bool EmployeeDTOValidity(EmployeeDTO employeeDTO)
        {
            if (employeeDTO.employee_id >= 0 &&
                employeeDTO.first_name != null && 
                employeeDTO.last_name != null && 
                employeeDTO.security_level_id >= 0 &&
                employeeDTO.is_active == true || employeeDTO.is_active == false)
            {
                return true;
            }
            return false;
        }
    }
}