export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  category: string;
  imageUrl: string;
  link?: string;
  technologies: string[];
  detailContent?: string;
}

export interface NavItem {
  title: string;
  path: string;
}