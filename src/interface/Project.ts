export interface Project {
    id: number;
    name: string;
    description: string;
    date: string; // o Date si prefieres
    link: string;
    status: string;
    frontPage: boolean;
    technologies: string[];
    storage: string[];
    cover: string;
    slug: string;
    order: number;
  }