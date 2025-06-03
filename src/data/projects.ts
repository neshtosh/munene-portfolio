import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'studio-mega',
    title: 'Studio Mega',
    description: 'Brand identity and website redesign for a design agency',
    year: '2023',
    tags: ['Branding', 'UI/UX', 'Development'],
    category: 'Design & Development',
    imageUrl: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    detailContent: 'Complete brand identity redesign and website development for Studio Mega, a creative design agency. The project included custom animations, interactive portfolio showcase, and a content management system built with Sanity.io.'
  },
  {
    id: 'the-brigade',
    title: 'The Brigade',
    description: 'E-commerce platform for a fashion brand',
    year: '2022',
    tags: ['E-commerce', 'Development'],
    category: 'Development',
    imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    technologies: ['React', 'Shopify', 'Tailwind CSS', 'GraphQL'],
    detailContent: 'Custom Shopify storefront implementation for The Brigade using Shopify Storefront API and GraphQL. The site features custom product filtering, wishlist functionality, and integrated checkout experience.'
  },
  {
    id: 'push',
    title: 'Push',
    description: 'Mobile app for fitness tracking and coaching',
    year: '2022',
    tags: ['Mobile', 'UI/UX'],
    category: 'UI/UX Design',
    imageUrl: 'https://images.pexels.com/photos/4098363/pexels-photo-4098363.jpeg',
    technologies: ['Figma', 'Prototyping', 'User Testing'],
    detailContent: 'UI/UX design for a fitness tracking mobile application. The project involved extensive user research, iterative prototyping, and usability testing to create an intuitive and motivating fitness experience.'
  },
  {
    id: 'onx-maps',
    title: 'Onx Maps',
    description: 'Interactive mapping platform for outdoor enthusiasts',
    year: '2021',
    tags: ['Web App', 'Development'],
    category: 'Development',
    imageUrl: 'https://images.pexels.com/photos/6424587/pexels-photo-6424587.jpeg',
    technologies: ['React', 'Mapbox GL', 'Node.js', 'MongoDB'],
    detailContent: 'Development of an interactive mapping platform with custom layer controls, offline capabilities, and user-generated content. The application allows outdoor enthusiasts to plan trips, mark points of interest, and share routes with others.'
  },
  {
    id: 'icona',
    title: 'Icona',
    description: 'Icon design system and library for digital products',
    year: '2021',
    tags: ['Design System', 'Iconography'],
    category: 'Design',
    imageUrl: 'https://images.pexels.com/photos/5926394/pexels-photo-5926394.jpeg',
    technologies: ['Illustrator', 'Figma', 'SVG', 'React'],
    detailContent: 'Creation of a comprehensive icon design system including over 300 icons in multiple styles and weights. The project included development of a React component library for easy implementation in digital products.'
  }
];