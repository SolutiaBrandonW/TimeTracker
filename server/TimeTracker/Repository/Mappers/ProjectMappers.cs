using DataContracts.EntityFramework;
using DataContracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimeTracker.Mappers
{
    public class ProjectMappers
    {
        
        public static ProjectDTO mapToProjectDTO(project project, ProjectDTO projectDTO)
        {
            projectDTO.project_id = project.project_id;
            projectDTO.name = project.name;
            projectDTO.start_date = project.start_date;
            projectDTO.end_date = project.end_date;
            projectDTO.description = project.description;
            projectDTO.status_id = project.status_id;
            projectDTO.status_name = project.status.status_name;
            projectDTO.is_active = project.is_active;

            return projectDTO;

        }
    }
}