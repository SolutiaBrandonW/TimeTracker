using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.APIReturnObjects;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Mappers;

namespace Repository.Repositories.Project
{
    public class ProjectRepository
    {
        public async Task<ReturnAPI<List<ProjectDTO>>> GetProjects()
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {

                    var pro = await context.projects.Select(row => row).ToListAsync();

                    List<ProjectDTO> projectDTOs = new List<ProjectDTO>();

                    foreach (project p in pro)
                    {

                        ProjectDTO projectDTO = new ProjectDTO();
                        projectDTO = ProjectMappers.mapToProjectDTO(p, projectDTO);
                        projectDTOs.Add(projectDTO);
                    }
                    return new ReturnAPI<List<ProjectDTO>>("Success", 200, projectDTOs);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<List<ProjectDTO>>(e.Message, 400, null);
            }
        }

    }
}
