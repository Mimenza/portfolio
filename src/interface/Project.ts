export interface Project {
    id: number;
    name: string;
    descriptionEN: string;
    descriptionES: string;
    date: string; // o Date si prefieres
    link: string;
    statusEN: string;
    statusES: string;
    frontPage: boolean;
    technologies: string[];
    storage: string[];
    cover: string;
    slug: string;
    order: number;
  }