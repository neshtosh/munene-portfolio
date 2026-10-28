import { projects } from './projects';

export const SITE_URL = 'https://munene.dev';
export const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export interface PageMeta {
  title: string;
  description: string;
  image: string;
  // Large image cards for screenshots, small cards for the logo
  largeImage: boolean;
  jsonLd?: Record<string, unknown>;
  notFound?: boolean;
}

const PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Alex Munene | Websites & Systems in Nairobi',
    description:
      'Alex Munene designs and builds websites, business systems, and digital presence for brands in Nairobi, Kenya.',
  },
  '/about': {
    title: 'About Alex Munene | Web Developer in Nairobi',
    description:
      'Alex Munene is a web developer and designer in Nairobi. He builds websites, systems, and digital presence for brands and businesses.',
  },
  '/projects': {
    title: 'Projects | Websites & Systems by Alex Munene',
    description:
      'Selected websites, platforms, and systems designed and built by Alex Munene in Nairobi.',
  },
  '/contact': {
    title: 'Contact Alex Munene | Websites & Systems in Nairobi',
    description:
      'Talk to Alex Munene in Nairobi about a website, a business system, or your digital presence.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Alex Munene',
    description: 'How Alex Munene handles information submitted through this website.',
  },
};

export const STATIC_PATHS = Object.keys(PAGES);

export const projectPath = (id: string) => `/projects/${id}`;

// Project screenshots are copied to /og/ at build time so previews have a stable URL
export const projectImageUrl = (imageFilename: string) => `${SITE_URL}/og/${imageFilename}`;

export function pageForPath(pathname: string): PageMeta {
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  if (PAGES[path]) {
    return { ...PAGES[path], image: DEFAULT_IMAGE, largeImage: false };
  }

  const projectId = path.startsWith('/projects/') ? path.slice('/projects/'.length) : '';
  const project = projects.find((item) => item.id === projectId);
  if (project) {
    const image = projectImageUrl(project.imageFilename);
    return {
      title: `${project.title} | Alex Munene, Nairobi`,
      description: `${project.description} A project by Alex Munene, web developer and designer in Nairobi.`,
      image,
      largeImage: true,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.detailContent ?? project.description,
        url: `${SITE_URL}${projectPath(project.id)}`,
        image,
        dateCreated: project.year,
        keywords: project.technologies.join(', '),
        creator: { '@type': 'Person', name: 'Alex Munene', url: `${SITE_URL}/` },
        ...(project.link ? { sameAs: project.link } : {}),
      },
    };
  }

  return { ...PAGES['/'], image: DEFAULT_IMAGE, largeImage: false, notFound: true };
}
