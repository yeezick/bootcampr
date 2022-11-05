export interface ProjectInterface {
  id: String;
  title: String;
  duration: String;
  meeting_cadence: String;
  overview: String;
  technologies_used: String[];
  createdAt: String;
  updatedAt: String;
  project_owner: {
    firstName: String;
    lastName: String;
    portfolioUrl: String;
  };
}
