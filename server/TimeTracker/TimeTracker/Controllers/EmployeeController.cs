using DataContracts.Models;
using Repository.Repositories.Employee;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
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

        public string Get(int id)
        {
            return "value";
        }

        [Route("getProjectsByEmployee/{id:long}")]
        [HttpGet()] 
        public List<ProjectDTO> GetProjectsByEmployee(long id)
        {
            return employeeRepository.GetProjectsByEmployee(id);
        }

        [Route("getAssignmentTimesByEmployee/{id:long}")]
        [HttpGet()]
        public List<AssignmentTimeDTO> GetAssignmentTimesByEmployee(long id)
        {
            return employeeRepository.GetAssignmentTimesByEmployee(id);
        }


        [Route("CreateEmployeeAssignment")]
        [HttpPost()]
        public int CreateEmployeeAssignment([FromBody] AssignmentDTO createAssignemntDTO)
        {
            return employeeRepository.CreateEmployeeAssignment(createAssignemntDTO);
        }


        [Route("GetEmployeeHeirarchy/{id:long}")]
        [HttpGet()]
        public List<EmployeeDTO> getemployeeHeirarchy(long id)
        {
            return employeeRepository.GetEmployeeHierarchy(id);
        }
    }
}
