const express = require('express')
const router = express.Router()
const { projects } = require('@/data/data')
const { authUser } = require('@/middleware/auth')
const {scopedProjects,  canViewProject, canDeleteProject } = require('../permissions/project')

router.get('/', authUser, (req, res) => {
  res.json(scopedProjects(req.user, projects))
})

router.get('/:project_id', setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project)
})

router.delete('/:project_id', setProject, authUser, authDeleteProject, (req, res) => {
  res.send('Deleted Project')
})

function setProject(req, res, next) {
  const project_id = parseInt(req.params.project_id)
  req.project = projects.find(project => project.id === project_id)

  if (req.project == null) {
    res.status(404)
    return res.send('Project not found!')
  }

  next()
}

function authGetProject (req, res, next) {
  if (!canViewProject(req.user, req.project)){
    res.status(401)
    return res.send('Not Allowed!')
  }

  next()
}

function authDeleteProject (req, res, next) {
  if (!canDeleteProject(req.user, req.project)){
    res.status(401)
    return res.send('Not Allowed!')
  }

  next()
}

module.exports = router