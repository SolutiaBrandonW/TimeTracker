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
        public EmployeeController(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
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



        /*[Route("CreateEmployeeAssignment")]
        [HttpPost()]
        public int CreateEmployeeAssignment([FromBody] CreateAssignemntDTO createAssignemntDTO)
        {

            using (var context = new TimeTracker())
            {
                SqlParameter project_id = new SqlParameter("@project_id", createAssignemntDTO.project_id);
                SqlParameter employee_id = new SqlParameter("@employee_id", createAssignemntDTO.employee_id);
                SqlParameter start_date = new SqlParameter("@start_date", createAssignemntDTO.start_date);
                SqlParameter end_date = new SqlParameter("@end_date", createAssignemntDTO.end_date);
                SqlParameter role_id = new SqlParameter("@role_id", createAssignemntDTO.role_id);

                try
                {
                    return context.Database.SqlQuery<int>("CreateAssignment @project_id, @employee_id, @start_date, @end_date, @role_id", project_id, employee_id, start_date, end_date, role_id).FirstOrDefault();
                }
                catch (Exception e)
                {
                    System.Console.WriteLine($"Error: {e.Message}");
                    return 0;
                }
            }


        }*/



    }
}
