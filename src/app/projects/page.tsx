import { ProjectsHeader } from '@/components/ProjectsHeader/ProjectsHeader';
import { ProjectsFilter } from '@/components/ProjectsFilter/ProjectsFilter';
import { ProjectsGrid } from '@/components/ProjectsGrid/ProjectsGrid';
import { ProjectsStats } from '@/components/ProjectsStats/ProjectsStats';
import { ProjectsCTA } from '@/components/ProjectsCTA/ProjectsCTA';

export default function Projects() {
  return (
    <>
      <main>
        <ProjectsHeader />
        {/* <ProjectsFilter /> */}
        <ProjectsGrid />
        <ProjectsStats />
        <ProjectsCTA />
      </main>
    </>
  );
}
