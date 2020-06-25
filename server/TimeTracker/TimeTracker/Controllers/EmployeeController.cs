using DataContracts.Models;
using Repository.Repositories.Employee;
using Repository.ReturnAPI;
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
    }
}
