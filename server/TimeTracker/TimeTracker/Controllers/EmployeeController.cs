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

        [Route("getProjectsByEmployee/{id:long}")]
        [HttpGet()] 
        public async Task<ReturnAPI<List<ProjectDTO>>> GetProjectsByEmployee(long id)
        {
            return await employeeRepository.GetProjectsByEmployee(id);
        }

        [Route("getAssignmentTimesByEmployee/{id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<List<AssignmentTimeDTO>>> GetAssignmentTimesByEmployee(long id)
        {
            return await employeeRepository.GetAssignmentTimesByEmployee(id);
        }

        [Route("CreateEmployeeAssignment")]
        [HttpPost()]
        public async Task<ReturnAPI> CreateEmployeeAssignment([FromBody] AssignmentDTO createAssignemntDTO)
        {
            return await employeeRepository.CreateEmployeeAssignment(createAssignemntDTO);
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
    }
}
