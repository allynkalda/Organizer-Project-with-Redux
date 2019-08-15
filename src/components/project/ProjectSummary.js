import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const ProjectSummary = ({ project }) => {
    return (
        <div className="card z-depth-1 project-summary">
        <div className="card-content grey-text text-darken-3">
        <Link to={'/project/' + project.id} key={project.id}>
          {console.log(project)}
          <span className="card-title ">{project.title}</span>
        </Link>
          <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
          <p className="grey-text">{ project.createdAt ? 
                                     moment(project.createdAt.toDate().toString()).calendar(): 
                                     null }</p>
        </div>
        </div>
    )
}

export default ProjectSummary