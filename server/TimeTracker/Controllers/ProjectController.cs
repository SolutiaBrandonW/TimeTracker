using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.APIReturnObjects;
using Repository.Repositories.Project;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TimeTracker.Controllers
{   
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Project")]
    public class ProjectController : ApiController
    {
        private readonly ProjectRepository projectRepository;
        public ProjectController()
        {
            this.projectRepository = new ProjectRepository();
        }

        [Route("GetProjects")]
        [HttpGet()]
        public async Task<ReturnAPI<List<ProjectDTO>>> GetProjects()
        {
            return await projectRepository.GetProjects();
        }

        [Route("GetProject/{project_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<ProjectDTO>> GetProject(long project_id)
        {
            return await projectRepository.GetProject(project_id);
        }

        [Route("addProject")]
        [HttpPost()]
        public async Task<ReturnAPI> addProject([FromBody] ProjectDTO projectDTO)
        {
            return await projectRepository.addProject(projectDTO);
        }

        [Route("updateProject")]
        [HttpPost()]
        public async Task<ReturnAPI> updateProject([FromBody] ProjectDTO projectDTO)
        {
            return await projectRepository.updateProject(projectDTO);
        }

        [Route("DeleteProject/{project_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI> DeleteProject(long project_id)
        {
            return await projectRepository.deleteProject(project_id);
        }

        [Route("GetHoursByProject/{project_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<int?>> GetHoursByProject(long project_id)
        {
            return await projectRepository.GetHoursByProject(project_id);
        }

        [Route("GetAllAssignmentTimesByProject/{project_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<List<ProjectAssignmentTimeDTO>>> GetAllAssignmentTimesByProject(long project_id)
        {
            return await projectRepository.GetAllAssignmentTimesByProject(project_id);
        }

        [Route("GetStatusName/{status_id:long}")]
        [HttpGet()]
        public async Task<ReturnAPI<string>> GetStatus(long status_id)
        {
            return await projectRepository.GetStausName(status_id);
        }

        [Route("GetAllStatuses")]
        [HttpGet()]
        public async Task<ReturnAPI<List<StatusDTO>>> GetAllStatuses()
        {
            return await projectRepository.GetAllStatuses();
        }
    }
}