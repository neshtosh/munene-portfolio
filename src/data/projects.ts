import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'studio-mega',
    title: 'BOTB',
    description: 'Brand identity and website redesign for a design agency',
    year: '2023',
    tags: ['Branding', 'UI/UX', 'Development'],
    category: 'Design & Development',
    imageFilename: 'botb.png',
    link: 'https://nextg-phi.vercel.app/',
    codeLink: 'https://github.com/yourusername/homer',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    detailContent: 'Complete brand identity redesign and website development for Studio Mega, a creative design agency. The project included custom animations, interactive portfolio showcase, and a content management system built with Sanity.io.'
  },
  {
    id: 'the-brigade',
    title: 'Wateki',
    description: 'E-commerce platform for a fashion brand',
    year: '2022',
    tags: ['E-commerce', 'Development'],
    category: 'Development',
    imageFilename: 'wateki.png',
    link: 'https://www.wateki.org/',
    codeLink: 'https://github.com/yourusername/wateki',
    technologies: ['React', 'Shopify', 'Tailwind CSS', 'GraphQL'],
    detailContent: 'Custom Shopify storefront implementation for The Brigade using Shopify Storefront API and GraphQL. The site features custom product filtering, wishlist functionality, and integrated checkout experience.'
  },
  {
    id: 'push',
    title: 'Tikiti',
    description: 'Mobile app for fitness tracking and coaching',
    year: '2022',
    tags: ['Mobile', 'UI/UX'],
    category: 'UI/UX Design',
    imageFilename: 'tiqo.png',
    link: 'https://tigits.vercel.app/',
    codeLink: 'https://github.com/yourusername/tikiti',
    technologies: ['Figma', 'Prototyping', 'User Testing'],
    detailContent: 'UI/UX design for a fitness tracking mobile application. The project involved extensive user research, iterative prototyping, and usability testing to create an intuitive and motivating fitness experience.'
  },
  {
    id: 'onx-maps',
    title: 'VAT',
    description: 'Interactive mapping platform for outdoor enthusiasts',
    year: '2021',
    tags: ['Web App', 'Development'],
    category: 'Development',
    imageFilename: 'talanta.png',
    link: 'https://talanta-ecru.vercel.app/',
    codeLink: 'https://github.com/yourusername/vat',
    technologies: ['React', 'Mapbox GL', 'Node.js', 'MongoDB'],
    detailContent: 'Development of an interactive mapping platform with custom layer controls, offline capabilities, and user-generated content. The application allows outdoor enthusiasts to plan trips, mark points of interest, and share routes with others.'
  },
  {
    id: 'icona',
    title: 'Smata',
    description: 'Icon design system and library for digital products',
    year: '2021',
    tags: ['Design System', 'Iconography'],
    category: 'Design',
    imageFilename: 'smata.png',
    link: 'https://landlordmanagment.vercel.app/',
    codeLink: 'https://github.com/yourusername/smata',
    technologies: ['Illustrator', 'Figma', 'SVG', 'React'],
    detailContent: 'Creation of a comprehensive icon design system including over 300 icons in multiple styles and weights. The project included development of a React component library for easy implementation in digital products.'
  }
];