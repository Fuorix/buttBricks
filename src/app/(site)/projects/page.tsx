import type { Metadata } from 'next';
import { ProjectsHeader } from '@/components/ProjectsHeader/ProjectsHeader';
import { ProjectsGrid } from '@/components/ProjectsGrid/ProjectsGrid';
import { ProjectsStats } from '@/components/ProjectsStats/ProjectsStats';
import { ProjectsCTA } from '@/components/ProjectsCTA/ProjectsCTA';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Mega projects and landmark buildings across Pakistan built with Butt Bricks face bricks, gutka and tiles.',
};

export default function Projects() {
  return (
    <>
      <main>
        <ProjectsHeader />
        <ProjectsGrid />
        <ProjectsStats />
        <ProjectsCTA />
      </main>
    </>
  );
}
