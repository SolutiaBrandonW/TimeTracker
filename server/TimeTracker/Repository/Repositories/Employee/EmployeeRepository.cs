using DataContracts.EntityFramework;
using DataContracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.Mappers;


namespace Repository.Repositories.Employee
{
    public class EmployeeRepository
    {
        public List<ProjectDTO> GetProjectsByEmployee(long id)
        {
            using (var context = new TimeTrackingEntities())
            {
                var employee = context.employees;
                var project = context.projects;

                var query = project.Where(p => p.assignments.Any(a => a.employee_id == id));

                var projectsByEmpoyee = query.ToList();

                List<ProjectDTO> projectDTOs = new List<ProjectDTO>();

                foreach (project p in projectsByEmpoyee)
                {
                    ProjectDTO projectDTO = new ProjectDTO();
                    projectDTO = ProjectMappers.mapToProjectDTO(p, projectDTO);
                    projectDTOs.Add(projectDTO);
                }
                return projectDTOs;
            }
        }
    }
}
