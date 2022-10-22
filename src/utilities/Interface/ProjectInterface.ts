export interface ProjectInterface {
  id: String | null | undefined;
  title: String;
  duration: String;
  meeting_cadence: String;
  overview: String;
  technologies_used: String[];
  project_owner: {
    first_name: String;
    last_name: String;
    portfolio_link: String;
  };
}
