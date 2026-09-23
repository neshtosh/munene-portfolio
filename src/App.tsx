import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

const RouteFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center text-muted text-sm tracking-wide">
    Loading…
  </div>
);

const App: React.FC = () => {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-light">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </AudioProvider>
  );
};

export default App;
