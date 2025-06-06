export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  category: string;
  imageFilename: string;
  imageUrl?: string;
  link?: string;
  codeLink?: string;
  technologies: string[];
  detailContent?: string;
}

export interface NavItem {
  title: string;
  path: string;
}