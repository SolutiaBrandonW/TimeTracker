using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.APIReturnObjects;
using Repository.Repositories.Employee;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;


namespace TimeTracker.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Employee")]
    public class EmployeeController : ApiController
    {
        private readonly EmployeeRepository employeeRepository;
        public EmployeeController()
        {
            this.employeeRepository = new EmployeeRepository();
        }

        [Route("AddEmployee")]
        [HttpPost()]
        public async Task<ReturnAPI> AddEmployee([FromBody] EmployeeDTO employee)
        {
            return await employeeRepository.AddEmployee(employee);
        }

        [Route("UpdateEmployee")]
        [HttpPost()]
        public async Task<ReturnAPI> UpdateEmployee([FromBody] EmployeeDTO employee)
        {
            return await employeeRepository.UpdateEmployee(employee);
        }

        [Route("DeleteEmployeeById/{employee_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI> DeleteEmployeeById(long employee_id)
        {
            return await employeeRepository.DeleteEmployeeById(employee_id);
        }

        [Route("getProjectsByEmployee/{id:long}")]
        [HttpGet()] 
        public async Task<ReturnAPI<List<ProjectDTO>>> GetProjectsByEmployee(long id)
        {
            return await employeeRepository.GetProjectsByEmployee(id);
        }

        [Route("GetAssignmentTimesByEmployee/{id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<List<AssignmentTimeDTO>>> GetAssignmentTimesByEmployee(long id)
        {
            return await employeeRepository.GetAssignmentTimesByEmployee(id);
        }

        [Route("GetEmployeeHeirarchy/{id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<List<EmployeeDTO>>> GetEmployeeHeirarchy(long id)
        {
            return await employeeRepository.GetEmployeeHierarchy(id);
        }

        [Route("GetEmployeeHoursByAssignment/{assignment_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<int?>> GetEmployeeHoursByAssignment(int assignment_id)
        {
            return await employeeRepository.GetEmployeeHoursByAssignment(assignment_id);
        }

        [Route("GetEmployees")]
        [HttpGet()]
        public async Task<ReturnAPI<List<EmployeeDTO>>> GetEmployees()
        {
            return await employeeRepository.GetEmployees();
        }

        [Route("GetManagerNameByManagerId/{manager_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<string>> GetManagerNameByManagerId(long manager_id)
        {
            return await employeeRepository.GetManagerNameByManagerId(manager_id);
        }

        [Route("GetSecurityLevelByEmployeeId/{employee_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<string>> GetSecurityNameByEmployeeId(long employee_id)
        {
            return await employeeRepository.GetSecurityLevelByEmployeeId(employee_id);
        }

        [Route("GetAllManagers")]
        [HttpGet()]
        public async Task<ReturnAPI<List<EmployeeDTO>>> GetAllManagers()
        {
            return await employeeRepository.GetAllManagers();
        }

        [Route("GetAllSecurityLevels")]
        [HttpGet()]
        public async Task<ReturnAPI<List<SecurityDTO>>> GetAllSecurityLevels()
        {
            return await employeeRepository.GetAllSecurityLevels();
        }

        [Route("GetEmployeeByAuth0ID/{auth0_id}")]
        [HttpGet()]
        public async Task<ReturnAPI<EmployeeDTO>> GetEmployeeByAuth0ID(string auth0_id)
        {
            return await employeeRepository.GetEmployeeByAuth0ID(auth0_id);
        }
    }
}
