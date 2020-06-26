using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using DataContracts.Models;
using Repository.Repositories.Assignment;
using Repository.APIReturnObjects;

namespace TimeTracker.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Assignment")]
    public class AssignmentController : ApiController
    {
        private readonly AssignmentRepository assignmentRepository;
        public AssignmentController()
        {
            this.assignmentRepository = new AssignmentRepository();
        }

        [Route("LogHours")]
        [HttpPost()]
        public async Task<ReturnAPI> LogHours([FromBody] AssignmentTimeDTO assignmentTimeDTO)
        {
            return await assignmentRepository.LogHours(assignmentTimeDTO);
        }

        [Route("GetLoggedHoursByAssignment/{id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<List<AssignmentTimeDTO>>> GetLoggedHoursByAssignment(long id)
        {
           return await assignmentRepository.GetLoggedHoursByAssignment(id);
        }

        [Route("getAssignmentByProjectAndEmployee")]
        [HttpGet()]
        public async Task<ReturnAPI<AssignmentDTO>> getAssignmentByProjectAndEmployee(long project_id, long employee_id)
        {
            return await assignmentRepository.getAssignmentByProjectAndEmployee(project_id, employee_id);
        }

        /*[Route("getProjectTest")]
        [HttpGet()]
        public async Task<ReturnAPI<List<ProjectReturn>>> getProjectTest(long employee_id)
        {
            return await assignmentRepository.getProjectStuff(employee_id);
        }*/

    }
}
