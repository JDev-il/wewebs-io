export interface ProjectModel {
  company: string,
  logo: string,
  logo_name: string,
  projects: [
    {
      title: string,
      company: string,
      desc: string[],
      image: string,
      project_involvement: number,
      project_url?: string
      stacks: string[]
    }
  ],
  work_period: string,
  chronology: number
}
