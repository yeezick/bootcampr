import { api } from './apiConfig'

export const getAllProjects = async () => {
  try {
    const res = await api.get('/projects')
    return res.data
  } catch (error) {
    throw error
  }
}

export const getOneProject = async projectId => {
  try {
    const res = await api.get(`/projects/${projectId}`)
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

export const reorderProjectColumn = async (projectId, updateBody) => {
  try {
    const res = await api.patch(`/project/reorder/${projectId}`, updateBody)
    if (res.status !== 200) {
      return { status: res.status, message: res.data.message } // BC: 761 - throwing error instead crashes the application
    }
    return { status: res.status, reorderedColumn: res.data.reorderedColumn }
  } catch (error) {
    console.error(error)
    return error
  }
}

export const moveTicketColumn = async (projectId, updateBody) => {
  try {
    const res = await api.patch(`/project/moveTicket/${projectId}`, updateBody)
    if (res.status !== 200) {
      return { status: res.status, message: res.data.message } // BC: 761 - throwing error instead crashes the application
    }

    return {
      status: res.status,
      oldColumn: res.data.oldColumn,
      newColumn: res.data.newColumn,
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getProjectByUser = async userId => {
  try {
    const res = await api.get(`/users/${userId}/project`)
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

export const getTeamCommonAvailability = async projectId => {
  try {
    const res = await api.get(`/projects/${projectId}/team-common-availability`)
    console.log(res.data)
    return res.data
  } catch (err) {
    console.error(err)
  }
}
