import { api } from './apiConfig'

export const getAllProjects = async () => {
  try {
    const res = await api.get('/projects')
    return res.data
  } catch (error) {
    throw error
  }
}

export const getOneProject = async id => {
  try {
    const res = await api.get(`/projects/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getUserProjects = async userId => {
  try {
    const res = await api.get(`/users/projects/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const createProject = async project => {
  try {
    const res = await api.post('/projects', project)
    return res.data
  } catch (error) {
    throw error
  }
}

export const editProject = async (id, project) => {
  try {
    const res = await api.patch(`/projects/${id}`, project)
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteProject = async id => {
  try {
    const res = await api.delete(`/projects/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateUserAndProject = async projectUpdate => {
  try {
    const res = await api.patch('/update-user-and-project', projectUpdate)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getMembersAttributesByProjectId = async (
  projectId,
  attributes
) => {
  try {
    const res = await api.get(
      `/project/${projectId}/members/?attributes=${attributes}`
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}
