// Import all project images
const projectImages = import.meta.glob('../assets/project-images/*.(png|jpg|jpeg|gif|webp)', { eager: true });

// Create a map of filenames to their URLs
const projectImageMap: Record<string, string> = {};

// Populate the map with the imported images
for (const path in projectImages) {
  const filename = path.split('/').pop();
  if (filename) {
    projectImageMap[filename] = (projectImages[path] as any).default || projectImages[path];
  }
}

// Function to get the URL for a project image
export function getProjectImageUrl(filename: string): string | undefined {
  return projectImageMap[filename];
} 