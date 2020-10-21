const {role} = require('@/data/data')

function scopedProjects(user, projects) {
  if (user.role === role.admin) return projects
  return projects.filter(project => project.user_id === user.id)
}

function canViewProject(user, project) {
  return (
    user.role === role.admin ||
    project.user_id === user.id
  )  
}

function canDeleteProject(user, project) {
  return project.user_id === user.id
}

module.exports = {
  scopedProjects,
  canViewProject,
  canDeleteProject,
}