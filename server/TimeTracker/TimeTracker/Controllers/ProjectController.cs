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
    }
}