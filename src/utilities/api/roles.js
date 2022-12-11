import { api } from './apiConfig';
// interface CreateNewRolesProps {
//   projectId: String,
//   newRole: RoleInterface,
//   roleType: string
// }

export const createNewRole = async (projectId, newRole, roleType) => {
  try {
    const newRoleBody = {
      newRole,
      roleType,
    };
    const res = await api.post(`/projects/${projectId}/roles`, newRoleBody);
    return res.data;
  } catch (error) {
    throw error;
  }
};
