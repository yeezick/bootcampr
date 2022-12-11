import { RoleInterface } from '../../utilities/types/ProjectInterface';
import { UserInterface } from '../../utilities/types/UserInterface';

export interface CreateRoleProps {
  updateProjectForm: Function;
}

export interface ViewRolesProps {
  roles: {
    engineering: Array<RoleInterface>;
    design: Array<RoleInterface>;
  };
}

export interface InterestedApplicantsProps {
  applicants: Partial<UserInterface>[];
}

export interface MapRolesProps {
  role: RoleInterface[];
}

export interface SkillSelectionProps {
  selectedSkills: string[];
  setSelectedSkills: Function;
}
