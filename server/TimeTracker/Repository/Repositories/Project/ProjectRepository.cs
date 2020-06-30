using DataContracts.EntityFramework;
using DataContracts.Models;
using Repository.APIReturnObjects;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
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

        public async Task<ReturnAPI> addProject(ProjectDTO projectDTO)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    Console.WriteLine(projectDTO.status_id);

                    if(projectDTO.name is null)
                    {
                        throw new Exception();
                    }
                    project proj = new project
                    {
                        name = projectDTO.name,
                        start_date = projectDTO.start_date,
                        end_date = projectDTO.end_date,
                        description = projectDTO.description,
                        status_id = projectDTO.status_id
                    };
                    context.projects.Add(proj);
                    int saveChangesResult = await context.SaveChangesAsync();
                    if (saveChangesResult == 0)
                    {
                        throw new Exception();
                    }
                    return new ReturnAPI(200);
                }
            }
            catch(Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

        public async Task<ReturnAPI> updateProject(ProjectDTO projectDTO)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    if (projectDTO.project_id == 0 || projectDTO.status_id == 0 || projectDTO.name is null) 
                    {
                        throw new Exception();
                    }

                    long project_id = projectDTO.project_id;

                    var project = await context.projects.Where(p => p.project_id == project_id).FirstOrDefaultAsync();
                    if (project is null)
                    {
                        throw new Exception();
                    }

                    project.project_id = projectDTO.project_id;
                    project.name = projectDTO.name;
                    project.start_date = projectDTO.start_date;
                    project.end_date = projectDTO.end_date;
                    project.description = projectDTO.description;
                    project.status_id = projectDTO.status_id;
                    project.is_active = projectDTO.is_active;
                 
                    int saveChangesResult = await context.SaveChangesAsync();
                    if(saveChangesResult == 0)
                    {
                        return new ReturnAPI(400);
                    }
                    return new ReturnAPI(200);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }
        public async Task<ReturnAPI> deleteProject(long project_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var query = await context.projects.Where(p => p.project_id == project_id).FirstOrDefaultAsync();
                    if (query is null)
                    {
                        throw new Exception();
                    }

                    context.projects.Remove(query);

                    int saveChangesResult = await context.SaveChangesAsync();

                    if (saveChangesResult == 0)
                    {
                        throw new Exception();
                    }
                    else
                    {
                        return new ReturnAPI(200);
                    }
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI(e.Message, 400);
            }
        }

       public async Task<ReturnAPI<int?>> GetHoursByProject(long project_id)
        {
            try
            {
                using (var context = new TimeTrackingEntities())
                {
                    var hoursByAssignment = await context.assignment_time
                                                    .Where(at => at.assignment.project_id == project_id)
                                                    .GroupBy(at => at.assignment.project_id)
                                                    .Select(group => group.Sum(d => DbFunctions.DiffHours(d.start_time, d.end_time)))
                                                    .FirstOrDefaultAsync();

                    return new ReturnAPI<int?>("Success", 200, hoursByAssignment);
                }
            }
            catch (Exception e)
            {
                return new ReturnAPI<int?>(e.Message, 400, null);
            }
       }

    }
}
