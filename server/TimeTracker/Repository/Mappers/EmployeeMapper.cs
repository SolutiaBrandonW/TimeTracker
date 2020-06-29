using DataContracts.EntityFramework;
using DataContracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Mappers
{
    class EmployeeMapper
    {

        public static EmployeeDTO mapToEmployeeDTO(employee employee, EmployeeDTO employeeDTO)
        {
            employeeDTO.employee_id = employee.employee_id;
            employeeDTO.first_name = employee.first_name;
            employeeDTO.last_name = employee.last_name;
            employeeDTO.manager_id = employee.manager_id;
            employeeDTO.security_level_id = employee.security_level_id;
            employeeDTO.is_active = employee.is_active;

            return employeeDTO;
        }
    }
}
