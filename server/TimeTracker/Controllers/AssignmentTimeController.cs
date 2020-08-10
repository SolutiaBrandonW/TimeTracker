using Repository.APIReturnObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Repository.Repositories.AssignmentTime;
using DataContracts.Models;

namespace TimeTracker.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/AssignmentTime")]
    public class AssignmentTimeController : ApiController
    {
        private readonly AssignmentTimeRepository assignmentTimeRepository;

        public AssignmentTimeController()
        {
            this.assignmentTimeRepository = new AssignmentTimeRepository();
        }

        [Route("UpdateAssignmentTime")]
        [HttpPost()]
        public async Task<ReturnAPI> updateAssignmentTime([FromBody] AssignmentTimeDTO assignmentTimeDTO)
        {
            return await this.assignmentTimeRepository.updateAssignmentTime(assignmentTimeDTO);
        }

        [Route("DeleteAssignmentTime/{assignment_time_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI> deleteAssignmentTime(long assignment_time_id)
        {
            return await this.assignmentTimeRepository.deleteAssignmentTime(assignment_time_id);
        }

        [Route("AddAssignmentTime")]
        [HttpPost()]
        public async Task<ReturnAPI> addAssignmentTime([FromBody] AssignmentTimeDTO assignmentTimeDTO)
        {
            return await this.assignmentTimeRepository.AddAssignmentTime(assignmentTimeDTO);
        }


    }
}
