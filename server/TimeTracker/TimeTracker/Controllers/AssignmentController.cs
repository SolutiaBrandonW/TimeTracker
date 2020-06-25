using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using DataContracts.Models;
using Repository.Repositories.Assignment;
using Repository.ReturnAPI;

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
        public int LogHours([FromBody] AssignmentTimeDTO assignmentTimeDTO)
        {
            return assignmentRepository.LogHours(assignmentTimeDTO);
        }

        [Route("GetLoggedHoursByAssignment/{id:long}")]
        [HttpGet()]
        public ReturnAPI<List<AssignmentTimeDTO>> GetLoggedHoursByAssignment(long id)
        {
           return assignmentRepository.GetLoggedHoursByAssignment(id);
        }

    }
}
